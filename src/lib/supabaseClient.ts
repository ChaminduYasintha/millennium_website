import { createClient } from '@supabase/supabase-js';

// Supabase configuration for Millennium Property Development
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database schema
export interface Property {
    id: string;
    title: string;
    location: string;
    perch_price: number;
    total_perches: number;
    has_water: boolean;
    has_electricity: boolean;
    has_telephone: boolean;
    distance_to_kandy?: string;
    landmark?: string;
    agent_name: string;
    agent_phone: string;
    images: string[];
    video_url?: string;
    tour_360_url?: string;
    description: string;
    created_at: string;
}
