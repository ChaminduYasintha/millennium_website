import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials in .env file');
    console.log('Please add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample property data for Millennium Property Development
const sampleProperties = [
    {
        title: 'Premium Residential Land in Haragama',
        location: 'Haragama',
        perch_price: 500000,
        total_perches: 20,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '5 km from Kandy City Center',
        landmark: 'Near Dharmaraja College',
        agent_name: 'Uthpala',
        agent_phone: '+94 777 123 456',
        description: 'Beautiful land plot in the heart of Haragama with all utilities available. Perfect for residential construction with easy access to Kandy city. Clear title deed and peaceful neighborhood. Ideal for building your dream home.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800'
        ]
    },
    {
        title: 'Scenic Plot with Mountain Views - Haragama',
        location: 'Haragama',
        perch_price: 550000,
        total_perches: 15,
        has_water: true,
        has_electricity: true,
        has_telephone: false,
        distance_to_kandy: '6 km from Kandy',
        landmark: 'Near Peradeniya Road',
        agent_name: 'Uthpala',
        agent_phone: '+94 777 123 456',
        description: 'Stunning land with panoramic mountain views. Water and electricity connected. Quiet location perfect for a peaceful family home. Easy access to main road and public transport.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        ]
    },
    {
        title: 'Commercial Land Near Katugastota Town',
        location: 'Katugastota',
        perch_price: 600000,
        total_perches: 25,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '4 km from Kandy City',
        landmark: 'Near Katugastota Town Center',
        agent_name: 'Dinushika',
        agent_phone: '+94 777 234 567',
        description: 'Prime commercial land in the bustling Katugastota area. All utilities connected. Excellent for commercial development or mixed-use property. High foot traffic area with great business potential.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800'
        ]
    },
    {
        title: 'Peaceful Residential Plot - Katugastota',
        location: 'Katugastota',
        perch_price: 450000,
        total_perches: 18,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '5 km from Kandy',
        landmark: 'Near Polgolla Reservoir',
        agent_name: 'Dinushika',
        agent_phone: '+94 777 234 567',
        description: 'Tranquil location with easy access to Polgolla Reservoir. All utilities available. Perfect for a serene family environment while being close to city amenities.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        ]
    },
    {
        title: 'University Area Premium Land - Peradeniya',
        location: 'Peradeniya',
        perch_price: 650000,
        total_perches: 22,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '3 km from Kandy City',
        landmark: 'Near University of Peradeniya',
        agent_name: 'Channa',
        agent_phone: '+94 777 345 678',
        description: 'Exceptional property close to the University of Peradeniya. All utilities connected. High potential for appreciation. Ideal for residential or rental investment targeting university community.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800'
        ]
    },
    {
        title: 'Botanical Garden Vicinity Land - Peradeniya',
        location: 'Peradeniya',
        perch_price: 700000,
        total_perches: 30,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '4 km from Kandy',
        landmark: 'Near Royal Botanical Gardens',
        agent_name: 'Channa',
        agent_phone: '+94 777 345 678',
        description: 'Premium land plot near the famous Royal Botanical Gardens. Larger plot perfect for a spacious home or subdivision. All modern utilities available. Excellent investment opportunity in a rapidly developing area.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        ]
    },
    {
        title: 'Corner Plot with Road Access - Haragama',
        location: 'Haragama',
        perch_price: 475000,
        total_perches: 12,
        has_water: true,
        has_electricity: true,
        has_telephone: false,
        distance_to_kandy: '5.5 km from Kandy',
        landmark: 'Near Haragama Junction',
        agent_name: 'Uthpala',
        agent_phone: '+94 777 123 456',
        description: 'Excellent corner plot with dual road access. Water and electricity ready. Compact size ideal for a modern home. Great connectivity to Kandy city and surrounding areas.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        ]
    },
    {
        title: 'Elevated Land with Valley View - Katugastota',
        location: 'Katugastota',
        perch_price: 520000,
        total_perches: 16,
        has_water: false,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '6 km from Kandy',
        landmark: 'Near Katugastota Hill',
        agent_name: 'Dinushika',
        agent_phone: '+94 777 234 567',
        description: 'Elevated land offering stunning valley views. Electricity and telephone connections available. Water line nearby (can be easily connected). Perfect for those seeking a hillside retreat close to the city.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800'
        ]
    },
    {
        title: 'River Frontage Land - Peradeniya',
        location: 'Peradeniya',
        perch_price: 750000,
        total_perches: 28,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '3.5 km from Kandy',
        landmark: 'Along Mahaweli River',
        agent_name: 'Channa',
        agent_phone: '+94 777 345 678',
        description: 'Rare opportunity! Beautiful land with Mahaweli River frontage. All utilities connected. Perfect for a luxury residence with natural water features. Serene environment with excellent development potential.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800'
        ]
    },
    {
        title: 'Affordable Starter Plot - Haragama',
        location: 'Haragama',
        perch_price: 425000,
        total_perches: 10,
        has_water: true,
        has_electricity: true,
        has_telephone: true,
        distance_to_kandy: '6 km from Kandy',
        landmark: 'Near Haragama Market',
        agent_name: 'Uthpala',
        agent_phone: '+94 777 123 456',
        description: 'Perfect starter plot for first-time home builders. All utilities connected. Compact size means affordable construction costs. Close to local amenities and good transport links to Kandy.',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
        ]
    }
];

