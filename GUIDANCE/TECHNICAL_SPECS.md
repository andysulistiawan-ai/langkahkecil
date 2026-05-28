# 🔧 langkahkecil - Technical Specifications & Architecture

**Version:** 1.0.0 MVP  
**Status:** Ready for Development

---

## 📋 Table of Contents

1. Technology Stack
2. Architecture Overview
3. Database Schema
4. LocalStorage Structure
5. Google AppScript Integration
6. API Specifications
7. State Management
8. Build & Deployment

---

## 🛠️ Technology Stack

### Frontend
```
Framework:        React 18.x
Build Tool:       Vite 5.x
Language:         TypeScript 5.x
State Manager:    Zustand (lightweight, ideal for offline-first)
UI Components:    Custom (following DESIGN.md)
Styling:          Tailwind CSS 3.x + CSS-in-JS
Icons:            Lucide React (simple, geometric)
Charts:           Recharts (lightweight, responsive)
Date Handling:    date-fns (small bundle)
HTTP Client:      Fetch API (native)
Forms:            React Hook Form + Zod validation
Theme:            CSS Variables + Context API
```

### Development Tools
```
Version Control:  Git (GitHub)
Package Manager:  npm or pnpm
Dev Environment:  Node.js 18+
Code Format:      Prettier
Linting:          ESLint
Testing:          Vitest + React Testing Library (optional for MVP)
```

### Backend / Data
```
Backend:          Google Apps Script (serverless)
Database:         Google Sheets (as data store)
Auth:             Google OAuth 2.0 (implicit, no user auth for MVP)
Data Sync:        Manual POST/GET via AppScript
Caching:          Browser LocalStorage API
Offline:          Full offline capability
```

### Hosting
```
Hosting:          Vercel / GitHub Pages / Netlify (static)
Domain:           [TBD]
CDN:              Included with hosting
HTTPS:            Automatic
```

---

## 🏗️ Architecture Overview

### High-Level Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                        React Web App                             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  UI Layer (Components, Pages)                           │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │  State Management (Zustand Store)                       │   │
│  │  - Tasks, Transactions, Weight logs                     │   │
│  │  - User preferences (theme, language)                   │   │
│  │  - Sync status, offline mode                            │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │  Data Layer                                             │   │
│  │  ┌─────────────────────┐  ┌─────────────────────────┐  │   │
│  │  │  LocalStorage       │  │  AppScript API Calls    │  │   │
│  │  │  (Instant Load)     │  │  (Manual Sync)          │  │   │
│  │  └─────────────────────┘  └─────────────────────────┘  │   │
│  └──────────────────────┬────────────┬────────────────────┘   │
│                         │            │                         │
└─────────────────────────┼────────────┼─────────────────────────┘
                          │            │
                    ┌─────▼─┐    ┌────▼──────────┐
                    │ Cache │    │ Google Sheets  │
                    │ (Fast)│    │ (Source Truth) │
                    └───────┘    └────────────────┘
                                  ▲
                                  │
                              AppScript
                              Endpoint
```

### Data Flow (Offline-First)

#### When User Saves
```
User Click Save
    ↓
Validate Input (Zod)
    ↓
Update Zustand State
    ↓
Write to LocalStorage (instant)
    ↓
Show Toast: "Tersimpan"
    ↓
(Optional) Queue for Sync if Online
```

#### When User Clicks "Sinkronkan Sekarang"
```
Click Sync Button
    ↓
Check Internet Connection
    ↓
If Online:
    - Prepare sync payload
    - POST to AppScript endpoint
    - If success: Show "Sinkronisasi berhasil"
    - If error: Show "Gagal sinkronisasi, coba lagi"
    ↓
If Offline:
    - Show Toast: "Tidak ada koneksi internet"
    - Queue for auto-sync when online
```

#### On App Startup
```
Load React App
    ↓
Load from LocalStorage
    ↓
Render with cached data (instant)
    ↓
Check Internet
    ↓
