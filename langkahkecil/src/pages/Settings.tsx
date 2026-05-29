import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { Toggle } from '@/components/Common/Toggle';
import { useOnline } from '@/hooks/useOnline';
import { storageService } from '@/services/storageService';
import { syncData } from '@/services/syncService';
import { Card } from '@/components/Common/Card';
import { Wifi, WifiOff, Download, RefreshCw, Trash2 } from 'lucide-react';

export function SettingsPage() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const resetAll = useStore((s) => s.resetAll);
  const lang = settings.language;
  const isOnline = useOnline();

  const [syncStatus, setSyncStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [syncing, setSyncing] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [cacheSize, setCacheSize] = useState('0 B');

  useEffect(() => {
    const size = storageService.getSize();
    setCacheSize(size > 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(1)} MB` : `${(size / 1024).toFixed(1)} KB`);
  }, []);

  const handleTestConnection = async () => {
    if (!settings.appScriptUrl) return;
    setSyncStatus('testing');
    try {
      const res = await fetch(settings.appScriptUrl, { method: 'GET', mode: 'no-cors' });
      setSyncStatus('connected');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const handleSync = async () => {
    if (!settings.appScriptUrl || syncing) return;
    setSyncing(true);
    const result = await syncData(settings.appScriptUrl);
    if (result.success) {
      updateSettings({ lastSyncAt: new Date().toISOString() });
      alert(lang === 'id' ? 'Sinkronisasi berhasil!' : 'Sync successful!');
    } else {
      alert(lang === 'id' ? 'Gagal sinkronisasi: ' + result.error : 'Sync failed: ' + result.error);
    }
    setSyncing(false);
  };

  const handleDownloadCode = () => {
    const codeContent = `// ===== langkahkecil Code.gs =====
// COPY THIS ENTIRE CODE into Google Apps Script editor
// Then Deploy -> New Deployment -> Web App

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

const HEADERS = {
  Tasks: ['id', 'name', 'color', 'order', 'done', 'created_at', 'updated_at'],
  Transactions: ['id', 'type', 'amount', 'category', 'note', 'date', 'created_at', 'updated_at'],
  Weight: ['id', 'weight', 'food_notes', 'date', 'created_at', 'updated_at'],
  Categories: ['id', 'name', 'icon', 'type']
};

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'langkahkecil AppScript is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    switch(action) {
      case 'init': return handleInit();
      case 'fetch': return handleFetch(payload.collection);
      case 'create': return handleCreate(payload.collection, payload.data);
      case 'update': return handleUpdate(payload.collection, payload.id, payload.data);
      case 'delete': return handleDelete(payload.collection, payload.id);
      case 'sync': return handleSync(payload.data);
      default: return errorResponse('Unknown action: ' + action);
    }
  } catch(error) {
    return errorResponse('Error: ' + error.toString());
  }
}

function ensureHeaders(sheet, collection) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS[collection] || []);
  }
}

function handleInit() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetNames = Object.keys(HEADERS);
  for (let i = 0; i < sheetNames.length; i++) {
    var s = ss.getSheetByName(sheetNames[i]);
    if (!s) s = ss.insertSheet(sheetNames[i]);
    ensureHeaders(s, sheetNames[i]);
  }

  var categorySheet = ss.getSheetByName('Categories');
  var catData = categorySheet.getDataRange().getValues();
  if (catData.length <= 1) {
    var defaults = [
      ['d1', 'Makanan', '\\uD83C\\uDF5C', ''], ['d3', 'Belanja', '\\uD83D\\uDED2', ''],
      ['d4', 'Gaji', '\\uD83D\\uDCB0', ''], ['d5', 'Hiburan', '\\uD83C\\uDFAD', ''],
      ['d6', 'Utilities', '\\uD83D\\uDCA1', '']
    ];
    var startRow = categorySheet.getLastRow() + 1;
    categorySheet.getRange(startRow, 1, defaults.length, 4).setValues(defaults);
  }
  return successResponse('Sheets initialized');
}

function formatCell(val) {
  if (val instanceof Date) {
    var y = val.getFullYear();
    var m = ('0' + (val.getMonth() + 1)).slice(-2);
    var d = ('0' + val.getDate()).slice(-2);
    return y + '-' + m + '-' + d;
  }
  return val;
}

