# 📱 langkahkecil - Product Requirements Document (PRD)

**Version:** 1.0.0 MVP  
**Last Updated:** May 2026  
**Status:** Ready for Development

---

## 🎯 Executive Summary

**langkahkecil** adalah aplikasi web multi-tracker yang membantu pengguna Indonesia melacak tiga aspek penting kehidupan sehari-hari:
- **To-Do List** - Manajemen tugas harian dengan prioritas visual
- **Financial Tracker** - Pencatatan pemasukan & pengeluaran
- **Weight Tracker** - Monitoring berat badan & asupan makanan harian

Aplikasi ini dirancang **mobile-first, playful-fun, dan fully offline-capable** dengan sinkronisasi ke Google Sheets tanpa perlu backend server berbayar.

**Target User:** Individu usia 18-45 tahun yang ingin membuat kebiasaan baik melalui tracking sederhana & visual.

---

## 📋 Feature Scope - MVP v1.0

### ✅ INCLUDED FEATURES

#### 1️⃣ **TO-DO LIST TRACKER**
- [x] Tambah tugas baru dengan nama & deskripsi singkat
- [x] Color-tag tugas (6 warna pilihan) sebagai pengganti kategori
- [x] Mark as done / uncheck dengan visual feedback (strikethrough)
- [x] Drag-and-drop untuk arrange prioritas urutan
- [x] Edit tugas inline (double-click untuk edit nama)
- [x] Delete tugas dengan confirm
- [x] **BONUS:** Focus Timer (mini Pomodoro) - settable jam/menit/detik
- [x] Tampil jumlah active tasks di header
- [x] Empty state dengan cute illustration
- [x] Responsive mobile dan desktop

#### 2️⃣ **FINANCIAL TRACKER**
- [x] Tambah transaksi (Pemasukan / Pengeluaran)
- [x] Input default kategori (Makanan, Transport, Belanja, Gaji, Hiburan, dll)
- [x] Opsi tambah kategori custom
- [x] Input tanggal & jam transaksi
- [x] Input amount & optional notes
- [x] Bar chart trend 7 hari (income vs expense, warna berbeda)
- [x] Transaction list dengan kategori icon, amount, date
- [x] Filter chips: Semua / Pemasukan / Pengeluaran
- [x] Quick stats: Total Pemasukan & Pengeluaran
- [x] Date range selector: Hari ini / Minggu ini / Bulan ini / Custom
- [x] Edit & delete transaksi
- [x] Empty state
- [x] Responsive design

#### 3️⃣ **WEIGHT TRACKER**
- [x] Log berat badan harian dengan date picker
- [x] Simpan food diary notes (text)
- [x] Line chart weight trend (default 30 hari)
- [x] Chart time range filter: 7 hari / 30 hari / 3 bulan
- [x] **BONUS:** BMI Calculator inline
  - Input height (cm) & weight (kg)
  - Output: BMI score + playful status (Underweight/Normal/Overweight/Obese)
  - Status icons dengan color coding
- [x] Current weight display dengan last updated
- [x] Edit & delete entries
- [x] Empty state
- [x] Responsive design

#### 4️⃣ **SETTINGS**
- [x] Theme toggle: Light / Dark mode (default Light)
- [x] Language selector: Indonesia / English (bilingual)
- [x] Google Sheets connection (AppScript URL input)
- [x] Test connection button
- [x] Manual sync trigger: "Sinkronkan Sekarang"
- [x] Last sync timestamp
- [x] Download Code.gs template button
- [x] Expandable setup guide (step-by-step)
- [x] Cache management: Clear cache + Reset app
- [x] Offline indicator badge
- [x] About section (version, tagline)

#### 5️⃣ **TECHNICAL FEATURES**
- [x] **Offline-first architecture** dengan LocalStorage caching
- [x] **Save-on-demand** (bukan auto-save, prevent excessive writes)
- [x] Manual sync to Google Sheets via AppScript
- [x] Responsive design (375px mobile → desktop)
- [x] Dark/Light mode toggle dengan persistence
- [x] Bilingual UI (ID/EN)
- [x] Touch-friendly (44px+ tap targets)
- [x] Mobile bottom nav (floating style, centered)
- [x] Desktop left sidebar
- [x] Toast notifications (success, error, info)
- [x] Smooth micro-interactions
- [x] Progressive load (instant from LocalStorage)

---

### ❌ OUT OF SCOPE (v2+)