If Online:
    - Fetch latest from AppScript
    - Compare timestamps
    - Merge if newer data exists
    - Update Zustand + LocalStorage
```

---

## 💾 Database Schema

### Collections (Logical)

All data stored in Google Sheets with following sheets:

#### Sheet 1: "Tasks"
```
Schema:
┌────────────┬────────────┬────────┬─────────┬──────────┬───────────┐
│ id (UUID)  │ name       │ color  │ order   │ done     │ timestamp │
├────────────┼────────────┼────────┼─────────┼──────────┼───────────┤
│ PK         │ STRING     │ STRING │ INTEGER │ BOOLEAN  │ DATETIME  │
└────────────┴────────────┴────────┴─────────┴──────────┴───────────┘

Columns:
- A: id (UUID v4)
- B: name (required, max 200 chars)
- C: color (enum: blue, coral, mint, yellow, purple, gray)
- D: order (integer, 0-indexed)
- E: done (boolean, TRUE/FALSE)
- F: created_at (DATETIME)
- G: updated_at (DATETIME)
- H: user_id (for future multi-user, leave empty for MVP)

Headers: Row 1
Data: Row 2 onwards

Sample:
| id | name | color | order | done | created_at | updated_at | user_id |
| 123e4567-e89b-12d3-a456-426614174000 | Pergi ke gym | blue | 0 | FALSE | 2025-05-27 08:00:00 | 2025-05-27 08:00:00 | |
```

#### Sheet 2: "Transactions"
```
Schema:
┌────────────┬───────────┬──────────────┬────────────┬──────────┬────────────┬────────────┬────────┐
│ id (UUID)  │ type      │ amount       │ category   │ note     │ date       │ created_at │ user   │
├────────────┼───────────┼──────────────┼────────────┼──────────┼────────────┼────────────┼────────┤
│ PK         │ STRING    │ INTEGER      │ STRING     │ STRING   │ DATE       │ DATETIME   │ STRING │
└────────────┴───────────┴──────────────┴────────────┴──────────┴────────────┴────────────┴────────┘

Columns:
- A: id (UUID v4)
- B: type (enum: income, expense)
- C: amount (integer, Rp, no decimal)
- D: category (default or custom)
- E: note (optional, max 500 chars)
- F: date (DATE, format: YYYY-MM-DD)
- G: created_at (DATETIME)
- H: updated_at (DATETIME)
- I: user_id (future)

Headers: Row 1
Data: Row 2 onwards

Sample:
| id | type | amount | category | note | date | created_at | updated_at | user_id |
| 223e4567-e89b-12d3-a456-426614174001 | income | 5000000 | Gaji | Gaji bulai | 2025-05-27 | 2025-05-27 08:00:00 | 2025-05-27 08:00:00 | |
```

#### Sheet 3: "Weight"
```
Schema:
┌────────────┬────────┬────────────────┬─────────────┬────────────┬────────┐
│ id (UUID)  │ weight │ food_notes     │ date        │ created_at │ user   │
├────────────┼────────┼────────────────┼─────────────┼────────────┼────────┤
│ PK         │ FLOAT  │ STRING         │ DATE        │ DATETIME   │ STRING │
└────────────┴────────┴────────────────┴─────────────┴────────────┴────────┘

Columns:
- A: id (UUID v4)
- B: weight (float, format: XX.XX kg)
- C: food_notes (optional, max 1000 chars)
- D: date (DATE, format: YYYY-MM-DD)
- E: created_at (DATETIME)
- F: updated_at (DATETIME)
- G: user_id (future)

Headers: Row 1
Data: Row 2 onwards