function handleFetch(collection) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  if (!sheet) return errorResponse('Sheet not found');
  const data = sheet.getDataRange().getValues();
  if (data.length === 0) return successResponse('Empty', []);
  const headers = data[0];
  const rows = data.slice(1).filter(r => r[0] !== '');
  const result = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = formatCell(row[i]); });
    return obj;
  });
  return successResponse('Fetched', result);
}

function handleCreate(collection, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  if (!sheet) return errorResponse('Sheet not found');
  ensureHeaders(sheet, collection);
  const headers = HEADERS[collection] || sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => {
    if (data[h] !== undefined) return data[h];
    var camel = h.replace(/_([a-z])/g, function(_, c) { return c.toUpperCase(); });
    return data[camel] !== undefined ? data[camel] : '';
  });
  sheet.appendRow(row);
  return successResponse('Created', { id: data.id });
}

function handleUpdate(collection, id, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  if (!sheet) return errorResponse('Sheet not found');
  ensureHeaders(sheet, collection);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) {
      headers.forEach((h, j) => {
        var val = data[h];
        if (val === undefined) {
          var camel = h.replace(/_([a-z])/g, function(_, c) { return c.toUpperCase(); });
          val = data[camel];
        }
        if (val !== undefined) sheet.getRange(i + 1, j + 1).setValue(val);
      });
      return successResponse('Updated', { id });
    }
  }
  return errorResponse('Not found');
}

function handleDelete(collection, id) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  if (!sheet) return errorResponse('Sheet not found');
  const range = sheet.getDataRange();
  const values = range.getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) { sheet.deleteRow(i + 1); return successResponse('Deleted', { id }); }
  }
  return errorResponse('Not found');
}

function handleSync(records) {
  let successCount = 0, errorCount = 0;
  records.forEach(record => {
    try {
      if (record.action === 'create') handleCreate(record.collection, record.data);
      else if (record.action === 'update') handleUpdate(record.collection, record.id, record.data);
      else if (record.action === 'delete') handleDelete(record.collection, record.id);
      successCount++;
    } catch(e) { errorCount++; }
  });
  return successResponse('Sync completed', { successCount, errorCount, timestamp: new Date().toISOString() });
}

