# ImpactIQ - AI-Powered Roofing Platform

A modern, conversion-optimized funnel website for ImpactIQ, an AI-powered platform designed for roofing contractors to detect storm damage, automate insurance claims, and manage roofing projects.

## Features

- **AI Damage Detection**: Instantly identify hail and storm damage with 99% accuracy
- **Claim Automation**: Generate adjuster-ready insurance reports in one click
- **Digital Inspections**: Mobile app for professional roof inspections
- **Storm Tracking**: Real-time storm alerts and hail mapping
- **Homeowner Portal**: Branded customer portal for project tracking
- **CRM & Pipeline**: Roofing-specific CRM for lead management

## Tech Stack

### Current (Static Version)
- HTML5
- CSS3 (Custom styling with animations)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter, Space Grotesk)

### React Version (Modern Build)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Component styling
- **ESLint** - Code linting

## Project Structure

```
impactiq-funnel/
├── assets/                 # Images, logos, media files
│   └── README.md          # Asset documentation
├── css/                   # Static CSS files
│   ├── styles.css
│   └── animations.css
├── js/                    # Static JavaScript
│   └── main.js
├── src/                   # React source files
│   ├── components/        # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Benefits.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── SocialProof.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useCounter.js
│   ├── styles/           # React CSS files
│   │   ├── index.css
│   │   ├── styles.css
│   │   └── animations.css
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   └── main.jsx          # React entry point
├── index.html            # Static HTML version
├── index-react.html      # React HTML entry
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (for React version)
- A modern web browser

### Static Version (No Build Required)

1. Clone the repository
2. Open `index.html` in your browser
3. That's it! No build step needed.

### React Version (Recommended)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Optimized files will be in the `dist/` directory

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Development

### Adding New Components

1. Create a new component file in `src/components/`
2. Import and use it in `src/App.jsx`

Example:
```jsx
// src/components/NewSection.jsx
export default function NewSection() {
  return (
    <section className="new-section">
      <div className="container">
        <h2>New Section</h2>
      </div>
    </section>
  )
}

// src/App.jsx
import NewSection from './components/NewSection'

function App() {
  return (
    <>
      {/* ... other components */}
      <NewSection />
    </>
  )
}
```

### Customizing Styles

- Global styles: `src/styles/styles.css`
- Animations: `src/styles/animations.css`
- CSS variables: Defined in `:root` in `styles.css`

### Form Submission

The signup form in `CTASection.jsx` currently uses a simulated API call. To integrate with a real backend:

1. Update the `handleSubmit` function in `src/components/CTASection.jsx`
2. Replace the simulated Promise with your actual API call

Example:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsSubmitting(true)

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!response.ok) throw new Error('Submission failed')

    setSubmitStatus('success')
    // Reset form...
  } catch (error) {
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Deployment

### Static Deployment (Netlify, Vercel, GitHub Pages)

1. Run build command: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure your hosting to serve `index.html` as the entry point

### Netlify (One-Click)

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel (One-Click)

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Customization

### Branding

1. **Logo**: Replace `/assets/impactiq-logo.png` with your logo
2. **Colors**: Update CSS variables in `src/styles/styles.css`:
   ```css
   :root {
     --primary-blue: #1e40af;
     --accent-orange: #f97316;
     /* ... other colors */
   }
   ```
3. **Typography**: Change Google Fonts import in `index-react.html`

### Content

1. **Hero Text**: Edit `src/components/Hero.jsx`
2. **Features**: Modify the `features` array in `src/components/Features.jsx`
3. **Testimonials**: Update `testimonials` array in `src/components/SocialProof.jsx`
4. **Footer Links**: Edit `src/components/Footer.jsx`

## Performance Optimization

The site is optimized for performance:

- ✅ Lazy loading images
- ✅ Minified CSS and JS in production
- ✅ Font preloading
- ✅ Intersection Observer for scroll animations
- ✅ Optimized React bundle with code splitting

### Performance Metrics (Target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

The site follows WCAG 2.1 Level AA standards:

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatible
- Color contrast compliance

## Analytics Integration

To add analytics tracking:

1. Add your tracking scripts to `index-react.html`
2. Update tracking functions in `src/components/` as needed

Example (Google Analytics 4):
```html
<!-- In index-react.html head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## License

MIT License - feel free to use this template for your projects

## Support

For issues or questions:
- Create an issue in this repository
- Contact: [your-email@example.com]

## Roadmap

- [ ] Add pricing page
- [ ] Integrate with CRM API
- [ ] Add live chat widget
- [ ] Implement A/B testing
- [ ] Add blog section
- [ ] Multi-language support

---

Built with ❤️ for roofing contractors