Sample:
| id | weight | food_notes | date | created_at | updated_at | user_id |
| 323e4567-e89b-12d3-a456-426614174002 | 62.5 | Nasi goreng (siang), Salad (malam) | 2025-05-27 | 2025-05-27 08:00:00 | 2025-05-27 08:00:00 | |
```

#### Sheet 4: "Categories"
```
Schema:
┌────────────┬────────────────┬────────────┬──────────┐
│ id (UUID)  │ name           │ icon       │ user_id  │
├────────────┼────────────────┼────────────┼──────────┤
│ PK         │ STRING         │ STRING     │ STRING   │
└────────────┴────────────────┴────────────┴──────────┘

Columns:
- A: id (UUID v4)
- B: name (required, max 50 chars)
- C: icon (emoji or icon code)
- D: user_id (future)

Headers: Row 1
Data: Row 2 onwards

Default Categories (pre-filled):
| id | name | icon | user_id |
| d1 | Makanan | 🍜 | |
| d2 | Transport | 🚗 | |
| d3 | Belanja | 🛒 | |
| d4 | Gaji | 💰 | |
| d5 | Hiburan | 🎭 | |
| d6 | Utilities | 💡 | |
| d7 | Kesehatan | 🏥 | |
| d8 | Pendidikan | 📚 | |
```

### Data Type Definitions (TypeScript)

```typescript
// Tasks
interface Task {
  id: string; // UUID
  name: string;
  color: 'blue' | 'coral' | 'mint' | 'yellow' | 'purple' | 'gray';
  order: number;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Transactions
type TransactionType = 'income' | 'expense';
interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // in Rp (no decimal)
  category: string;
  note?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Weight
interface WeightLog {
  id: string;
  weight: number; // in kg with decimals
  foodNotes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Category
interface Category {
  id: string;
  name: string;
  icon: string; // emoji or icon name
}

// User Settings
interface UserSettings {
  theme: 'light' | 'dark';
  language: 'id' | 'en';
  appScriptUrl?: string;
  lastSyncAt?: Date;
  offlineMode: boolean;
}
```

---

## 💾 LocalStorage Structure

### Storage Keys Pattern
```
langkahkecil:tasks        → JSON array of Task[]
langkahkecil:transactions → JSON array of Transaction[]
langkahkecil:weights      → JSON array of WeightLog[]
langkahkecil:categories   → JSON array of Category[]
langkahkecil:settings     → JSON object UserSettings
langkahkecil:sync-queue   → JSON array of changes pending sync
langkahkecil:metadata     → JSON object { lastSyncAt, appVersion }
```

### Example LocalStorage Entries

```javascript
// Task Storage
{
  "langkahkecil:tasks": "[{\"id\":\"123...\",\"name\":\"Gym\",\"color\":\"blue\",\"order\":0,\"done\":false,\"createdAt\":\"2025-05-27T08:00:00Z\",\"updatedAt\":\"2025-05-27T08:00:00Z\"}]"
}

// Transaction Storage
{
  "langkahkecil:transactions": "[{\"id\":\"223...\",\"type\":\"income\",\"amount\":5000000,\"category\":\"Gaji\",\"note\":\"Gaji bulai\",\"date\":\"2025-05-27T00:00:00Z\",\"createdAt\":\"2025-05-27T08:00:00Z\",\"updatedAt\":\"2025-05-27T08:00:00Z\"}]"
}

// Settings Storage
{
  "langkahkecil:settings": "{\"theme\":\"light\",\"language\":\"id\",\"appScriptUrl\":\"https://script.google.com/macros/s/...\",\"lastSyncAt\":\"2025-05-27T08:30:00Z\",\"offlineMode\":false}"
}

// Sync Queue (changes waiting to sync)
{
  "langkahkecil:sync-queue": "[{\"action\":\"create\",\"collection\":\"tasks\",\"data\":{...}},{\"action\":\"update\",\"collection\":\"transactions\",\"id\":\"223...\",\"changes\":{...}}]"
}
```

### LocalStorage Size Management
```
Target: Keep under 5MB total
Strategy:
- Delete old transactions after 1 year (optional)
- Limit weight logs to last 6 months
- Archive old data to separate storage (future)
- Clear sync queue after successful sync
- Add cleanup utility in settings
```

---

## 🔗 Google AppScript Integration

### Setup Process

1. **User creates new Google Sheet**
2. **User opens Extensions → Apps Script**
3. **User pastes `Code.gs` template (provided in Settings)**
4. **User deploys as Web App (new deployment)**
5. **User copies Deployment URL**
6. **User pastes URL in Settings → AppScript URL**
7. **User clicks "Test Connection"**

### Code.gs Template (Google Apps Script)

```javascript
// ===== langkahkecil Code.gs Template =====
// Paste this entire code into your Google Apps Script editor
// Then deploy as Web App (new deployment)

// Global config
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// Initialize sheets on first run
function doGet(e) {
  // Health check endpoint
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'langkahkecil AppScript is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    
    switch(action) {
      case 'init':
        return handleInit();
      case 'sync':
        return handleSync(payload.data);
      case 'fetch':
        return handleFetch(payload.collection);
      case 'create':
        return handleCreate(payload.collection, payload.data);
      case 'update':
        return handleUpdate(payload.collection, payload.id, payload.data);
      case 'delete':
        return handleDelete(payload.collection, payload.id);
      default:
        return errorResponse('Unknown action');
    }
  } catch(error) {
    Logger.log('Error: ' + error);
    return errorResponse(error.toString());
  }
}

// Initialize sheets
function handleInit() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Create sheets if not exist
  const sheetNames = ['Tasks', 'Transactions', 'Weight', 'Categories'];
  
