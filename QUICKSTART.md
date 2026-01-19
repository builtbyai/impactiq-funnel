# Quick Start Guide - ImpactIQ Funnel

Get up and running with the ImpactIQ roofing funnel in under 5 minutes!

## Choose Your Version

### Option 1: Static HTML (Instant - No Setup)

Perfect for quick testing or if you don't need React.

1. **Open the file**
   ```bash
   # Just double-click or open in browser:
   index.html
   ```

2. **That's it!** The site is fully functional without any build step.

**Pros:**
- Zero dependencies
- Instant load
- Easy to customize
- Works anywhere

**Cons:**
- No React features
- Manual DOM manipulation
- Harder to scale

---

### Option 2: React + Vite (Recommended)

Modern React app with hot reload and optimized builds.

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Start Development Server

```bash
npm run dev
```

Your browser will automatically open to `http://localhost:3000`

#### Step 3: Make Changes

Edit any file in `src/` and see instant hot-reload updates!

**Pros:**
- Component-based architecture
- Hot module reload
- TypeScript support (optional)
- Optimized production builds
- Better developer experience

---

## What You Get

✅ **Full Roofing Funnel Website** with 7 sections:
1. Hero with animated stats
2. Features (6 roofing-specific features)
3. Benefits (4 key advantages)
4. How It Works (4-step process)
5. Social Proof (3 testimonials)
6. Lead Capture Form (with validation)
7. Footer

✅ **Fully Responsive** - Mobile, tablet, and desktop optimized

✅ **Modern Animations** - Scroll animations, hover effects, smooth transitions

✅ **Form Validation** - Built-in email, phone, and required field validation

✅ **Production Ready** - Optimized for performance and SEO

---

## Next Steps

### 1. Add Your Branding

**Logo:**
```bash
# Add your logo to:
assets/impactiq-logo.png          # PNG logo (200x60px recommended)
assets/impactiq-logo-animated.gif # Animated GIF (400x400px)
```

**Colors:**
```css
/* Edit src/styles/styles.css */
:root {
  --primary-blue: #1e40af;      /* Your primary color */
  --accent-orange: #f97316;     /* Your accent color */
}
```

### 2. Customize Content

All content is in React components in `src/components/`:
- `Hero.jsx` - Hero section text
- `Features.jsx` - Feature cards
- `SocialProof.jsx` - Testimonials
- `CTASection.jsx` - Form and CTA

### 3. Connect to Your Backend

Update form submission in `src/components/CTASection.jsx`:

```javascript
// Replace this:
await new Promise(resolve => setTimeout(resolve, 1500))

// With your API call:
await fetch('https://your-api.com/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### 4. Deploy

**Build for production:**
```bash
npm run build
```

**Deploy to Netlify:**
```bash
# Drag and drop the 'dist' folder to netlify.com
```

**Or use Vercel:**
```bash
npm install -g vercel
vercel
```

---

## Common Tasks

### Change Navigation Links

Edit `src/components/Navbar.jsx`:
```jsx
<a href="#features">Features</a>
<a href="#pricing">Pricing</a>  {/* Add new link */}
```

### Add New Section

1. Create component:
```bash
# Create: src/components/Pricing.jsx
```

2. Import in App:
```jsx
// src/App.jsx
import Pricing from './components/Pricing'

function App() {
  return (
    <>
      {/* ...existing sections... */}
      <Pricing />
    </>
  )
}
```

### Update Social Links

Edit `src/components/Footer.jsx`:
```jsx
<a href="https://facebook.com/yourpage">
  <i className="fab fa-facebook"></i>
</a>
```

---

## Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port:
npm run dev -- --port 3001
```

**CSS not loading?**
```bash
# Clear cache and reinstall:
rm -rf node_modules
npm install
```

**Form not submitting?**
- Check browser console (F12)
- Verify API endpoint URL
- Check CORS settings on your backend

---

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check code quality
```

---

## Performance Tips

1. **Optimize Images**
   - Use WebP format
   - Compress with TinyPNG
   - Use proper dimensions

2. **Add Analytics**
   - Google Analytics 4
   - Facebook Pixel
   - Hotjar

3. **Enable Caching**
   - Set proper cache headers
   - Use CDN for assets

---

## Need Help?

- **Documentation**: See README.md
- **Issues**: Create a GitHub issue
- **Questions**: [your-email@example.com]

---

**Happy Building! 🚀**

Transform your roofing business with ImpactIQ!
