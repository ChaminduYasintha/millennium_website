# 🚀 Quick Start Guide - Millennium Property Development

## ✅ What's Been Built

Your complete digital platform is ready with:

### Pages
- ✅ **Home** (`/`) - Hero, Featured 16M House, Services Grid
- ✅ **Properties** (`/properties`) - Filterable property listings
- ✅ **Construction** (`/construction`) - Services, QS, 2D/3D Drafting
- ✅ **About** (`/about`) - Company story & values
- ✅ **Contact** (`/contact`) - Contact form with WhatsApp integration

### Features
- ✅ Premium dark mode (Black #000000 + Cyan #00AEEF)
- ✅ Mobile-first responsive design
- ✅ WhatsApp floating button (+94 778 778 109)
- ✅ SEO optimized with meta tags
- ✅ Professional typography (Inter, Space Grotesk, Sinhala support)
- ✅ Supabase integration ready
- ✅ Cloudflare Pages deployment ready

## 🏃 Running the Site

The development server is currently running at: **http://localhost:4321**

To start it again later:
```bash
npm run dev
```

## 📊 Next Steps: Setting Up Supabase

1. **Create a Supabase Account**
   - Visit https://supabase.com
   - Create a new project

2. **Create the Properties Table**
   ```sql
   CREATE TABLE properties (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title TEXT NOT NULL,
     location TEXT NOT NULL,
     perch_price NUMERIC NOT NULL,
     total_perches NUMERIC NOT NULL,
     has_water BOOLEAN DEFAULT false,
     has_electricity BOOLEAN DEFAULT false,
     has_telephone BOOLEAN DEFAULT false,
     distance_to_kandy TEXT,
     landmark TEXT,
     agent_name TEXT NOT NULL,
     agent_phone TEXT NOT NULL,
     images TEXT[],
     video_url TEXT,
     tour_360_url TEXT,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key

4. **Configure Environment**
   - Create a `.env` file in the project root
   - Add your credentials:
     ```env
     PUBLIC_SUPABASE_URL=your_project_url_here
     PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
     PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     ```

5. **Add Sample Properties**
   - Use the Supabase dashboard to add property listings
   - Include agent details: Uthpala, Dinushika, or Channa
   - Add images, location (Haragama, Katugastota, Peradeniya)

## 🌐 Deploying to Cloudflare Pages

1. **Prepare for Deployment**
   - Edit `astro.config.mjs`
   - Uncomment the lines:
     ```javascript
     output: 'hybrid',
     adapter: cloudflare(),
     ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your_repo_url
   git push -u origin main
   ```

3. **Connect Cloudflare Pages**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set build output directory: `dist`
   - Add environment variables (Supabase keys)

4. **Deploy!**
   - Cloudflare will build and deploy automatically
   - Your site will be live on a `*.pages.dev` domain
   - Optionally, add your custom domain

## 🎨 Customization

### Update Agent Contact Numbers
Edit `src/components/Footer.astro` lines 8-12:
```typescript
const agents = [
  { name: "Uthpala", phone: "+94 XX XXX XXXX" },
  { name: "Dinushika", phone: "+94 XX XXX XXXX" },
  { name: "Channa", phone: "+94 XX XXX XXXX" },
];
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'brand-black': '#000000',
  'brand-cyan': '#00AEEF',
}
```

### Update Company Info
- Contact details: `src/components/Footer.astro`
- About page content: `src/pages/about.astro`

## 📱 Testing

- ✅ Desktop navigation works
- ✅ Mobile hamburger menu functional
- ✅ WhatsApp button clickable
- ✅ All pages accessible
- ⏳ Add properties to Supabase to test filtering

## 🔍 SEO Checklist

- ✅ Title tags on all pages
- ✅ Meta descriptions
- ✅ Semantic HTML
- ✅ Proper heading hierarchy
- ✅ Alt tags for images (when added)

## 📞 Support

For any questions about this platform:
- **Company**: Millennium Property Development (Pvt) Ltd
- **Location**: 190/2/A, Kotugodalla Street, Kandy
- **Phone**: +94 778 778 109

---

**🎉 Your professional real estate platform is ready to go live!**