  sheetNames.forEach(name => {
    if (!ss.getSheetByName(name)) {
      ss.insertSheet(name);
    }
  });
  
  // Initialize Categories with defaults
  const categorySheet = ss.getSheetByName('Categories');
  if (categorySheet.getLastRow() === 1) {
    const defaults = [
      ['d1', 'Makanan', '🍜'],
      ['d2', 'Transport', '🚗'],
      ['d3', 'Belanja', '🛒'],
      ['d4', 'Gaji', '💰'],
      ['d5', 'Hiburan', '🎭'],
      ['d6', 'Utilities', '💡'],
      ['d7', 'Kesehatan', '🏥'],
      ['d8', 'Pendidikan', '📚']
    ];
    categorySheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
  }
  
  // Set headers
  const headers = {
    'Tasks': ['id', 'name', 'color', 'order', 'done', 'created_at', 'updated_at', 'user_id'],
    'Transactions': ['id', 'type', 'amount', 'category', 'note', 'date', 'created_at', 'updated_at', 'user_id'],
    'Weight': ['id', 'weight', 'food_notes', 'date', 'created_at', 'updated_at', 'user_id'],
    'Categories': ['id', 'name', 'icon', 'user_id']
  };
  
  Object.keys(headers).forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers[sheetName]);
    }
  });
  
  return successResponse('Sheets initialized');
}

// Fetch all data from collection
function handleFetch(collection) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  
  if (!sheet) {
    return errorResponse('Sheet not found');
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  return successResponse(result);
}

// Create new record
function handleCreate(collection, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const row = headers.map(header => data[header] || '');
  sheet.appendRow(row);
  
  return successResponse({ id: data.id, message: 'Created' });
}

// Update record
function handleUpdate(collection, id, data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  const idColIndex = 0; // First column is always id
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][idColIndex] === id) {
      const headers = values[0];
      headers.forEach((header, j) => {
        if (data[header] !== undefined) {
          sheet.getRange(i + 1, j + 1).setValue(data[header]);
        }
      });
      return successResponse({ id: id, message: 'Updated' });
    }
  }
  
  return errorResponse('Record not found');
}

// Delete record
function handleDelete(collection, id) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(collection);
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  const idColIndex = 0;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][idColIndex] === id) {
      sheet.deleteRow(i + 1);
      return successResponse({ id: id, message: 'Deleted' });
    }
  }
  
  return errorResponse('Record not found');
}

