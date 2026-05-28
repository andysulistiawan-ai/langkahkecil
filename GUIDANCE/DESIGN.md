# 🎨 langkahkecil - Design System & UI Specifications

**Version:** 1.0.0  
**Status:** Final for Development

---

## 📐 Design Foundation

### Color Palette

#### Primary Palette
```
Cool Blue (Primary):
  - Blue-50:   #EFF6FF
  - Blue-100:  #DBEAFE
  - Blue-300:  #93C5FD
  - Blue-400:  #60A5FA
  - Blue-500:  #3B82F6 ← PRIMARY
  - Blue-600:  #2563EB
  - Blue-700:  #1D4ED8
  - Blue-900:  #1E3A8A
```

#### Secondary Palette
```
Warm Coral:  #FF8B7B
Mint Green:  #86EFAC
Sunny Yellow: #FCD34D
Purple Grape: #A78BFA
Coral Dark:  #FF6B5B
Mint Dark:   #4ADE80
```

#### Neutral Palette (Light Mode)
```
White:       #FFFFFF
Warm Gray-50: #FAFAF9  ← App background
Gray-100:    #F3F4F6
Gray-200:    #E5E7EB
Gray-300:    #D1D5DB
Gray-400:    #9CA3AF
Gray-500:    #6B7280
Gray-600:    #4B5563
Charcoal:    #1F2937  ← Primary text
```

#### Neutral Palette (Dark Mode)
```
Deep Navy:   #0F172A  ← App background
Slate-900:   #0F172A
Slate-800:   #1E293B
Slate-700:   #334155  ← Card background
Slate-600:   #475569
Slate-400:   #94A3B8
Slate-300:   #CBD5E1
Cloud:       #F1F5F9  ← Primary text
```

#### Status Colors
```
Success:     #10B981 (Emerald)
Error:       #EF4444 (Red)
Warning:     #F59E0B (Amber)
Info:        #3B82F6 (Blue)
Disabled:    #D1D5DB (Gray)
```

---

### Typography System

#### Font Family
```
Primary: 'Nunito' or 'Quicksand' (fallback: system sans-serif)
  - Font weight: 400 (regular), 600 (semibold), 700 (bold)
  
Monospace (for URLs/code): 'Menlo' or 'Courier New'
```

#### Type Scale
```
H1 - Display Large
  - Size: 32px
  - Weight: 700
  - Line-height: 1.2
  - Usage: Page titles, app logo name

H2 - Display Medium
  - Size: 28px
  - Weight: 700
  - Line-height: 1.3
  - Usage: Modal titles, major section headers

H3 - Heading Large
  - Size: 24px
  - Weight: 600
  - Line-height: 1.3
  - Usage: Screen section titles

H4 - Heading Medium
  - Size: 20px
  - Weight: 600
  - Line-height: 1.4
  - Usage: Card titles, subsection headers

Body Large
  - Size: 16px
  - Weight: 400
  - Line-height: 1.5
  - Usage: Primary body text, transaction names, input labels

Body Regular
  - Size: 14px
  - Weight: 400
  - Line-height: 1.5
  - Usage: Secondary text, descriptions, helper text

Body Small
  - Size: 12px
  - Weight: 400
  - Line-height: 1.5
  - Usage: Captions, timestamps, secondary info

Caption
  - Size: 11px
  - Weight: 400
  - Line-height: 1.4
  - Usage: Meta labels, badge text

Button Text
  - Size: 14px
  - Weight: 600
  - Line-height: 1.4
  - Usage: All button labels
```

#### Text Colors
```
Light Mode:
  - Primary text:    #1F2937 (Charcoal, on white backgrounds)
  - Secondary text:  #6B7280 (Gray-500, descriptions)
  - Tertiary text:   #9CA3AF (Gray-400, captions)
  - Disabled text:   #D1D5DB (Gray-300)

Dark Mode:
  - Primary text:    #F1F5F9 (Cloud, on dark backgrounds)
  - Secondary text:  #CBD5E1 (Slate-300, descriptions)
  - Tertiary text:   #94A3B8 (Slate-400, captions)
  - Disabled text:   #475569 (Slate-600)
```

---

## 🎯 Spacing & Layout System

### Spacing Scale (4px base grid)
```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
14:  56px
16:  64px
```

