# 🗄️ Database Setup Guide - Millennium Property Development

## Quick Start: Seed Your Database in 3 Steps

### Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new organization and project
   - Choose a database password (save it securely)

2. **Create the Properties Table**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click "New query"
   - Copy and paste the entire content from `supabase-setup.sql`
   - Click "Run" to execute
   - You should see: "Success. No rows returned"

3. **Get Your API Credentials**
   - Go to **Project Settings** (gear icon) > **API**
   - Copy your **Project URL**
   - Copy your **anon/public** key (not the service_role key!)

### Step 2: Configure Environment Variables

1. **Open your `.env` file** in the project root
2. **Add your Supabase credentials:**

```env
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

**Important:** Replace the placeholder values with your actual credentials!

### Step 3: Run the Seed Script

Open your terminal and run:

```bash
npm run seed
```

**That's it!** The script will:
- ✅ Connect to your Supabase database
- ✅ Insert 10 realistic property listings
- ✅ Distribute them across Haragama, Katugastota, and Peradeniya
- ✅ Assign properties to agents (Uthpala, Dinushika, Channa)
- ✅ Show you a summary of what was added

## What Data Gets Added?

The script adds 10 properties with:

### By Location:
- **Haragama** - 4 properties
- **Katugastota** - 3 properties  
- **Peradeniya** - 3 properties

### By Agent:
- **Uthpala** - Properties in Haragama
- **Dinushika** - Properties in Katugastota
- **Channa** - Properties in Peradeniya

### Property Details Include:
- ✅ Title and description
- ✅ Price per perch (Rs. 425,000 - Rs. 750,000)
- ✅ Total perches (10-30 perches)
- ✅ Utility availability (Water, Electricity, Telephone)
- ✅ Distance to Kandy (3-6 km)
- ✅ Nearby landmarks (Dharmaraja College, University, etc.)
- ✅ Agent contact information
- ✅ Sample images (placeholder URLs - replace with your own)

## Expected Output

When you run `npm run seed`, you should see:

```
🌱 Starting database seed...

📊 Preparing to insert 10 properties

✅ Connected to Supabase successfully
📋 Current properties in database: 0

[1/10] Adding: Premium Residential Land in Haragama...
   ✅ Success (ID: abc123...)
[2/10] Adding: Scenic Plot with Mountain Views - Haragama...
   ✅ Success (ID: def456...)
...

==================================================
🎉 Database seeding completed!

✅ Successfully added: 10 properties

📊 Summary by Location:
   • Haragama: 4 properties
   • Katugastota: 3 properties
   • Peradeniya: 3 properties

📊 Summary by Agent:
   • Uthpala: 4 properties
   • Dinushika: 3 properties
   • Channa: 3 properties

🌐 Visit http://localhost:4321/properties to see your listings!
```

## Verify the Data

1. **Check Supabase Dashboard:**
   - Go to **Table Editor** > **properties**
   - You should see 10 rows of data

2. **View on Your Website:**
   - Make sure dev server is running: `npm run dev`
   - Visit: [http://localhost:4321/properties](http://localhost:4321/properties)
   - You should see all properties with filtering options

## Troubleshooting

### ❌ Error: Missing Supabase credentials
**Solution:** Make sure your `.env` file has the correct `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`

### ❌ Error accessing properties table
**Solution:** 
1. Make sure you ran the `supabase-setup.sql` script first
2. Check that the table was created in Supabase Dashboard > Table Editor
3. Verify RLS policies are set up correctly

### ❌ Database already contains properties
**Note:** The script will ADD new properties without deleting existing ones. If you want to start fresh:
1. Go to Supabase Dashboard > Table Editor > properties
2. Select all rows and delete them
3. Run `npm run seed` again

## Customizing the Data

### Add Your Own Properties

Edit `scripts/seed-database.js` and modify the `sampleProperties` array:

```javascript
const sampleProperties = [
  {
    title: 'Your Property Title',
    location: 'Haragama', // or 'Katugastota' or 'Peradeniya'
    perch_price: 500000,
    total_perches: 20,
    has_water: true,
    has_electricity: true,
    has_telephone: true,
    distance_to_kandy: '5 km from Kandy',
    landmark: 'Near Famous Landmark',
    agent_name: 'Uthpala', // or 'Dinushika' or 'Channa'
    agent_phone: '+94 777 123 456',
    description: 'Your property description here...',
    images: [
      'https://your-image-url.jpg'
    ]
  },
  // Add more properties...
];
```

### Update Agent Phone Numbers

1. Open `scripts/seed-database.js`
2. Find each property and update the `agent_phone` field
3. Also update in `src/components/Footer.astro` for consistency

### Use Your Own Images

Replace the placeholder image URLs with:
1. **Cloudinary URLs** (recommended) - Upload to Cloudinary and use the optimized URLs
2. **Direct URLs** - Any publicly accessible image URL
3. **Local uploads** - Upload to Supabase Storage and use those URLs

## Next Steps After Seeding

1. ✅ **Verify properties appear** on `/properties` page
2. ✅ **Test filtering** by location and utilities
3. ✅ **Test WhatsApp integration** on property cards
4. ✅ **Replace placeholder images** with real property photos
5. ✅ **Update agent phone numbers** throughout the site
6. ✅ **Deploy to Cloudflare Pages** with real data

## Running Again

You can run the seed script multiple times:
```bash
npm run seed
```

Each run will ADD 10 more properties. If you want fresh data, manually delete from Supabase Dashboard first.

---

**🎉 You're all set! Your property database is now populated and ready to showcase!**

Visit [http://localhost:4321/properties](http://localhost:4321/properties) to see your listings live!