- Budget limits per kategori
- Recurring transactions
- Multi-currency support
- Export data (CSV/PDF)
- Recurring tasks
- Sub-tasks
- Goal tracking (weight)
- Detailed nutrition logging
- Photo uploads
- Social sharing
- Cloud backup (non-AppScript)
- Mobile app (native iOS/Android)

---

## 👥 User Stories

### TO-DO LIST
```
USER STORY 1.1: Add Task
AS A user
I WANT TO add a new task with a name and optional color tag
SO THAT I can track my daily to-dos

ACCEPTANCE CRITERIA:
- Input field for task name (required)
- Color picker showing 6 colors
- Add button saves task instantly
- Task appears at bottom of list
- Color bar appears on left of task card
```

```
USER STORY 1.2: Prioritize Tasks
AS A user
I WANT TO drag tasks up/down to change priority order
SO THAT important tasks appear first

ACCEPTANCE CRITERIA:
- Drag handle visible on hover (mobile: always visible)
- Smooth drag animation
- Drop position saved immediately
- Reorder reflects in display
```

```
USER STORY 1.3: Complete Task
AS A user
I WANT TO check off completed tasks
SO THAT I can see my progress

ACCEPTANCE CRITERIA:
- Checkbox animates on click
- Checked tasks show strikethrough & fade
- Uncheck option available
- Counter updates
```

```
USER STORY 1.4: Focus Timer
AS A user
I WANT TO start a customizable focus timer
SO THAT I can do Pomodoro-style deep work

ACCEPTANCE CRITERIA:
- Timer icon always accessible (header)
- Modal shows time input (HH:MM:SS)
- Preset buttons: 25 min, 45 min, 1 hour
- Pause/Resume controls
- Sound alert when time's up
```

### FINANCIAL TRACKER
```
USER STORY 2.1: Log Transaction
AS A user
I WANT TO add income or expense with category, amount, date
SO THAT I can track where my money goes

ACCEPTANCE CRITERIA:
- Toggle between Income/Expense
- Amount field with Rp currency
- Category dropdown (default + custom option)
- Date/time picker
- Optional notes field
- Save button persists data
```

```
USER STORY 2.2: View Trend
AS A user
I WANT TO see a bar chart of daily income vs expense (last 7 days)
SO THAT I can visualize my spending patterns

ACCEPTANCE CRITERIA:
- Bar chart shows last 7 days
- Green bars for income
- Red bars for expense
- Day labels on X-axis
- Hover shows exact amounts
- Responsive sizing
```

```
USER STORY 2.3: Filter & Search
AS A user
I WANT TO filter transactions by type and date range
SO THAT I can find specific spending patterns

ACCEPTANCE CRITERIA:
- Filter chips: All / Income / Expense
- Date range: Today / This week / This month / Custom
- List updates instantly on filter change
- Summary cards update with filtered data
```

### WEIGHT TRACKER
```
USER STORY 3.1: Log Weight
AS A user
I WANT TO record my weight daily with optional food notes
SO THAT I can track health progress

ACCEPTANCE CRITERIA:
- Date picker (defaults to today)
- Weight input in kg
- Food diary textarea (optional)
- Save button
- Entry appears in list
```

```
USER STORY 3.2: Calculate BMI
AS A user
I WANT TO calculate my BMI and see a playful status
SO THAT I can understand my health category

ACCEPTANCE CRITERIA:
- Height input (cm)
- Weight input (kg)
- Calculate button
- Shows BMI score
- Status: Underweight (blue) / Normal (green) / Overweight (yellow) / Obese (orange)
- Status text: playful, encouraging tone
```

```
USER STORY 3.3: View Weight Trend
AS A user
I WANT TO see a line chart of my weight over time
SO THAT I can visualize progress

ACCEPTANCE CRITERIA:
- Line chart showing weight history
- Time filters: 7 days / 30 days / 3 months
- Smooth curve line
- Data point dots
- Current weight display
```

### SETTINGS
```
USER STORY 4.1: Connect to Google Sheets
AS A user
I WANT TO connect my AppScript URL for data sync
SO THAT my data persists in cloud

ACCEPTANCE CRITERIA:
- Input field for AppScript URL
- Test connection button
- Shows connection status (connected/error)
- Last sync timestamp
- Manual sync button
```

```
USER STORY 4.2: Download Setup Template
AS A user
I WANT TO download Code.gs template
SO THAT I can setup Google Sheets integration easily

ACCEPTANCE CRITERIA:
- Download button in settings
- Code.gs file downloads
- Expandable guide shows step-by-step instructions
- Guide includes screenshots/links
```