// Batch sync
function handleSync(records) {
  let successCount = 0;
  let errorCount = 0;
  
  records.forEach(record => {
    try {
      if (record.action === 'create') {
        handleCreate(record.collection, record.data);
      } else if (record.action === 'update') {
        handleUpdate(record.collection, record.id, record.data);
      } else if (record.action === 'delete') {
        handleDelete(record.collection, record.id);
      }
      successCount++;
    } catch(error) {
      Logger.log('Error syncing: ' + error);
      errorCount++;
    }
  });
  
  return successResponse({
    successCount: successCount,
    errorCount: errorCount,
    timestamp: new Date().toISOString()
  });
}

// Helper functions
function successResponse(data) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: data,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### API Endpoints (AppScript)

All requests are POST to the deployment URL.

#### 1. Health Check
```
Endpoint: GET [AppScript URL]
Response:
{
  "status": "ok",
  "message": "langkahkecil AppScript is running"
}
```

#### 2. Initialize Sheets
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "init"
}

Response:
{
  "success": true,
  "data": "Sheets initialized",
  "timestamp": "2025-05-27T08:30:00Z"
}
```

#### 3. Fetch Collection
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "fetch",
  "collection": "tasks" | "transactions" | "weight" | "categories"
}

Response:
{
  "success": true,
  "data": [
    { "id": "...", "name": "...", "color": "blue", ... },
    { ... }
  ],
  "timestamp": "2025-05-27T08:30:00Z"
}
```

#### 4. Create Record
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "create",
  "collection": "tasks",
  "data": {
    "id": "uuid-here",
    "name": "New Task",
    "color": "blue",
    "order": 0,
    "done": false,
    "created_at": "2025-05-27T08:30:00Z",
    "updated_at": "2025-05-27T08:30:00Z"
  }
}

Response:
{
  "success": true,
  "data": { "id": "uuid-here", "message": "Created" },
  "timestamp": "2025-05-27T08:30:00Z"
}
```

#### 5. Update Record
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "update",
  "collection": "tasks",
  "id": "uuid-here",
  "data": {
    "name": "Updated Task",
    "done": true,
    "updated_at": "2025-05-27T08:35:00Z"
  }
}

Response:
{
  "success": true,
  "data": { "id": "uuid-here", "message": "Updated" },
  "timestamp": "2025-05-27T08:35:00Z"
}
```

#### 6. Delete Record
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "delete",
  "collection": "tasks",
  "id": "uuid-here"
}

Response:
{
  "success": true,
  "data": { "id": "uuid-here", "message": "Deleted" },
  "timestamp": "2025-05-27T08:35:00Z"
}
```

#### 7. Batch Sync
```
Endpoint: POST [AppScript URL]
Body:
{
  "action": "sync",
  "data": [
    { "action": "create", "collection": "tasks", "data": {...} },
    { "action": "update", "collection": "transactions", "id": "...", "data": {...} },
    { "action": "delete", "collection": "weight", "id": "..." }
  ]
}

Response:
{
  "success": true,
  "data": {
    "successCount": 3,
    "errorCount": 0,
    "timestamp": "2025-05-27T08:35:00Z"
  },
  "timestamp": "2025-05-27T08:35:00Z"
}
```

### Error Handling
```javascript
// Client-side
const sync = async () => {
  try {
    const response = await fetch(appScriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'sync',
        data: syncQueue
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      clearSyncQueue();
      showToast('Sinkronisasi berhasil');
    } else {
      showToast(`Error: ${result.error}`);
    }
  } catch(error) {
    showToast('Gagal sinkronisasi. Periksa koneksi internet.');
    console.error(error);
  }
};
```

---

## 🎛️ State Management (Zustand)

### Store Structure

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (newOrder: Task[]) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Weight
  weights: WeightLog[];
  addWeight: (log: WeightLog) => void;
  updateWeight: (id: string, updates: Partial<WeightLog>) => void;
  deleteWeight: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Category) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;

  // Sync
  syncQueue: SyncRecord[];
  addToQueue: (record: SyncRecord) => void;
  clearQueue: () => void;
  isOnline: boolean;
  setOnline: (online: boolean) => void;

  // UI State
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  activeTab: 'tasks' | 'finance' | 'weight' | 'settings';
  setActiveTab: (tab: string) => void;
}

const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Implementation here
    }),
    {
      name: 'langkahkecil-store',
      storage: localStorage,
      partialize: (state) => ({
        tasks: state.tasks,
        transactions: state.transactions,
        weights: state.weights,
        categories: state.categories,
        settings: state.settings,
        syncQueue: state.syncQueue,
      })
    }
  )
);

export default useStore;
```