### Container Sizes
```
Mobile (375px):
  - Content padding: 16px sides
  - Safe area width: 343px
  - Max-width: None

Tablet (768px):
  - Content padding: 20px sides
  - Safe area width: 728px

Desktop (1024px+):
  - Content padding: 32px sides
  - Max-width: 1200px
  - Sidebar: 240px (fixed left)
  - Content area: calc(100% - 240px)
```

### Card & Component Spacing
```
Card padding:          16px
Card gap (internal):   12px
Section margin:        24px
Component gap:         8px
Button group gap:      12px
Form field gap:        16px
List item gap:         12px (cards), 8px (dense list)
Modal padding:         24px
Modal border-radius:   20px
```

---

## 🎨 Component Specifications

### Buttons

#### Primary Button
```
State: Default
  - Background: #3B82F6 (Blue-500)
  - Text: White, 600 weight
  - Padding: 12px 24px
  - Border-radius: 8px
  - Height: 44px minimum
  - Box-shadow: 0 1px 3px rgba(0,0,0,0.1)

State: Hover
  - Background: #2563EB (Blue-600)
  - Transform: scale(1.02)
  - Box-shadow: 0 4px 6px rgba(0,0,0,0.15)

State: Active/Press
  - Background: #1D4ED8 (Blue-700)
  - Transform: scale(0.98)

State: Disabled
  - Background: #D1D5DB (Gray-300)
  - Opacity: 0.5
  - Cursor: not-allowed
```

#### Secondary Button (Outline)
```
State: Default
  - Border: 2px solid #3B82F6
  - Background: Transparent
  - Text: #3B82F6
  - Padding: 10px 22px (account for border)
  - Border-radius: 8px
  - Height: 44px minimum

State: Hover
  - Background: rgba(59,130,246,0.05)
  - Border-color: #2563EB
```

#### Tertiary Button (Ghost)
```
State: Default
  - Background: Transparent
  - Text: #3B82F6
  - Padding: 12px 16px
  - Border-radius: 8px

State: Hover
  - Background: rgba(59,130,246,0.1)
```

#### Icon Button
```
- Size: 40px × 40px minimum (touch target)
- Icon size: 20px × 20px
- Border-radius: 8px
- Hover: Background color fade in (rgba of primary color)
```

#### FAB (Floating Action Button)
```
- Size: 56px diameter
- Icon size: 28px
- Background: #3B82F6
- Position: Bottom-right on mobile (16px from bottom/right)
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Hover: scale(1.05), shadow increase
- On mobile with bottom nav: Offset up to avoid overlap (72px from bottom)
```

#### Pill Button (Preset/Quick)
```
- Background: Varies by context (e.g., #DBEAFE for blue)
- Text: Primary text color
- Padding: 8px 16px
- Border-radius: 20px
- Font-size: 12px
- Height: 32px
- Border: 2px solid transparent
- Active state: Filled with darker shade + border highlight
```

### Input Fields

#### Text Input
```
State: Default
  - Background: White / #1E293B (dark)
  - Border: 1px solid #E5E7EB / #334155
  - Padding: 12px 16px
  - Border-radius: 8px
  - Height: 44px
  - Font-size: 14px
  - Placeholder color: #9CA3AF

State: Focus
  - Border: 2px solid #3B82F6
  - Box-shadow: 0 0 0 3px rgba(59,130,246,0.1)
  - Outline: none

State: Error
  - Border: 2px solid #EF4444
  - Box-shadow: 0 0 0 3px rgba(239,68,68,0.1)
  - Error text: 12px, color #EF4444, below input
```

#### Number Input (Currency)
```
- Prefix icon: "Rp" in gray
- Right-aligned text
- Font-family: monospace (for visual clarity)
- Thousand separator: Automatic
- Min width: 100px
```

#### Date/Time Input
```
- Calendar icon on left
- Format: DD-MMM-YYYY
- On mobile: Native date picker
- On desktop: Calendar widget or text input with validation
- Required: Highlight if empty
```

#### Textarea
```
- Padding: 12px 16px
- Min-height: 80px
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Resize: Vertical only
- Max-width: 100%
- Same focus/error states as text input
```

#### Checkbox
```
State: Unchecked
  - Size: 20px × 20px
  - Border: 2px solid #3B82F6
  - Border-radius: 4px
  - Background: White

State: Checked
  - Background: #3B82F6
  - Checkmark: White, 2px stroke
  - Animation: Bounce (scale 1.2 → 1.0)

State: Disabled
  - Border: 2px solid #D1D5DB
  - Opacity: 0.5
```

