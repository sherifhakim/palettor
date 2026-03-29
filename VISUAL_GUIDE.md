# Visual Guide - Color Harmony Feature

## UI Changes

### Before (Random Selection)
```
┌─────────────────────────────────────────────────────────┐
│  [Brand: Ohuhu ▼]                    [🪄 Generate]     │
└─────────────────────────────────────────────────────────┘
```

### After (Harmony Selection)
```
┌─────────────────────────────────────────────────────────┐
│  [Brand: Ohuhu ▼]  [Harmony: Analogous ▼]  [🪄 Generate]│
└─────────────────────────────────────────────────────────┘
```

## Color Wheel Visualization

```
                    0° RED
                     🔴
                     │
        330°         │         30°
         🟣          │          🟠
                     │
    300°             │             60°
     🟣              │              🟡
                     │
270°                 │                 90°
🔵                   │                   🟢
                     │
    240°             │             120°
     🔵              │              🟢
                     │
        210°         │         150°
         🟦          │          🟢
                     │
                180° CYAN
                     🟦
```

## Harmony Method Visualizations

### 1. Analogous (±30°)
```
Color Wheel:
        🔴 0°
       /│\
      / │ \
    🟣  │  🟠
   330° │ 30°
        │
    Adjacent colors

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟠 │ 🟣 │ 🟠 │ 🟣 │
│ 0° │30° │330°│60° │300°│
└────┴────┴────┴────┴────┘
```

### 2. Complementary (180°)
```
Color Wheel:
        🔴 0°
        │
        │
        │
    ────┼────
        │
        │
        │
       🟦 180°
    Opposite colors

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟦 │ 🟦 │ 🟦 │ 🟦 │
│ 0° │180°│180°│180°│180°│
└────┴────┴────┴────┴────┘
```

### 3. Triadic (120°)
```
Color Wheel:
        🔴 0°
       /│\
      / │ \
     /  │  \
    /   │   \
   🟢   │   🔵
  120°  │  240°
    Evenly spaced

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟢 │ 🔵 │ 🔴 │ 🟢 │
│ 0° │120°│240°│ 0° │120°│
└────┴────┴────┴────┴────┘
```

### 4. Monochromatic (0°)
```
Color Wheel:
        🔴 0°
        │
        │ Same hue
        │ Different shades
        │
        🔴 0°

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🔴 │ 🔴 │ 🔴 │ 🔴 │
│ 0° │ 0° │ 0° │ 0° │ 0° │
│Dark│Med │Lite│Pale│Vib │
└────┴────┴────┴────┴────┘
```

### 5. Split Complementary (150°, 210°)
```
Color Wheel:
        🔴 0°
        │
        │
    ────┼────
       /│\
      / │ \
    🟢  │  🔵
   150° │ 210°
    Adjacent to complement

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟢 │ 🔵 │ 🟠 │ 🟣 │
│ 0° │150°│210°│30° │330°│
└────┴────┴────┴────┴────┘
```

### 6. Tetradic (60°, 180°, 240°)
```
Color Wheel:
    🟡 60°   🔴 0°
      ┌───────┐
      │       │
      │       │
    🟢│       │🔵
   120°       240°
      │       │
      └───────┘
       🟦 180°
    Rectangle pattern

Example Palette:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟡 │ 🟦 │ 🔵 │ 🟢 │
│ 0° │60° │180°│240°│90° │
└────┴────┴────┴────┴────┘
```

## User Interaction Flow

### Scenario: Generate Analogous Palette

```
Step 1: Select Harmony
┌─────────────────────────────────────┐
│ Harmony: [Analogous ▼]              │
│          • Analogous        ✓       │
│          • Complementary            │
│          • Triadic                  │
│          • Monochromatic            │
│          • Split Complementary      │
│          • Tetradic                 │
└─────────────────────────────────────┘

Step 2: Click Generate
┌─────────────────────────────────────┐
│                    [🪄 Generate] ← Click
└─────────────────────────────────────┘

Step 3: View Result
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟠 │ 🟣 │ 🟠 │ 🟣 │
│Red │Org │Vio │Org │Vio │
│#e63│#f66│#ce3│#f49│#ac6│
└────┴────┴────┴────┴────┘
```

### Scenario: Lock Color and Generate

```
Step 1: Lock Favorite Color
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟢 │ 🔵 │ 🟡 │ 🟣 │
│ 🔒 │    │    │    │    │ ← Click lock on red
└────┴────┴────┴────┴────┘

Step 2: Select Harmony
Harmony: [Analogous ▼]

Step 3: Generate
[🪄 Generate] ← Click

Step 4: Result (Red is preserved, others harmonize)
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟠 │ 🟣 │ 🟠 │ 🟣 │
│ 🔒 │    │    │    │    │ ← Red locked, others harmonious
└────┴────┴────┴────┴────┘
```

## Hue Matching Process

### Visual Representation

```
Target Hue: 30° (Orange)
           ↓
Search all markers:
┌─────────────────────────────────────┐
│ Marker 1: #ff0000 → Hue: 0°        │ Distance: 30°
│ Marker 2: #ff8800 → Hue: 33°       │ Distance: 3° ✓ CLOSEST
│ Marker 3: #ffff00 → Hue: 60°       │ Distance: 30°
│ Marker 4: #00ff00 → Hue: 120°      │ Distance: 90°
│ ...                                 │
└─────────────────────────────────────┘
           ↓
Select: Marker 2 (#ff8800)
```