function successResponse(message, data) {
  var resp = { success: true, message, timestamp: new Date().toISOString() };
  if (data) resp.data = data;
  return ContentService.createTextOutput(JSON.stringify(resp)).setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(error) {
  return ContentService.createTextOutput(JSON.stringify({ success: false, error, timestamp: new Date().toISOString() })).setMimeType(ContentService.MimeType.JSON);
}`;

    const blob = new Blob([codeContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCache = () => {
    if (confirm(lang === 'id' ? 'Hapus semua data lokal?' : 'Clear all local data?')) {
      storageService.clearAll();
      window.location.reload();
    }
  };

  const handleReset = () => {
    if (confirm(lang === 'id' ? 'Yakin ingin mereset semua data? Tindakan ini tidak bisa dibatalkan.' : 'Are you sure you want to reset all data? This action cannot be undone.')) {
      resetAll();
      storageService.clearAll();
      window.location.reload();
    }
  };

  const stepIcons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
        {lang === 'id' ? 'Pengaturan' : 'Settings'}
      </h2>

      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                {lang === 'id' ? 'Status Koneksi' : 'Connection Status'}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                {isOnline ? (
                  <span className="flex items-center gap-1 text-green-500"><Wifi size={14} /> {lang === 'id' ? 'Online' : 'Online'}</span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-500"><WifiOff size={14} /> {lang === 'id' ? 'Bekerja Offline' : 'Working Offline'}</span>
                )}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`} />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">
            {lang === 'id' ? 'Tampilan' : 'Appearance'}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text)]">{lang === 'id' ? 'Tema Gelap' : 'Dark Mode'}</span>
            <Toggle
              checked={settings.theme === 'dark'}
              onChange={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text)]">Bahasa / Language</span>
            <button
              onClick={() => updateSettings({ language: settings.language === 'id' ? 'en' : 'id' })}
              className="px-3 py-1.5 text-sm font-semibold rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
            >
              {settings.language === 'id' ? 'Indonesia' : 'English'}
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">
            {lang === 'id' ? 'Data & Sinkronisasi' : 'Data & Sync'}
          </h3>
          <div className="flex flex-col gap-3">
            <Input
              label="AppScript URL"
              value={settings.appScriptUrl || ''}
              onChange={(e) => updateSettings({ appScriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/..."
            />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={handleTestConnection} disabled={syncStatus === 'testing'}>
                {syncStatus === 'testing' ? (lang === 'id' ? 'Menguji...' : 'Testing...') : lang === 'id' ? 'Uji Koneksi' : 'Test Connection'}
              </Button>
              <Button size="sm" onClick={handleSync} disabled={syncing || !settings.appScriptUrl}>
                {syncing ? <RefreshCw size={16} className="animate-spin mr-1" /> : <RefreshCw size={16} className="mr-1" />}
                {lang === 'id' ? 'Sinkronkan' : 'Sync'}
              </Button>
            </div>
            {syncStatus === 'connected' && <p className="text-xs text-green-500">{lang === 'id' ? '✓ Terhubung' : '✓ Connected'}</p>}
            {syncStatus === 'error' && <p className="text-xs text-red-500">{lang === 'id' ? '✗ Gagal terhubung' : '✗ Connection failed'}</p>}
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {lang === 'id' ? 'Sinkronisasi terakhir: ' : 'Last sync: '}
              {settings.lastSyncAt ? new Date(settings.lastSyncAt).toLocaleString() : (lang === 'id' ? 'Tidak pernah' : 'Never')}
            </p>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">
            {lang === 'id' ? 'Download Code.gs' : 'Download Code.gs'}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">
            {lang === 'id' ? 'Download template Google Apps Script untuk menghubungkan ke Google Sheets.' : 'Download the Google Apps Script template to connect to Google Sheets.'}
          </p>
          <Button size="sm" onClick={handleDownloadCode}>
            <Download size={16} className="mr-1" /> Code.gs
          </Button>
        </Card>

        <Card>
          <button onClick={() => setShowGuide(!showGuide)} className="flex items-center justify-between w-full">
            <h3 className="text-sm font-bold text-[var(--color-text)]">
              {lang === 'id' ? '📖 Panduan Setup' : '📖 Setup Guide'}
            </h3>
            <span className="text-lg">{showGuide ? '▲' : '▼'}</span>
          </button>
          {showGuide && (
            <div className="mt-3 flex flex-col gap-2">
              {[
                lang === 'id' ? 'Buat Google Sheet baru' : 'Create a new Google Sheet',
                lang === 'id' ? 'Klik Extensions > Apps Script' : 'Click Extensions > Apps Script',
                lang === 'id' ? 'Download Code.gs di atas' : 'Download Code.gs above',
                lang === 'id' ? 'Copy-paste Code.gs ke editor Apps Script' : 'Copy-paste Code.gs into Apps Script editor',
                lang === 'id' ? 'Deploy sebagai Web App (Baru)' : 'Deploy as Web App (New deployment)',
                lang === 'id' ? 'Copy URL deployment' : 'Copy the deployment URL',
                lang === 'id' ? 'Paste URL di pengaturan ini' : 'Paste URL in this settings page',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span className="shrink-0">{stepIcons[i]}</span>
                  <span>{lang === 'id' ? 'Langkah ' : 'Step '}{i + 1}: {step}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">
            {lang === 'id' ? 'Cache & Data' : 'Cache & Data'}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">
            {lang === 'id' ? 'Data tersimpan lokal: ' : 'Local stored data: '}{cacheSize}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={handleClearCache}>
              <Trash2 size={16} className="mr-1" /> {lang === 'id' ? 'Bersihkan Cache' : 'Clear Cache'}
            </Button>
            <Button size="sm" variant="danger" onClick={handleReset}>
              {lang === 'id' ? 'Reset Aplikasi' : 'Reset App'}
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
            {lang === 'id' ? 'Tentang' : 'About'}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            langkahkecil v1.0.0
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
            {lang === 'id' ? 'Langkah kecil menuju kebiasaan baik' : 'Small steps towards good habits'} 🌱
          </p>
        </Card>
      </div>
    </div>
  );
}
