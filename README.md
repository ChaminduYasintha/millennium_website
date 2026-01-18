# Millennium Property Development (Pvt) Ltd - Digital Platform

A premium, SEO-optimized digital platform for Millennium Property Development built with **Astro 5.0**, **Tailwind CSS 4.0**, and **Supabase**.

## 🏢 Company Information

- **Company Name:** Millennium Property Development (Pvt) Ltd.
- **Headquarters:** 190/2/A, Kotugodalla Street, Kandy, Sri Lanka
- **Experience:** 17+ Years of Trust in Kandy's Real Estate
- **Contact:** +94 778 778 109

## 🎨 Brand Identity

- **Background:** Pure Black (#000000)
- **Primary Accent:** Cyan Blue (#00AEEF)
- **Typography:** Inter, Space Grotesk
- **Sinhala Support:** Noto Sans Sinhala

## 🚀 Tech Stack

- **Framework:** Astro 5.0 (Hybrid Output)
- **Database:** Supabase
- **Styling:** Tailwind CSS 4.0
- **Deployment:** Cloudflare Pages
- **Images:** Cloudinary (for optimization)

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd c:\Users\Chamindu\Desktop\web_design\milenium_property_developers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```env
     PUBLIC_SUPABASE_URL=your_supabase_url
     PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📄 Pages

- **Home (`/`)** - Hero, Featured 16M House, Services Grid
- **Properties (`/properties`)** - Filterable property listings from Supabase
- **Construction (`/construction`)** - Construction services, QS, 2D/3D drafting
- **About (`/about`)** - Company story and values
- **Contact (`/contact`)** - Contact form with WhatsApp integration

## 🗄️ Supabase Database Schema

### Properties Table

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

## 🎯 Key Features

### ✨ Premium Design
- High-contrast dark mode with cyan blue accents
- Smooth animations and micro-interactions
- Mobile-first responsive design
- Glassmorphism effects

### 📍 Property Management
- Real-time filtering by location (Haragama, Katugastota, Peradeniya)
- Utility filters (Water, Electricity, Telephone)
- Agent attribution with direct WhatsApp contact
- Distance to Kandy landmarks

### 🏗️ Services
1. **Land Sales** - Premium plots with clear deeds
2. **Construction** - Complete house building
3. **Quantity Surveying** - Cost estimation & project management
4. **2D/3D Drafting** - Professional architectural drawings
5. **Bank Loan Coordination** - Financing assistance
6. **Property Consultation** - Expert advice

### 📱 WhatsApp Integration
- Floating sticky button (Sanjeewa: +94 778 778 109)
- Property-specific inquiry links
- Contact form integration

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## 🌐 Deployment (Cloudflare Pages)

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables in Cloudflare dashboard
5. Deploy!

## 📝 Content Management

To add/edit properties:
1. Access your Supabase dashboard
2. Navigate to the `properties` table
3. Add/edit records with all required fields
4. Upload images to Cloudinary and add URLs to the `images` array

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'brand-black': '#000000',
  'brand-cyan': '#00AEEF',
}
```

### Fonts
Fonts are loaded from Google Fonts in `BaseLayout.astro`

## 📞 Contact Information

- **Phone:** +94 778 778 109
- **Email:** info@millenniumproperty.lk
- **WhatsApp:** https://wa.me/94778778109

## 🏆 Key Differentiators

- **17+ Years of Trust** in Kandy (vs. Colombo-based PLCs)
- Local market expertise
- Personalized service
- End-to-end solutions
- High-quality materials and professional team

## 📄 License

Proprietary - © 2026 Millennium Property Development (Pvt) Ltd. All rights reserved.

---

**Built with ❤️ for Kandy's real estate excellence**