#### Toggle Switch
```
State: Off
  - Background: #E5E7EB
  - Circle: White, 4px margin
  - Size: 44px width × 24px height
  - Border-radius: 12px

State: On
  - Background: #3B82F6
  - Circle: White, moves right
  - Animation: Smooth slide

State: Transition
  - Background color fade
  - Circle movement smooth
```

#### Dropdown/Select
```
- Similar styling to text input
- Icon: Chevron-down on right
- Hover: Light background change
- Open state: Border color blue, icon rotated
- Options: Same styling as pills, hover highlight
- Search-able: Text input variant
```

#### Color Picker
```
- Display 6 circles in horizontal row
- Circle size: 40px diameter
- Colors: Blue, Coral, Mint, Yellow, Purple, Gray
- Unselected: Border 2px solid #E5E7EB
- Selected: 
  * Outer ring: 3px solid #3B82F6
  * Scale: 1.1
  * Box-shadow: 0 0 0 2px #3B82F6
```

### Cards

#### Standard Card
```
Light Mode:
  - Background: #FFFFFF
  - Border: 1px solid #F3F4F6
  - Border-radius: 12px
  - Padding: 16px
  - Box-shadow: 0 1px 2px rgba(0,0,0,0.05)

Dark Mode:
  - Background: #1E293B
  - Border: 1px solid #334155
  - Same other properties

State: Hover
  - Transform: translateY(-2px)
  - Box-shadow: 0 4px 12px rgba(0,0,0,0.1)
  - Transition: all 200ms ease-out
```

#### Accent Card (Summary Cards)
```
- Same as standard card
- Top accent border: 4px solid in primary or secondary color
- OR: Colored left edge (4px)
- Title color: Slightly darker
- Number/value: Larger text (20px+), bold
```

#### Colored Header Card (like reference)
```
- Example: Green/Pink summary cards
- Top section: Solid color background (Mint/Coral/Yellow/etc)
- Top padding: 12px
- Title: White text, 12px caption
- Bottom section: White background
- Content: Standard card style
- Height varies by content
```

### Task Card (To-Do)
```
Layout:
  - Left: Drag handle (6-dot icon, 24px, gray-400)
  - Center-left: Checkbox (20px)
  - Center: Task text (flex-grow)
  - Right: Delete icon (hover state), 24px

Task states:
  - Active: Full opacity, normal text, white background
  - Completed: 50% opacity, strikethrough text, light gray bg
  - Dragging: 
    * Lifted shadow (0 10px 25px rgba(0,0,0,0.2))
    * Slight rotation (2-3deg)
    * Cursor: grabbing

Color bar:
  - Left edge, 4px thick
  - Colors match color palette (Blue/Coral/Mint/Yellow/Purple/Gray)
  - Appears even when task completed (faded)
```

### Transaction Item
```
Layout (mobile):
  - Top row: Date label (14px, gray) / Delete icon (hover)
  - Main row:
    * Left: Category icon circle (40px, colored background)
    * Center:
      - Category name (14px, gray pill background)
      - Transaction note/name (16px, primary text)
      - Time (12px, gray)
    * Right: Amount (16px, bold, color-coded: green for +, red for -)

Layout (desktop):
  - Single row with more horizontal space
  - Amount larger

Swipe action (mobile):
  - Swipe left: Reveal delete button
  - Swipe right: Reveal edit button
  - Bounce back after action
```

### Navigation

#### Bottom Navigation (Mobile - Floating Style)
```
Position: Fixed bottom, centered
  - Bottom: 16px
  - Left: 50%, transform translateX(-50%)
  - Width: fit-content
  - Min-width: 280px (for 4 items)

Styling:
  - Background: White / #1E293B (dark)
  - Border-radius: 20px
  - Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
  - Padding: 8px 12px
  - Border: 1px solid #F3F4F6

Items (4 total):
  - Each item: 56px width
  - Icon: 24px
  - Label: 10px below icon
  - Gap: 4px between items

Active state:
  - Icon + label: #3B82F6
  - Background: rgba(59,130,246,0.1)
  - Border-radius: 12px
  - Padding: 8px 12px

Inactive state:
  - Icon + label: #9CA3AF
  - No background

Safe area adjustment:
  - On devices with home indicator: Add 24px bottom margin
  - Prevent overlap with content
```

