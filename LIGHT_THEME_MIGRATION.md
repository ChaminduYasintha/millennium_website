# Light Theme Migration Guide

## ✅ Completed Changes

### 1. ✅ Tailwind Config Updated
- Added light theme color palette
- New colors: `brand-white`, `brand-light-gray`, `brand-gray`, `brand-dark-gray`, `brand-text`, `brand-text-light`, `brand-blue-dark`

### 2. ✅ Navigation Component Updated  
- White background with subtle shadow
- Logo integrated from `/public/logo.png`
- Text colors updated to dark on light background
- Hover states adjusted for light theme

### 3. ✅ Construction Page (Partial)
- Hero section converted to light theme

## 🔄 Quick Reference: Dark to Light Class Conversions

Use this reference to update remaining pages:

### Background Classes
```
bg-brand-black          → bg-white
bg-gray-900             → bg-brand-light-gray
bg-gradient-to-br from-gray-900 to-brand-black → bg-gradient-to-br from-white to-brand-light-gray
```

### Text Classes
```
text-white              → text-brand-text
text-gray-300           → text-brand-text-light
text-gray-400           → text-brand-dark-gray
```

### Border Classes
```
border-brand-cyan/20    → border-gray-200
border-brand-cyan/50    → border-brand-cyan
```

### Card/Section Classes  
```
Dark Card:
bg-gradient-to-br from-gray-900 to-brand-black p-8 rounded-2xl border border-brand-cyan/20

Light Card:
bg-white p-8 rounded-2xl border border-gray-200 shadow-lg
```

## 📝 Step-by-Step Conversion for Each Page

### For `index.astro`:
1. Update hero section backgrounds
2. Convert service card backgrounds to white with shadows
3. Update all text colors
4. Adjust CTA button hover states

### For `properties.astro`:
1. Update page background to `bg-brand-light-gray`
2. Convert property cards to white backgrounds
3. Update filter buttons
4. Adjust text colors throughout

### For `construction.astro`:
Still needs:
1. Construction services section (lines 40-217)
2. Quantity surveying section (lines 220-368)
3. 2D/3D Drafting section (lines 371-464)
4. CTA section (lines 467-502)

### For `about.astro`:
1. Update all sections
2. Convert team cards to light theme
3. Update timeline if present

### For `contact.astro`:
1. Update form styling
2. Convert contact cards
3. Update input field styles

## 🎨 Light Theme Design Principles

### Contrast & Readability
- Main text: `text-brand-text` (#212529)
- Secondary text: `text-brand-text-light` (#495057)
- Muted text: `text-brand-dark-gray` (#6C757D)

### Backgrounds
- Page background: `bg-brand-light-gray` (#F8F9FA)
- Card background: `bg-white` (#FFFFFF)
- Alternate sections: `bg-brand-gray` (#E9ECEF)

### Accents
- Primary: `text-brand-cyan` (#00AEEF) - Keep as is
- Interactive hover: `text-brand-blue-dark` (#0066CC)

### Shadows (Add to cards)
```
shadow-sm       - Subtle elevation
shadow-md       - Standard cards
shadow-lg       - Important elements
shadow-xl       - Modals/overlays
```

## 🚀 Automated Conversion (Manual Find & Replace)

Open each `.astro` file and use Find & Replace:

1. `bg-brand-black` → `bg-white`
2. `bg-gray-900` → `bg-brand-light-gray`
3. `text-white` → `text-brand-text`
4. `text-gray-300` → `text-brand-text-light`
5. `text-gray-400` → `text-brand-dark-gray`
6. `border-brand-cyan/20` → `border-gray-200`

Then manually add shadows to cards:
- Find: `rounded-2xl border`
- Add: `shadow-lg` after `border border-gray-200`

## 💡 Next Steps

1. **Complete construction.astro**: Update remaining sections
2. **Update index.astro**: Homepage conversion
3. **Update properties.astro**: Property listings
4. **Update about.astro**: About page
5. **Update contact.astro**: Contact form
6. **Update Footer component**: If it has dark colors
7. **Test all pages**: Ensure readability and contrast

## 🔍 Testing Checklist

After converting each page:
- [ ] All text is readable (good contrast)
- [ ] Buttons are visible and have proper hover states
- [ ] Cards have appropriate shadows for depth
- [ ] Brand cyan accent is still prominent
- [ ] Forms are styled correctly
- [ ] Mobile responsive design still works
- [ ] No dark backgrounds remain (unless intentional)

## 🎯 Brand Consistency

Keep these elements consistent across all pages:
- Logo in navigation (already done ✅)
- Brand cyan (#00AEEF) for CTAs and accents
- White cards with `shadow-lg `
- Consistent spacing: `py-20` for sections
- Border radius: `rounded-2xl` for cards

---

**Need help?** Check the completed Navigation.astro component as a reference for light theme styling.
