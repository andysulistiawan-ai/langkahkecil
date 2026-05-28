import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { MainLayout } from '@/components/Layout/MainLayout';
import { ToastContainer, useToast } from '@/components/Common/Toast';
import { TasksPage } from '@/pages/Tasks';
import { FinancePage } from '@/pages/Finance';
import { WeightPage } from '@/pages/Weight';
import { SettingsPage } from '@/pages/Settings';

function App() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const setOnline = useStore((s) => s.setOnline);
  const activeTab = useStore((s) => s.activeTab);
  const { toasts, showToast, dismissToast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [setOnline]);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const toggleLang = () => {
    updateSettings({ language: settings.language === 'id' ? 'en' : 'id' });
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'tasks': return <TasksPage />;
      case 'finance': return <FinancePage />;
      case 'weight': return <WeightPage />;
      case 'settings': return <SettingsPage />;
      default: return <TasksPage />;
    }
  };

  return (
    <MainLayout onToggleTheme={toggleTheme} onToggleLang={toggleLang}>
      {renderPage()}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </MainLayout>
  );
}

export default App;
