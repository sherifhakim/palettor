# Architecture Overview

## System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Brand Select │  │ Harmony Type │  │   Generate   │         │
│  │   Dropdown   │  │   Dropdown   │  │    Button    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    app/page.tsx (Main Component)                │
│                                                                 │
│  State Management:                                              │
│  • palette: PaletteColor[]                                      │
│  • harmonyMethod: HarmonyMethod                                 │
│  • brand: string                                                │
│  • size: number                                                 │
│                                                                 │
│  Functions:                                                     │
│  • generatePalette() ──────────────────────┐                   │
│  • toggleLock()                            │                   │
│  • handleGenerate()                        │                   │
└────────────────────────────────────────────┼───────────────────┘
                                             │
                                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              lib/color-harmony.ts (Core Logic)                  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ generateHarmoniousPalette()                               │ │
│  │                                                           │ │
│  │  1. Determine Base Hue                                    │ │
│  │     ├─ Locked colors? → Use first locked                 │ │
│  │     └─ No locks? → Random marker                          │ │
│  │                                                           │ │
│  │  2. Calculate Target Hues                                 │ │
│  │     └─ calculateHarmonyHues(baseHue, method, count)      │ │
│  │                                                           │ │
│  │  3. Preprocess Markers                                    │ │
│  │     └─ preprocessMarkersWithHue(markers, brand)          │ │
│  │                                                           │ │
│  │  4. Match Markers to Target Hues                          │ │
│  │     └─ findClosestMarkerByHue(targetHue, markers, used)  │ │
│  │                                                           │ │
│  │  5. Assemble Final Palette                                │ │
│  │     ├─ Preserve locked colors                             │ │
│  │     └─ Fill with harmonious markers                       │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      chroma-js Library                          │
│                                                                 │
│  • Color parsing: chroma(hex)                                   │
│  • HSL extraction: color.get('hsl.h')                           │
│  • Luminance calculation: color.luminance()                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Marker Data Files                          │
│                                                                 │
│  • lib/ohuhu-markers.ts                                         │
│  • lib/decotime-markers.ts                                      │
│  • lib/chenRui-markers.ts                                       │
│                                                                 │
│  Each marker: { code, hex, name?, ... }                         │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Interaction
```
User clicks "Generate"
    ↓
handleGenerate() called
    ↓
generatePalette(size, palette, brand, false)
```

### 2. Palette Generation
```
generatePalette()
    ↓
Adjust palette size (add/remove slots)
    ↓
Call generateHarmoniousPalette()
    ↓
Return new palette
    ↓
setPalette(newPalette)
    ↓
UI re-renders with new colors
```

### 3. Harmony Calculation
```
generateHarmoniousPalette()
    ↓
Step 1: Find base hue
    ├─ Locked colors exist?
    │   └─ Yes: baseHue = chroma(lockedColor.hex).get('hsl.h')
    └─ No: baseHue = randomMarker.hue
    ↓
Step 2: Calculate target hues
    └─ calculateHarmonyHues(baseHue, method, size)
        ├─ Analogous: [base, base+30, base-30, base+60, ...]
        ├─ Complementary: [base, base+180, base+180, ...]
        ├─ Triadic: [base, base+120, base+240, ...]
        ├─ Monochromatic: [base, base, base, ...]
        ├─ Split Complementary: [base, base+150, base+210, ...]
        └─ Tetradic: [base, base+60, base+180, base+240, ...]
    ↓
Step 3: Preprocess markers
    └─ For each marker:
        └─ Extract hue: chroma(marker.hex).get('hsl.h')
    ↓
Step 4: Match markers to targets
    └─ For each target hue:
        ├─ Calculate distance to each marker's hue
        ├─ Account for circular nature (0° = 360°)
        ├─ Find closest unused marker
        └─ Add to palette
    ↓
Step 5: Return palette
    └─ [locked colors preserved] + [harmonious markers]
```

## Component Structure

```
OhuhuPaletteGenerator (app/page.tsx)
│
├─ Header
│
├─ Reorder.Group (Palette Display)
│  └─ Reorder.Item (for each color)
│     ├─ Color Info (hex, code, name)
│     └─ Action Buttons
│        ├─ Palette Icon (manual selection)
│        └─ Lock Icon (toggle lock)
│
├─ Bottom Controls Bar
│  ├─ Size Controls (+/-)
│  ├─ Brand Selector
│  ├─ Harmony Method Selector ← NEW
│  └─ Generate Button
│
├─ Manual Color Selection Dialog
│  └─ Grid of all markers
│
└─ Settings Dialog (Ohuhu code type)
```

## State Management

```typescript
// Core State
palette: PaletteColor[]           // Current palette
size: number                       // Number of colors (2-7)
brand: string                      // 'ohuhu' | 'decotime' | 'chenrui'
harmonyMethod: HarmonyMethod       // Harmony type ← NEW

// UI State
isClient: boolean                  // Client-side rendering flag
isMobile: boolean                  // Mobile detection
copiedId: string | null            // Copied color feedback
isDialogOpen: boolean              // Settings dialog
isManualModalOpen: boolean         // Manual selection dialog
colorToEditId: string | null       // Color being edited
searchQuery: string                // Manual selection search
codeType: CodeType                 // 'old' | 'new' (Ohuhu only)
```

## Type Definitions

```typescript
// Main Types
type HarmonyMethod = 
  | 'analogous' 
  | 'complementary' 
  | 'triadic' 
  | 'monochromatic' 
  | 'split-complementary' 
  | 'tetradic';

interface PaletteColor {
  id: string;
  marker: AnyMarker;
  locked: boolean;
  brandKey: string;
}

// Internal Types (color-harmony.ts)
interface MarkerWithHue {
  marker: any;
  hue: number;
  brandKey: string;
}
```

## Algorithm Complexity

```
Preprocessing markers: O(n)
  where n = number of markers in brand

Finding closest marker: O(n * m)
  where n = palette size
        m = number of markers

Overall: O(n * m)
  Typical: O(5 * 300) = O(1500) operations
  Performance: < 1ms on modern hardware
```

## Key Design Decisions

1. **Real Markers Only**
   - No color generation, only selection from existing markers
   - Ensures all colors are purchasable

2. **Hue-Based Matching**
   - Uses HSL color space for intuitive harmony
   - Ignores saturation/lightness for broader matches

3. **Circular Hue Math**
   - Properly handles 0° = 360° wraparound
   - Uses min(diff, 360-diff) for distance

4. **Locked Color Priority**
   - First locked color becomes harmony base
   - Other locked colors preserved in position

5. **No Duplicates**
   - Tracks used markers with Set<string>
   - Ensures each marker appears once

6. **Fallback Strategy**
   - If no unused markers match target hue
   - Falls back to any unused marker
   - Prevents generation failures
