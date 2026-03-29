# Testing Checklist

## Pre-Launch Testing

### ✅ Basic Functionality
- [ ] App loads without errors
- [ ] Initial palette generates on load
- [ ] Generate button creates new palette
- [ ] Size controls (+/-) work correctly
- [ ] Brand selector switches brands
- [ ] Harmony selector changes harmony method

### ✅ Harmony Methods
Test each harmony method generates appropriate colors:

- [ ] **Analogous** - Colors are adjacent on wheel
- [ ] **Complementary** - Colors are opposite on wheel
- [ ] **Triadic** - Colors are evenly spaced (120°)
- [ ] **Monochromatic** - Colors are same hue family
- [ ] **Split Complementary** - Base + adjacent to complement
- [ ] **Tetradic** - Four colors in rectangle pattern

### ✅ Locked Colors
- [ ] Lock icon toggles correctly
- [ ] Locked colors persist through regeneration
- [ ] First locked color becomes harmony base
- [ ] Multiple locked colors are preserved
- [ ] Harmony respects locked color's hue
- [ ] Unlock all colors works

### ✅ Manual Color Selection
- [ ] Palette icon opens modal
- [ ] Search filters markers correctly
- [ ] Selecting marker updates palette
- [ ] Selected marker is auto-locked
- [ ] Modal closes after selection
- [ ] Search clears on close

### ✅ Brand Switching
Test with each brand:

- [ ] **Ohuhu** - Shows old/new code dialog
- [ ] **Decotime** - Loads correctly
- [ ] **ChenRui** - Loads correctly
- [ ] Switching brands regenerates palette
- [ ] Locked colors are cleared on brand switch
- [ ] Code type selector works (Ohuhu only)

### ✅ Size Changes
- [ ] Size 2 (minimum) works
- [ ] Size 7 (maximum) works
- [ ] Increasing size adds new colors
- [ ] Decreasing size removes colors
- [ ] Locked colors preserved when resizing
- [ ] Buttons disable at min/max

### ✅ UI/UX
- [ ] Colors display correctly
- [ ] Hex codes are readable
- [ ] Marker codes/names show
- [ ] Copy hex to clipboard works
- [ ] "Copied!" tooltip appears
- [ ] Drag to reorder works
- [ ] Mobile layout responsive
- [ ] Desktop layout responsive

### ✅ Edge Cases
- [ ] All colors locked - generates correctly
- [ ] No colors locked - picks random base
- [ ] Single color palette
- [ ] Maximum palette size (7)
- [ ] Rapid clicking Generate button
- [ ] Switching harmony without regenerating
- [ ] Invalid/missing marker data

### ✅ Performance
- [ ] Generation is instant (< 100ms)
- [ ] No lag when switching harmony
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] Works on slower devices

### ✅ Browser Compatibility
Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### ✅ Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Touch targets adequate (mobile)

## Detailed Test Scenarios

### Scenario 1: First-Time User
```
1. Open app
2. Observe initial palette (should be harmonious)
3. Click Generate multiple times
4. Try each harmony method
5. Lock a color
6. Generate again
7. Verify harmony respects locked color
```

### Scenario 2: Designer Workflow
```
1. Select brand (e.g., Ohuhu)
2. Choose harmony (e.g., Analogous)
3. Generate until finding a good base color
4. Lock the base color
5. Generate to explore variations
6. Manually adjust one color
7. Lock it
8. Generate final palette
9. Copy hex codes
```

### Scenario 3: Brand Color Matching
```
1. Open manual color picker
2. Search for specific brand color
3. Select and lock it
4. Choose Analogous harmony
5. Generate palette
6. Verify all colors harmonize with brand color
7. Export/copy palette
```

### Scenario 4: High Contrast Design
```
1. Select Complementary harmony
2. Generate palette
3. Verify high contrast
4. Lock primary color
5. Generate variations
6. Test with different brands
```

### Scenario 5: Monochromatic Elegance
```
1. Select Monochromatic harmony
2. Lock favorite blue
3. Generate palette
4. Verify all colors are blue family
5. Check different shades present
6. Test with different base colors
```

## Bug Reporting Template

If you find issues, report with:

```markdown
### Bug Description
[Clear description of the issue]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [etc.]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [e.g., Desktop, iPhone 14]
- Screen Size: [e.g., 1920x1080]

### Screenshots
[If applicable]

### Console Errors
[Any errors in browser console]
```

## Performance Benchmarks

Expected performance:
- Initial load: < 2 seconds
- Generate palette: < 100ms
- Switch harmony: < 50ms
- Lock/unlock: < 10ms
- Manual selection: < 500ms

## Acceptance Criteria

### Must Have ✅
- [x] All harmony methods work correctly
- [x] Locked colors are respected
- [x] No duplicate markers in palette
- [x] All markers are real/purchasable
- [x] UI is responsive
- [x] No console errors

### Should Have ✅
- [x] Smooth animations
- [x] Mobile-friendly
- [x] Fast performance
- [x] Clear visual feedback
- [x] Intuitive UX

### Nice to Have 🎯
- [ ] Harmony preview/explanation
- [ ] Save favorite palettes
- [ ] Export functionality
- [ ] Undo/redo
- [ ] Keyboard shortcuts

## Sign-Off

### Developer
- [ ] Code reviewed
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Documentation complete
- [ ] Tests passing

### QA
- [ ] All test cases passed
- [ ] Edge cases verified
- [ ] Performance acceptable
- [ ] Cross-browser tested
- [ ] Mobile tested

### Product Owner
- [ ] Meets requirements
- [ ] UX approved
- [ ] Ready for production
- [ ] Documentation reviewed

---

**Testing Date**: _____________

**Tested By**: _____________

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Needs Review

**Notes**:
```