#### Left Sidebar (Desktop)
```
Position: Fixed left, 240px width
  - Background: White / #1E293B
  - Border-right: 1px solid #E5E7EB

Header section:
  - Height: 56px
  - Padding: 16px
  - Logo + app name (16px bold)

Navigation items:
  - Height: 48px each
  - Padding: 0 16px
  - Icon: 24px + label 14px
  - Gap: 8px between icon/label

Active state:
  - Background: #EFF6FF (light) / #334155 (dark)
  - Left border: 4px solid #3B82F6
  - Label: #3B82F6

Inactive state:
  - Label: Gray-600
  - Hover: Light background change

Footer (bottom of sidebar):
  - Theme toggle + language selector
  - 48px height
  - Divider line above
```

### Charts & Data Visualization

#### Bar Chart (Financial Trend)
```
Dimensions:
  - Height: 200px on mobile, 240px on desktop
  - Width: Full container width minus padding
  - Margins: 16px all sides

Styling:
  - Background: Transparent
  - Grid lines: Light gray, 1px, dashed
  - Axes: Gray text, 12px

Bars:
  - Income: Mint green (#86EFAC)
  - Expense: Coral red (#FF8B7B)
  - Grouped by day
  - Border-radius: 4px top (rounded top)
  - Spacing: 12px between groups
  - Hover: Opacity increase + tooltip

Tooltip:
  - Background: #1F2937 (dark), white text
  - Border-radius: 6px
  - Padding: 8px 12px
  - Arrow pointer
  - Fade in/out 150ms
```

#### Line Chart (Weight Trend)
```
Dimensions:
  - Height: 240px
  - Width: Full container
  - Margins: 20px

Styling:
  - Background: Transparent or light gradient
  - Grid: Light gray, subtle

Line:
  - Color: #3B82F6 (primary blue)
  - Width: 2px
  - Curve: Smooth bezier
  - Stroke-linecap: round

Data points:
  - Circles, 6px diameter
  - Color: #3B82F6
  - Hover: Scale up, show tooltip

Tooltip:
  - Background: Dark, white text
  - Shows: Date + weight

Reference line (if goal exists):
  - Dashed, color: #10B981
  - Label: "Target"
```

### Modals & Overlays

#### Modal Dialog
```
Backdrop:
  - Background: rgba(0,0,0,0.5)
  - Blur: 4px filter (optional)
  - Click outside closes (unless blocking)

Modal container:
  - Background: White / #1E293B
  - Border-radius: 20px
  - Width: 90vw (mobile), 500px (desktop)
  - Max-height: 90vh
  - Box-shadow: 0 10px 40px rgba(0,0,0,0.2)
  - Padding: 24px

Header:
  - Title: H2 size, bold
  - Close button: Top-right, X icon
  - Divider: Light border below (optional)

Content:
  - Form fields with 16px gap
  - Scrollable if exceeds max-height

Footer:
  - Action buttons aligned right
  - Primary button (blue) first
  - Secondary button (outline) second
  - Gap: 12px between buttons
  - Padding-top: 24px, divider line above

Animation:
  - Enter: scale(0.95) + opacity fade in
  - Exit: Reverse
  - Duration: 200ms ease-out
```

#### Toast Notification
```
Position: Bottom-center or bottom-right (desktop)
  - Bottom: 24px (or 24px + safe area)
  - Max-width: 380px
  - Z-index: 1000

Styling:
  - Background: Dark (near black)
  - Text: White, 14px
  - Border-radius: 8px
  - Padding: 12px 16px
  - Box-shadow: 0 4px 12px rgba(0,0,0,0.3)

Types:
  - Success: Green left border, checkmark icon
  - Error: Red left border, X icon
  - Info: Blue left border, info icon
  - Warning: Yellow left border, warning icon

Animation:
  - Enter: slideUp + fadeIn (300ms)
  - Exit: slideDown + fadeOut (200ms)
  - Auto-dismiss: 4 seconds
  - Hover: Pause dismiss timer
```

### Empty States
```
Container:
  - Centered content
  - Padding: 48px 24px
  - Min-height: 300px

Illustration:
  - Size: 120px × 120px
  - Cute, playful, minimal
  - Color: Light blue or secondary color
  - Margin-bottom: 24px

Heading:
  - H3 size, bold
  - Color: Primary text
  - Margin-bottom: 8px

Subheading:
  - Body small size
  - Color: Secondary text
  - Margin-bottom: 24px

Call-to-action:
  - Primary button or link
  - Text: "Mulai" or "Tambah [item]"
```