## Before/After Comparison

### Random Generation (Before)
```
Generate #1:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟢 │ 🟣 │ 🟡 │ 🔵 │
│Red │Grn │Pur │Yel │Blu │
└────┴────┴────┴────┴────┘
No relationship between colors

Generate #2:
┌────┬────┬────┬────┬────┐
│ 🟠 │ 🔵 │ 🟢 │ 🟣 │ 🟡 │
│Org │Blu │Grn │Pur │Yel │
└────┴────┴────┴────┴────┘
Still random, no harmony
```

### Harmony Generation (After)
```
Analogous #1:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟠 │ 🟣 │ 🟠 │ 🟣 │
│Red │Org │Vio │Org │Vio │
└────┴────┴────┴────┴────┘
Harmonious warm colors

Analogous #2:
┌────┬────┬────┬────┬────┐
│ 🔵 │ 🟦 │ 🟣 │ 🟦 │ 🟣 │
│Blu │Cyn │Vio │Cyn │Vio │
└────┴────┴────┴────┴────┘
Harmonious cool colors
```

## Mobile vs Desktop Layout

### Desktop
```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                   │
│ │  🔴 │ │  🟠 │ │  🟣 │ │  🟠 │ │  🟣 │                   │
│ │     │ │     │ │     │ │     │ │     │                   │
│ │ Red │ │ Org │ │ Vio │ │ Org │ │ Vio │                   │
│ │#e63 │ │#f66 │ │#ce3 │ │#f49 │ │#ac6 │                   │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                   │
│                                                             │
│ [- 5 +] [Brand ▼] [Harmony ▼] [🪄 Generate]               │
└─────────────────────────────────────────────────────────────┘
Horizontal layout
```

### Mobile
```
┌─────────────────────┐
│ ┌─────────────────┐ │
│ │       🔴        │ │
│ │       Red       │ │
│ │      #e63       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │       🟠        │ │
│ │       Org       │ │
│ │      #f66       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │       🟣        │ │
│ │       Vio       │ │
│ │      #ce3       │ │
│ └─────────────────┘ │
│                     │
│ [- 5 +]             │
│ [Brand ▼]           │
│ [Harmony ▼]         │
│ [🪄 Generate]       │
└─────────────────────┘
Vertical layout
```

## Color Picker Modal

```
┌─────────────────────────────────────────────────────────┐
│ Select Color                                        [X] │
│ Choose a specific Ohuhu marker                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Search: [orange_____________]                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌───┬───┬───┬───┬───┬───┬───┬───┐                     │
│ │🔴 │🟠 │🟡 │🟢 │🔵 │🟣 │⚫ │⚪ │                     │
│ │R1 │O1 │Y1 │G1 │B1 │P1 │BK │WH │                     │
│ ├───┼───┼───┼───┼───┼───┼───┼───┤                     │
│ │🔴 │🟠 │🟡 │🟢 │🔵 │🟣 │⚫ │⚪ │                     │
│ │R2 │O2 │Y2 │G2 │B2 │P2 │GY1│GY2│                     │
│ └───┴───┴───┴───┴───┴───┴───┴───┘                     │
│                                                         │
│ Showing 8 of 400 markers                                │
└─────────────────────────────────────────────────────────┘
```

## Harmony Selector Dropdown

```
┌─────────────────────────────────┐
│ Harmony: Analogous          [▼] │ ← Click
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ ✓ Analogous                     │ ← Currently selected
│   Complementary                 │
│   Triadic                       │
│   Monochromatic                 │
│   Split Complementary           │
│   Tetradic                      │
└─────────────────────────────────┘
```

## Lock/Unlock Animation

```
Unlocked State:
┌─────────────┐
│     🔴      │
│             │
│  🔓 Unlock  │ ← Hover shows icon
└─────────────┘

Click to Lock:
┌─────────────┐
│     🔴      │
│             │
│  🔒 Lock    │ ← Icon changes
└─────────────┘

Locked State (Persists):
┌─────────────┐
│     🔴      │
│     🔒      │ ← Always visible
│   Locked    │
└─────────────┘
```

## Copy Hex Feedback

```
Before Click:
┌─────────────┐
│     🔴      │
│   #e63540   │ ← Click hex
└─────────────┘

After Click:
┌─────────────┐
│   Copied!   │ ← Tooltip appears
│     🔴      │
│   #e63540 ✓ │
└─────────────┘

After 2 seconds:
┌─────────────┐
│     🔴      │
│   #e63540   │ ← Back to normal
└─────────────┘
```

## Drag to Reorder

```
Initial Order:
┌────┬────┬────┬────┬────┐
│ 🔴 │ 🟠 │ 🟡 │ 🟢 │ 🔵 │
│ 1  │ 2  │ 3  │ 4  │ 5  │
└────┴────┴────┴────┴────┘

Drag 🟡 to first position:
┌────┬────┬────┬────┬────┐
│ 🟡 │ 🔴 │ 🟠 │ 🟢 │ 🔵 │
│ 3  │ 1  │ 2  │ 4  │ 5  │
└────┴────┴────┴────┴────┘
```

## Legend

```
🔴 Red (0°)
🟠 Orange (30°)
🟡 Yellow (60°)
🟢 Green (120°)
🟦 Cyan (180°)
🔵 Blue (240°)
🟣 Violet (300°)
⚫ Black
⚪ White
🔒 Locked
🔓 Unlocked
🪄 Generate
▼ Dropdown
✓ Selected
```