---

## 🔌 API Client Utilities

### AppScript Service
```typescript
// services/appScriptService.ts
class AppScriptService {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl);
      return response.ok;
    } catch {
      return false;
    }
  }

  async init(): Promise<void> {
    return this.post({ action: 'init' });
  }

  async fetchCollection(collection: string): Promise<any[]> {
    const result = await this.post({
      action: 'fetch',
      collection
    });
    return result.data;
  }

  async create(collection: string, data: any): Promise<any> {
    return this.post({
      action: 'create',
      collection,
      data
    });
  }

  async update(collection: string, id: string, data: any): Promise<any> {
    return this.post({
      action: 'update',
      collection,
      id,
      data
    });
  }

  async delete(collection: string, id: string): Promise<any> {
    return this.post({
      action: 'delete',
      collection,
      id
    });
  }

  async sync(records: SyncRecord[]): Promise<any> {
    return this.post({
      action: 'sync',
      data: records
    });
  }

  private async post(body: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  }
}

export default AppScriptService;
```

---

## 📦 Build & Deployment

### Build Configuration

#### Vite Config
```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'ES2020',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'recharts': ['recharts'],
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  }
});
```

### Environment Variables
```
.env.development:
VITE_APP_SCRIPT_URL=http://localhost:3000/api
VITE_ENV=development

.env.production:
VITE_APP_SCRIPT_URL=[User's AppScript URL]
VITE_ENV=production
```

### Deployment Steps

1. **Local Development**
   ```bash
   npm install
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

4. **Or Deploy to GitHub Pages**
   - Push to GitHub repo
   - Enable GitHub Pages in settings
   - Select `dist` folder as source

### Performance Targets
```
Metrics:
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s
- LocalStorage read: < 100ms
- App startup load: < 2s

Optimization:
- Code splitting (Recharts, vendor separate)
- Lazy load components (modal, charts)
- Image optimization (SVG icons, no large images)
- CSS purging with Tailwind
- Tree-shaking unused code
```

---

## 🧪 Testing Strategy

### Unit Tests (Zustand store)
```
- Store actions (add, update, delete)
- Store selectors
- LocalStorage persistence
```

### Integration Tests
- AppScript API calls
- Sync queue logic
- Offline/online transitions

### E2E Tests (if needed)
- Complete user flow: Add task → Sync → Check Sheet
- Dark mode toggle
- Responsive layout

### Performance Tests
- Bundle size < 500KB gzipped
- LocalStorage write/read times
- API response times

---

## 🔒 Security Considerations

- No sensitive data in LocalStorage (no passwords)
- AppScript URL provided by user (no hardcoded secrets)
- CORS: AppScript handles CORS automatically
- Input validation: Zod schema for all inputs
- No user authentication needed for MVP
- Google Sheets sharing: User controls sheet permissions

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Android (latest 2 versions)

---

## 🚀 Future Improvements (v2+)

- User authentication (Google OAuth)
- Multi-device sync
- Collaborative editing
- Native mobile apps
- Advanced analytics
- Recurring tasks/transactions
- Budget planning
- Goal tracking
- Backup & restore
- Data export (CSV/PDF)

---

**Document Status:** ✅ Ready for Development  
**Next:** Use AI_AGENT_PROMPT.md to kickstart development