---

## 🎯 Responsive Design Rules

### Mobile (375px - 767px)
- Single column layout
- Full-width containers with 16px padding
- Bottom navigation floating (4 items)
- Larger touch targets (44px minimum)
- Stacked form fields
- Modals: Full screen or 90vw width
- Hamburger menu if needed (but MVP has simple nav)

### Tablet (768px - 1023px)
- Begin showing sidebar on right side (if space permits)
- 2-column layouts for cards/lists
- Some inline form fields
- Bottom nav converts to sidebar nav
- Moderate spacing increase

### Desktop (1024px+)
- Fixed left sidebar (240px)
- 2-3 column layouts
- Larger spacing (32px)
- Modal: 500px width centered
- Inline forms full width
- Side-by-side card layouts

---

## ✨ Micro-Interactions & Animations

### Timing Functions
```
Fast:      150ms ease-out (buttons, simple fades)
Standard:  200ms ease-out (card hovers, modal enters)
Smooth:    300ms cubic-bezier(0.34, 1.56, 0.64, 1) (bounce, drag)
Slow:      500ms ease-out (loading states)
```

### Key Animations

#### Button Interactions
```
Hover: scale(1.02) + shadow lift
Press: scale(0.98)
Release: Scale back to 1
Transition: smooth 150ms
```

#### Checkbox
```
Uncheck → Check: 
  - Scale from 0.8 to 1.1 then back to 1.0
  - Checkmark draws in (stroke animation)
  - Duration: 300ms
```

#### Drag & Drop
```
Grab:
  - Cursor changes to 'grabbing'
  - Element lifts (translateZ or shadow)
  - Rotate slightly (2deg)

Dragging:
  - Opacity: 0.8
  - Shadow: Increased
  - Smooth follow cursor

Drop:
  - Element animates to final position
  - Bounce back if invalid drop zone
  - Duration: 200ms ease-out
```

#### Form Focus
```
Input focus:
  - Border color to primary blue
  - Glow ring appears (box-shadow)
  - Duration: 150ms
  - Glow color: rgba(59,130,246,0.1)
```

#### Loading States
```
Spinner:
  - Rotating geometric shape (circle or dots)
  - Duration: 1.2s infinite linear
  - Color: Primary blue
  - Size: 20px

Skeleton:
  - Gray placeholder blocks
  - Pulse animation (opacity 0.5 ↔ 1.0)
  - Duration: 1s ease-in-out
```

#### Page Transitions
```
Enter screen:
  - Fade in: opacity 0 → 1
  - Slight slide up: translateY(10px) → 0
  - Duration: 300ms ease-out

Exit screen:
  - Fade out: opacity 1 → 0
  - Slide down: translateY(-10px)
  - Duration: 200ms ease-in
```

---

## 🌙 Dark Mode Implementation

### Key Differences
- All colors automatically adjust via CSS variables
- No additional design needed - mapped to dark palette
- Shadows slightly stronger in dark (more visible)
- Text colors inverted for contrast (WCAG AA minimum)
- Brand elements (logo) may need inverted version

### CSS Variables Pattern
```css
:root {
  --color-primary: #3B82F6;
  --color-bg: #FAFAF9;
  --color-bg-card: #FFFFFF;
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
}

[data-theme="dark"] {
  --color-primary: #60A5FA;
  --color-bg: #0F172A;
  --color-bg-card: #1E293B;
  --color-text: #F1F5F9;
  --color-text-secondary: #CBD5E1;
}
```

---

## ♿ Accessibility Considerations

- All buttons/clickables: 44px minimum
- Color contrast: WCAG AA standard (4.5:1 for text)
- Focus indicators: Visible ring around interactive elements
- Keyboard navigation: All features accessible via keyboard
- Screen reader: Semantic HTML, ARIA labels where needed
- Motion: Respect prefers-reduced-motion media query
- Touch: Min 8px gap between touch targets

---

## 🚀 Implementation Notes

- Use CSS-in-JS or Tailwind with custom configuration
- Store colors in theme context/provider
- Create reusable component library
- Test all components in light + dark mode
- Test all components on 375px viewport
- Ensure smooth animations on lower-end devices (fallback to faster animations)

---

**Document Status:** ✅ Ready for Development  
**Next:** Review TECHNICAL_SPECS.md for architecture & database schema
