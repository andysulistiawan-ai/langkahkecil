import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

export function MainLayout({ children, onToggleTheme, onToggleLang }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar onToggleTheme={onToggleTheme} onToggleLang={onToggleLang} />
      <div className="lg:ml-[240px]">
        <Header onToggleTheme={onToggleTheme} onToggleLang={onToggleLang} />
        <main className="pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-4">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
