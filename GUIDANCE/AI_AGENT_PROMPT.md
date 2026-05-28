# 🤖 langkahkecil - AI Agent Build Prompt

**Status:** Ready for Execution  
**Target Output:** Production-ready React web app MVP  
**Estimated Time:** 40 hours (phased approach recommended)

---

## 📖 READ FIRST

Before starting development, ensure you have read:
1. **PRD.md** - Feature scope & user stories
2. **DESIGN.md** - UI/UX specifications
3. **TECHNICAL_SPECS.md** - Architecture & database schema

This document ties them together and provides step-by-step instructions.

---

## 🎯 Project Overview

**Project Name:** langkahkecil  
**Description:** Offline-first daily tracker web app (To-Do List, Financial Tracker, Weight Tracker)  
**Tech Stack:** React 18 + TypeScript + Tailwind CSS + Zustand + Recharts  
**Database:** Google Sheets (via Google Apps Script)  
**Target Platforms:** Mobile (375px) & Desktop (1024px+)  
**Design Style:** Playful, warm, cartoon style with cool blue primary color  

---

## 🏗️ Project Structure

Create this folder structure:

```
langkahkecil/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── .env.example
├── .gitignore
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Root component
│   ├── index.css                   # Global styles
│   ├── components/                 # Reusable components
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── Common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Toggle.tsx
│   │   │   └── IconButton.tsx
│   │   ├── Task/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── AddTaskModal.tsx
│   │   │   └── ColorPicker.tsx
│   │   ├── Finance/
│   │   │   ├── TransactionCard.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   ├── AddTransactionModal.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   └── FilterChips.tsx
│   │   ├── Weight/
│   │   │   ├── WeightCard.tsx
│   │   │   ├── WeightList.tsx
│   │   │   ├── AddWeightModal.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   ├── BMICalculator.tsx
│   │   │   └── CurrentWeight.tsx
│   │   └── Icons/
│   │       └── index.ts            # Custom & Lucide icons
│   ├── pages/                      # Page components
│   │   ├── Tasks.tsx
│   │   ├── Finance.tsx
│   │   ├── Weight.tsx
│   │   └── Settings.tsx
│   ├── store/                      # Zustand store
│   │   ├── index.ts                # Main store
│   │   ├── types.ts                # TypeScript types
│   │   └── slices/
│   │       ├── taskSlice.ts
│   │       ├── transactionSlice.ts
│   │       ├── weightSlice.ts
│   │       └── settingsSlice.ts
│   ├── services/                   # API & utilities
│   │   ├── appScriptService.ts
│   │   ├── syncService.ts
│   │   ├── storageService.ts
│   │   └── offlineService.ts
│   ├── hooks/                      # Custom React hooks
│   │   ├── useOnline.ts
│   │   ├── useToast.ts
│   │   ├── useSyncQueue.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                      # Utilities
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── uuid.ts
│   │   └── constants.ts
│   ├── styles/                     # CSS variables, themes
│   │   ├── theme.css
│   │   └── variables.css
│   ├── types/                      # Global types
│   │   └── index.ts
│   └── locales/                    # i18n translations
│       ├── id.json
│       └── en.json
├── scripts/
│   ├── generate-code-gs.js         # Generate Code.gs for download
│   └── setup-sheets.js             # Setup guide data
└── dist/                           # Build output
```

---

## 📦 Dependencies

### package.json Setup

```json
{
  "name": "langkahkecil",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.383.0",
    "date-fns": "^2.30.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "prettier": "^3.1.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.0"
  }
}
```

### Installation
```bash
npm install
```

---