```
USER STORY 4.3: Toggle Theme
AS A user
I WANT TO switch between light/dark mode
SO THAT I can use app comfortably at any time

ACCEPTANCE CRITERIA:
- Toggle switch in header
- Applies instantly
- Persists in localStorage
- All screens theme properly
```

---

## 🎨 Design Language

### Visual Style
- **Aesthetic:** Playful, warm, fun cartoon style
- **Inspiration:** JoyHabit, Dailies
- **Primary Color:** Cool Blue (#3B82F6)
- **Secondary Colors:** Coral (#FF8B7B), Mint (#86EFAC), Yellow (#FCD34D), Purple (#A78BFA)
- **Typography:** Round friendly sans-serif (Nunito/Quicksand)
- **Spacing:** 4px/8px/16px/24px/32px grid
- **Border Radius:** 12px cards, 8px buttons, 20px pills
- **Icons:** Geometric, simple line icons with 2px stroke

### Micro-interactions
- Smooth hover transitions (scale 1.02)
- Bounce animations on completion
- Drag feedback with shadow lift
- Input focus glow rings
- Success checkmark animations

---

## 📱 Platform & Device Support

### Minimum Requirements
- **Mobile:** iOS Safari 13+, Android Chrome 80+
- **Desktop:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Screen sizes:** 375px (mobile) → 2560px (desktop)

### Responsive Breakpoints
- **Mobile:** 375px - 767px (bottom nav floating)
- **Tablet:** 768px - 1023px (sidebar + adaptive)
- **Desktop:** 1024px+ (left sidebar fixed)

---

## 🔌 Data Integration

### Persistence Strategy
1. **LocalStorage** - Immediate load, instant reads
2. **Google Sheets (via AppScript)** - Source of truth for cloud backup
3. **Save-on-demand** - Only sync when user clicks "Save" or "Sync Now"
4. **Offline-first** - App fully functional without internet

### Data Sync Flow
```
User Action → LocalStorage (instant) → Toast "Tersimpan"
User clicks "Sinkronkan Sekarang" → AppScript API call → Sheet update → Toast "Sinkronisasi berhasil"
App startup → Load from LocalStorage → Check AppScript for updates → Merge if needed
```

---

## ✅ Acceptance Criteria - MVP Complete

**The MVP is complete when:**
- [ ] All 4 main screens (To-Do, Finance, Weight, Settings) are fully functional
- [ ] Offline functionality tested (LocalStorage working)
- [ ] AppScript integration working (sync successful)
- [ ] Responsive on 375px mobile + 1024px desktop
- [ ] Dark mode toggle works
- [ ] Language switch (ID/EN) works
- [ ] All micro-interactions smooth
- [ ] Toast notifications displaying correctly
- [ ] Focus timer functional
- [ ] BMI calculator accurate
- [ ] Charts rendering correctly
- [ ] Empty states showing
- [ ] Touch targets 44px+
- [ ] Performance: Load in < 2s, LocalStorage read < 100ms
- [ ] All buttons/links accessible (keyboard nav)

---

## 📊 Success Metrics (Post-Launch)

- User retention: 40%+ after 7 days
- Daily active users: Track habit logging
- Average session duration: 5-10 minutes
- Sync success rate: 99%+
- Crash rate: < 0.1%

---

## 🚀 Development Timeline (Estimate)

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup & Config | 2 hours | Repo, build tools, design tokens |
| Core Components | 8 hours | Buttons, inputs, cards, nav |
| To-Do List | 6 hours | Add, edit, drag, delete, timer |
| Financial Tracker | 8 hours | Transactions, chart, filters |
| Weight Tracker | 6 hours | Logger, chart, BMI calculator |
| Settings & Sync | 6 hours | AppScript integration, theme, language |
| Testing & Polish | 4 hours | Edge cases, performance, accessibility |
| **TOTAL** | **~40 hours** | **Production-ready MVP** |

---

## 📝 Notes

- All timestamps use local user timezone
- All amounts use Indonesian Rupiah (Rp) by default
- Error states should include retry options
- All operations should have loading states
- Success feedback should be positive & encouraging
- Copy should be friendly and conversational (tidak formal)

---

**Document Status:** ✅ Ready for Design System & Technical Specs  
**Next Steps:** Review DESIGN.md and TECHNICAL_SPECS.md