async function seedDatabase() {
    console.log('🌱 Starting database seed...\n');
    console.log('📊 Preparing to insert', sampleProperties.length, 'properties\n');

    try {
        // Check if table exists and is accessible
        const { count, error: countError } = await supabase
            .from('properties')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('❌ Error accessing properties table:', countError.message);
            console.log('\n💡 Make sure you have:');
            console.log('   1. Created the properties table in Supabase');
            console.log('   2. Set up RLS policies (run supabase-setup.sql)');
            console.log('   3. Used the correct Supabase credentials\n');
            process.exit(1);
        }

        console.log('✅ Connected to Supabase successfully');
        console.log(`📋 Current properties in database: ${count}\n`);

        // Ask if we should clear existing data
        if (count > 0) {
            console.log('⚠️  Database already contains properties.');
            console.log('   This script will ADD new properties without deleting existing ones.\n');
        }

        // Insert properties one by one with progress
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < sampleProperties.length; i++) {
            const property = sampleProperties[i];

            console.log(`[${i + 1}/${sampleProperties.length}] Adding: ${property.title}...`);

            const { data, error } = await supabase
                .from('properties')
                .insert([property])
                .select();

            if (error) {
                console.error(`   ❌ Error: ${error.message}`);
                errorCount++;
            } else {
                console.log(`   ✅ Success (ID: ${data[0].id})`);
                successCount++;
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('🎉 Database seeding completed!\n');
        console.log(`✅ Successfully added: ${successCount} properties`);
        if (errorCount > 0) {
            console.log(`❌ Failed: ${errorCount} properties`);
        }
        console.log('\n📊 Summary by Location:');

        const locations = sampleProperties.reduce((acc, prop) => {
            acc[prop.location] = (acc[prop.location] || 0) + 1;
            return acc;
        }, {});

        Object.entries(locations).forEach(([location, count]) => {
            console.log(`   • ${location}: ${count} properties`);
        });

        console.log('\n📊 Summary by Agent:');
        const agents = sampleProperties.reduce((acc, prop) => {
            acc[prop.agent_name] = (acc[prop.agent_name] || 0) + 1;
            return acc;
        }, {});

        Object.entries(agents).forEach(([agent, count]) => {
            console.log(`   • ${agent}: ${count} properties`);
        });

        console.log('\n🌐 Visit http://localhost:4321/properties to see your listings!\n');

    } catch (error) {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