## 🎨 Design Tokens & Tailwind Config

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        secondary: {
          coral: '#FF8B7B',
          mint: '#86EFAC',
          yellow: '#FCD34D',
          purple: '#A78BFA',
        },
        dark: {
          navy: '#0F172A',
          slate: {
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        },
        light: {
          warm: '#FAFAF9',
        }
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'ui-sans-serif'],
      },
      fontSize: {
        'xs': ['11px', '1.4'],
        'sm': ['12px', '1.5'],
        'base': ['14px', '1.5'],
        'lg': ['16px', '1.5'],
        'xl': ['20px', '1.4'],
        '2xl': ['24px', '1.3'],
        '3xl': ['28px', '1.3'],
        '4xl': ['32px', '1.2'],
      },
      animation: {
        'bounce-sm': 'bounce 0.3s ease-out',
        'pulse-soft': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-smooth': 'spin 1.2s linear infinite',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🚀 Phase-by-Phase Development Plan

### PHASE 1: SETUP & FOUNDATION (4 hours)

#### Step 1.1: Project Initialization
- [ ] Create Vite + React + TypeScript project
- [ ] Configure Tailwind CSS
- [ ] Setup folder structure (per structure above)
- [ ] Create .env.example
- [ ] Setup basic ESLint + Prettier

#### Step 1.2: Core Types & Store
- [ ] Create `src/types/index.ts` with all TypeScript interfaces
  - Task, Transaction, WeightLog, Category, UserSettings
- [ ] Create Zustand store (`src/store/index.ts`)
  - Implement all store actions
  - Configure localStorage persistence
  - Setup middleware for sync queue
- [ ] Create `src/services/storageService.ts`
  - LocalStorage read/write utilities
  - Encryption helpers (optional)

#### Step 1.3: Layout Components
- [ ] Create `MainLayout.tsx` (responsive wrapper)
- [ ] Create `Header.tsx` (logo, theme toggle, language selector)
- [ ] Create `BottomNav.tsx` (floating style on mobile)
  - 4 icons: Tasks, Finance, Weight, Settings
  - Active state styling
- [ ] Create `Sidebar.tsx` (desktop navigation)
  - Same 4 items as bottom nav
  - Fixed left position

#### Step 1.4: Common UI Components
Build reusable components following DESIGN.md:
- [ ] `Button.tsx` (primary, secondary, tertiary, icon variants)
- [ ] `Card.tsx` (standard + accent variants)
- [ ] `Modal.tsx` (dialog with backdrop)
- [ ] `Toast.tsx` (notification system)
- [ ] `Input.tsx` (text, number, with validation states)
- [ ] `Checkbox.tsx` (with animation)
- [ ] `Toggle.tsx` (switch)
- [ ] `DatePicker.tsx` (simple date input)
- [ ] `Dropdown.tsx` (select)

**Deliverable:** App loads with responsive layout, navigation works, no data yet.

---

### PHASE 2: TO-DO LIST FEATURE (6 hours)

#### Step 2.1: Task Components
- [ ] `TaskCard.tsx` 
  - Checkbox (animated)
  - Task name (editable inline)
  - Color bar indicator
  - Drag handle (visible on hover)
  - Delete button (hover reveal)
- [ ] `TaskList.tsx`
  - Render array of tasks
  - Handle drag-and-drop reordering
  - Show completed state styling
  - Empty state with illustration
- [ ] `AddTaskModal.tsx`
  - Task name input
  - Color picker (6 colors)
  - Add button
- [ ] `ColorPicker.tsx`
  - 6 color circles
  - Selection state
  - Click handler

#### Step 2.2: Tasks Page
- [ ] Create `src/pages/Tasks.tsx`
  - Title "Daftar Tugas"
  - Active task counter
  - Focus timer button (header)
  - TaskList component
  - FAB for add task
- [ ] Implement focus timer modal
  - Time input (HH:MM:SS)
  - Preset buttons (25 min, 45 min, 1 hour)
  - Start/Pause buttons
  - Progress ring animation
  - Sound alert on complete

#### Step 2.3: Tasks Store Actions
- [ ] `addTask()` - Generate UUID, add to store
- [ ] `updateTask()` - Update task properties
- [ ] `deleteTask()` - Remove from store + queue for sync
- [ ] `reorderTasks()` - Update order after drag-drop
- [ ] Complete task checkbox handler

**Deliverable:** Tasks page fully functional, can add/edit/delete/reorder, LocalStorage working.

---

### PHASE 3: FINANCIAL TRACKER FEATURE (8 hours)

#### Step 3.1: Finance Components
- [ ] `SummaryCards.tsx`
  - Income card (mint green accent)
  - Expense card (coral accent)
  - Dynamic amounts from filtered data
- [ ] `TrendChart.tsx` (Bar chart)
  - Recharts BarChart component
  - Last 7 days data
  - Green bars for income, red for expense
  - Hover tooltip with amounts
  - Responsive sizing
- [ ] `FilterChips.tsx`
  - Chips: "Semua", "Pemasukan", "Pengeluaran"
  - Click handler to filter list
- [ ] `TransactionCard.tsx`
  - Category icon (circle with background)
  - Category name (pill tag)
  - Amount (color-coded: green +, red -)
  - Date & time
  - Delete on swipe/hover
- [ ] `TransactionList.tsx`
  - Render filtered transaction array
  - Group by date (optional)
  - Empty state
- [ ] `AddTransactionModal.tsx`
  - Type toggle: Income ↔ Expense
  - Amount input (numeric, with Rp prefix)
  - Category dropdown (searchable)
  - "Tambah Kategori Baru" option
  - Date picker
  - Notes textarea
  - Save button

#### Step 3.2: Finance Page
- [ ] Create `src/pages/Finance.tsx`
  - Title "Keuangan"
  - Date range selector (Today/Week/Month/Custom)
  - SummaryCards component
  - TrendChart component
  - FilterChips component
  - TransactionList component
  - FAB for add transaction

#### Step 3.3: Finance Store Actions
- [ ] `addTransaction()` 
- [ ] `updateTransaction()`
- [ ] `deleteTransaction()`
- [ ] `addCategory()` - Custom category support
- [ ] Selectors for filtered data:
  - `getTransactionsByType(type)`
  - `getTransactionsByDateRange(start, end)`
  - `getTrendData(days = 7)`
  - `getSummaryData()`

#### Step 3.4: Default Categories
- [ ] Load default categories in store:
  - Makanan 🍜
  - Transport 🚗
  - Belanja 🛒
  - Gaji 💰
  - Hiburan 🎭
  - Utilities 💡
  - Kesehatan 🏥
  - Pendidikan 📚

**Deliverable:** Finance page fully functional, charts rendering, data filtering working.

---

### PHASE 4: WEIGHT TRACKER FEATURE (6 hours)

#### Step 4.1: Weight Components
- [ ] `CurrentWeight.tsx`
  - Display latest weight + date
  - BMI status indicator
- [ ] `BMICalculator.tsx`
  - Height input (cm)
  - Weight input (kg)
  - Calculate button
  - Result display:
    - BMI score (large)
    - Status + playful icon:
      - Underweight: Thin figure, blue, "Kurang berat badan"
      - Normal: Happy figure, green, "Berat ideal! 🎉"
      - Overweight: Round figure, yellow, "Kelebihan berat"
      - Obese: Very round, orange, "Obesitas"
  - BMI formula: weight (kg) / (height (m) ^ 2)
- [ ] `TrendChart.tsx` (Line chart)
  - Recharts LineChart component
  - Weight history (default 30 days)
  - Smooth curve line (blue)
  - Data point dots
  - Hover tooltip
  - Time range filters: 7 days / 30 days / 3 months
- [ ] `WeightCard.tsx`
  - Date (prominent)
  - Weight (large)
  - Food notes (expandable)
  - Edit/delete icons
- [ ] `WeightList.tsx`
  - Render weight logs
  - Group by date
  - Empty state

#### Step 4.2: Add Weight Modal
- [ ] `AddWeightModal.tsx`
  - Date picker (defaults to today)
  - Weight input (kg, allow decimals)
  - Food diary textarea (optional)
  - Placeholder: "Apa yang kamu makan hari ini?"
  - Helper: "Contoh: Nasi goreng (siang), Salad (malam)"
  - Save button

#### Step 4.3: Weight Page
- [ ] Create `src/pages/Weight.tsx`
  - Title "Berat Badan"
  - CurrentWeight component
  - BMICalculator component
  - TrendChart component
  - WeightList component
  - FAB for add weight

#### Step 4.4: Weight Store Actions
- [ ] `addWeight()`
- [ ] `updateWeight()`
- [ ] `deleteWeight()`
- [ ] Selectors:
  - `getCurrentWeight()` - Latest entry
  - `getWeightTrend(days)`
  - `calculateBMI(height, weight)` - Returns {score, status, statusText}

**Deliverable:** Weight page fully functional, BMI calculator working, charts rendering.

---

### PHASE 5: SETTINGS & INTEGRATION (6 hours)

#### Step 5.1: Settings Components
- [ ] `AppearanceSection.tsx`
  - Theme toggle (Light/Dark)
  - Language selector (ID/EN)
- [ ] `SyncSection.tsx`
  - AppScript URL input
  - Connection status indicator (green/yellow/red)
  - Test connection button
  - Last sync timestamp
  - Manual sync button ("Sinkronkan Sekarang")
- [ ] `DownloadCodeSection.tsx`
  - Prominent blue button: "📥 Unduh Code.gs"
  - Generates Code.gs file (see TECHNICAL_SPECS.md)
- [ ] `SetupGuideSection.tsx` (Expandable)
  - Step-by-step instructions:
    1. Buat Google Sheet baru
    2. Klik Extensions > Apps Script
    3. Unduh Code.gs
    4. Copy-paste code
    5. Deploy sebagai Web App
    6. Copy URL deployment
    7. Paste di pengaturan aplikasi
  - Each step with icon
- [ ] `CacheSection.tsx`
  - Cache info: "Data tersimpan lokal: X KB"
  - Clear cache button (with confirmation)
  - Reset app button (with confirmation)
  - Offline mode indicator

#### Step 5.2: Settings Page
- [ ] Create `src/pages/Settings.tsx`
  - Title "Pengaturan"
  - Section cards:
    - Appearance
    - Data & Sync
    - Cache Management
    - Setup Guide
    - About
  - Auto-save (no manual save button)

#### Step 5.3: Theme Implementation
- [ ] Create theme context/hook
- [ ] CSS variables for light/dark mode
- [ ] Toggle localStorage persistence
- [ ] Apply theme to all components
- [ ] Test dark mode on all screens

#### Step 5.4: Localization (i18n)
- [ ] Create simple translation system
  - `useTranslation()` hook
  - `src/locales/id.json` (Indonesian)
  - `src/locales/en.json` (English)
- [ ] Translate all UI text:
  - Page titles
  - Button labels
  - Placeholders
  - Toast messages
  - Empty state text

#### Step 5.5: AppScript Service
- [ ] Create `src/services/appScriptService.ts`
  - `healthCheck()` - Test connection
  - `init()` - Initialize sheets
  - `fetchCollection(name)` - Fetch all records
  - `create(collection, data)` - Create record
  - `update(collection, id, data)` - Update record
  - `delete(collection, id)` - Delete record
  - `sync(records)` - Batch sync

#### Step 5.6: Sync & Online Detection
- [ ] `useOnline()` hook
  - Detect online/offline
  - Show "Bekerja Offline" badge when offline
- [ ] Sync queue implementation
  - Queue changes when offline
  - Auto-sync when online (optional)
  - Manual sync trigger
  - Success/error handling with toasts

**Deliverable:** Settings fully functional, theme switching works, sync system ready.

---

### PHASE 6: TESTING & POLISH (4 hours)

#### Step 6.1: Cross-Device Testing
- [ ] Test on 375px (mobile)
  - Bottom nav floating visible
  - All inputs accessible
  - Touch targets 44px+
  - Responsive layouts
- [ ] Test on 1024px (desktop)
  - Left sidebar visible
  - Proper spacing
  - Multi-column layouts
- [ ] Test on tablet (768px)
  - Responsive breakpoint working

#### Step 6.2: Theme & Language
- [ ] Light mode - all screens
- [ ] Dark mode - all screens
- [ ] Indonesian - all screens
- [ ] English - all screens

#### Step 6.3: Functionality Tests
- [ ] Create task → Edit → Delete → Drag reorder
- [ ] Add transaction → Filter → Check chart updates
- [ ] Log weight → Check BMI → Check trend chart
- [ ] Toggle theme → Persist after reload
- [ ] Change language → All text updates
- [ ] Offline mode → Create items → Online → Sync

#### Step 6.4: Performance
- [ ] Lighthouse audit (target 90+)
- [ ] Bundle size check (target < 500KB gzipped)
- [ ] LocalStorage performance < 100ms
- [ ] App startup < 2s

#### Step 6.5: Polish & Refinement
- [ ] Smooth transitions & animations
- [ ] Loading states on all async operations
- [ ] Error handling & user feedback (toasts)
- [ ] Input validation with Zod
- [ ] Accessibility (keyboard nav, ARIA labels)
- [ ] Remove console logs & debug code

**Deliverable:** Production-ready MVP, all features tested & polished.

---

## 💡 Important Implementation Notes

### 1. Color Palette Usage
```typescript
// Tasks: Use all 6 colors for task tags
const colors = ['blue', 'coral', 'mint', 'yellow', 'purple', 'gray'];

// Finance Summary Cards: Mint green (income), Coral (expense)
// Weight Status: Blue (underweight), Green (normal), Yellow (overweight), Orange (obese)
```

### 2. Empty States
Create cute illustrations for:
- Empty tasks: Penguin with empty checklist
- Empty transactions: Piggy bank with dropping coin
- Empty weight logs: Scale with question mark

Use simple SVG or emoji combinations.

### 3. Toast System
Implement centralized toast notifications:
```typescript
const { showToast } = useToast();
showToast('Success message', 'success'); // green
showToast('Error message', 'error');     // red
showToast('Info message', 'info');       // blue
```

### 4. Drag & Drop Implementation
Use React DnD or Dnd Kit for task reordering:
```typescript
// Simple library recommendation: react-beautiful-dnd (simple API)
// Or dnd-kit (modern, performant)
```

### 5. Charts with Recharts
```typescript
// Bar Chart (Financial)
<BarChart data={trendData}>
  <XAxis dataKey="date" />
  <YAxis />
  <Bar dataKey="income" fill="#86EFAC" radius={[4,4,0,0]} />
  <Bar dataKey="expense" fill="#FF8B7B" radius={[4,4,0,0]} />
</BarChart>

// Line Chart (Weight)
<LineChart data={weightData}>
  <XAxis dataKey="date" />
  <YAxis />
  <Line type="monotone" dataKey="weight" stroke="#3B82F6" isAnimationActive />
</LineChart>
```

### 6. Form Validation
Use Zod + React Hook Form:
```typescript
const schema = z.object({
  name: z.string().min(1).max(200),
  amount: z.number().min(1),
  date: z.date(),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

### 7. UUID Generation
Use simple UUID library:
```typescript
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
```

### 8. LocalStorage Keys
Keep pattern consistent:
```
langkahkecil:tasks
langkahkecil:transactions
langkahkecil:weights
langkahkecil:categories
langkahkecil:settings
langkahkecil:sync-queue
```

### 9. Responsive Breakpoints
```css
Mobile: 0px - 767px (bottom nav, single column)
Tablet: 768px - 1023px (adaptive)
Desktop: 1024px+ (sidebar + multi-column)
```

Use Tailwind's responsive prefix: `md:`, `lg:`

### 10. Time Formatting
Use date-fns:
```typescript
import { format, parseISO } from 'date-fns';
import { id, enUS } from 'date-fns/locale';

format(date, 'dd MMM yyyy', { locale: language === 'id' ? id : enUS })
```

---

## 🔗 AppScript Integration Checklist

When user is ready to sync:

1. [ ] User creates Google Sheet
2. [ ] User opens Extensions → Apps Script
3. [ ] User downloads Code.gs from Settings
4. [ ] User copies entire Code.gs content
5. [ ] User pastes into Apps Script editor
6. [ ] User clicks Deploy → New Deployment → Select Type: Web App
7. [ ] User sets permissions to "Execute as: [User]"
8. [ ] User sets access to "Anyone"
9. [ ] User copies deployment URL
10. [ ] User pastes URL in Settings → AppScript URL
11. [ ] User clicks "Test Connection" (should show success)
12. [ ] User clicks "Sinkronkan Sekarang" (syncs local data to sheet)

---

## 📊 File Size & Performance Targets

```
Total Bundle: < 500KB gzipped
- React + ReactDOM: ~150KB
- Tailwind CSS: ~100KB
- Recharts: ~80KB
- Zustand + Zod: ~30KB
- Date-fns: ~50KB
- App code: ~50KB
- Other: ~40KB

LocalStorage: < 5MB
- Max ~1000 tasks
- Max ~5000 transactions
- Max ~1000 weight logs
```

---

## 🚀 Deployment Instructions

After building locally:

### Option A: Vercel
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts, select dist folder
```

### Option B: GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[username]/langkahkecil.git
git push -u origin main

# Then in GitHub: Settings → Pages → Source: Deploy from branch
# Branch: main, Folder: /root or /dist (if using build script)
```

### Option C: Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## 🎓 Key Learning Resources

### For Components
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com
- Lucide icons: https://lucide.dev

### For State Management
- Zustand docs: https://github.com/pmndrs/zustand
- localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

### For Forms
- React Hook Form: https://react-hook-form.com
- Zod validation: https://zod.dev

### For Charts
- Recharts: https://recharts.org

### For Date Handling
- date-fns: https://date-fns.org

---

## 🆘 Troubleshooting Guide

### Issue: LocalStorage quota exceeded
**Solution:** Clear cache from Settings → Clear Cache, or increase quota

### Issue: AppScript sync failing
**Solution:** 
- Check AppScript URL is correct
- Verify "Test Connection" works first
- Check Google Sheet has proper columns
- Review AppScript logs in Google Apps Script editor

### Issue: Charts not rendering
**Solution:** 
- Ensure data format matches Recharts schema
- Check console for errors
- Verify data array is not empty
- Add loading state while data loads

### Issue: Mobile nav overlapping content
**Solution:** 
- Add bottom padding to page: `pb-24` on Tailwind
- Adjust FAB position to avoid overlap
- Test with safe area (iPhone notch)

### Issue: Dark mode colors look wrong
**Solution:** 
- Verify CSS variables are set correctly
- Check Tailwind dark mode class is applied
- Review color contrast (WCAG AA)
- Test in actual dark mode device/browser

---

## ✅ Pre-Launch Checklist

Before deploying to production:

- [ ] All features working (tasks, finance, weight, settings)
- [ ] Responsive tested (375px, 768px, 1024px)
- [ ] Dark mode tested
- [ ] Both languages working
- [ ] AppScript integration tested
- [ ] Offline mode tested
- [ ] Bundle size checked
- [ ] Lighthouse score 90+
- [ ] No console errors
- [ ] No infinite loops or memory leaks
- [ ] Favicon updated
- [ ] Meta tags updated
- [ ] README.md complete
- [ ] Code formatted & linted
- [ ] Git history clean
- [ ] Environment variables documented
- [ ] Deployment URL working
- [ ] Share link with test users

---

## 📝 Code Style Guidelines

### File Naming
```
Components: PascalCase (Button.tsx)
Utilities: camelCase (formatters.ts)
Stores: camelCase (taskSlice.ts)
Types: PascalCase (index.ts exports)
```

### Component Structure
```typescript
// Imports
import React from 'react';
import { useStore } from '@/store';

// Types
interface Props {
  title: string;
  onClick: () => void;
}

// Component
export const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  // Hooks
  const state = useStore((s) => s.state);
  
  // JSX
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default MyComponent;
```

### Store Actions
```typescript
const useStore = create<AppStore>()((set, get) => ({
  tasks: [],
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
}));
```

---

## 🎯 Success Criteria

The MVP is complete when:

1. **Feature Complete**
   - All 4 screens fully functional
   - All CRUD operations working
   - Charts rendering correctly

2. **Data Persistence**
   - LocalStorage working
   - AppScript integration working
   - Sync queue functioning

3. **User Experience**
   - Responsive on all device sizes
   - Dark mode working
   - Languages switching working
   - Smooth animations

4. **Quality**
   - No console errors
   - Performance targets met
   - Accessibility standards met
   - Code well-organized

5. **Deployment**
   - Built successfully
   - Deployed to live URL
   - All features work in production

---

## 🎉 Next Steps (After MVP)

- v1.1: User authentication (Google OAuth)
- v1.2: Multi-device sync
- v1.3: Recurring transactions/tasks
- v1.4: Budget planning & alerts
- v1.5: Advanced analytics
- v2.0: Mobile app (React Native)
- v2.1: Collaborative features

---

**This is your comprehensive build guide. Good luck! 🚀**

For questions or clarifications, refer back to:
- **PRD.md** - What to build
- **DESIGN.md** - How it should look
- **TECHNICAL_SPECS.md** - How to build it

Start with Phase 1, complete one phase at a time. Good luck! 💪

