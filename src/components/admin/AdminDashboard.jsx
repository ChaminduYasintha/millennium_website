import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
    const [session, setSession] = useState(null);
    const [view, setView] = useState('list'); // list, edit, create
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [customPreset, setCustomPreset] = useState(import.meta.env.PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const uploadedUrls = [];
        const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = customPreset || 'ml_default';

        if (!cloudName) {
            alert('Cloudinary Cloud Name is missing in .env (PUBLIC_CLOUDINARY_CLOUD_NAME)');
            setUploading(false);
            return;
        }

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', uploadPreset);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const errorDetail = await res.json();
                    throw new Error(errorDetail.error?.message || 'Upload failed');
                }

                const data = await res.json();
                uploadedUrls.push(data.secure_url);
            }

            // Append new images to existing ones
            const currentImages = Array.isArray(formData.images) ? formData.images : (formData.images ? formData.images.split(',').map(s => s.trim()) : []);
            setFormData({ ...formData, images: [...currentImages, ...uploadedUrls] });

        } catch (err) {
            console.error('Upload Error:', err);
            alert(`Upload Failed: ${err.message}. \n\nPlease check your Upload Preset.`);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProperties();
            else setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchProperties();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching properties:', error);
        else setProperties(data || []);
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setError(error.message);
        else setError(null);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;

        const { error } = await supabase.from('properties').delete().eq('id', id);
        if (error) {
            alert('Error deleting property');
            console.error(error);
        } else {
            fetchProperties();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Process form data
        const data = { ...formData };

        // Process checkboxes
        data.has_water = Boolean(data.has_water);
        data.has_electricity = Boolean(data.has_electricity);
        data.has_telephone = Boolean(data.has_telephone);

        // Process arrays (images)
        if (typeof data.images === 'string') {
            data.images = data.images.split(',').map(url => url.trim()).filter(url => url);
        }

        let result;
        if (view === 'edit') {
            result = await supabase.from('properties').update(data).eq('id', data.id);
        } else {
            // Remove id for create if it's empty/undefined
            if (!data.id) delete data.id;
            result = await supabase.from('properties').insert([data]);
        }

        if (result.error) {
            setError(result.error.message);
            setLoading(false);
        } else {
            setView('list');
            fetchProperties();
            setFormData({});
            setError(null);
        }
    };

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-navy-light p-8 rounded-2xl border border-gold/30 shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
                    {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-cream/70 text-sm mb-1">Email</label>
                            <input name="email" type="email" required className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white focus:border-gold outline-none" />
                        </div>
                        <div>
                            <label className="block text-cream/70 text-sm mb-1">Password</label>
                            <input name="password" type="password" required className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white focus:border-gold outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-2 rounded transition-colors">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Edit/Create Form
    if (view === 'create' || view === 'edit') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{view === 'create' ? 'Add New Property' : 'Edit Property'}</h2>
                    <button onClick={() => setView('list')} className="text-cream/70 hover:text-white">Cancel</button>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSave} className="bg-navy-light p-8 rounded-2xl border border-gold/20 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-gold font-bold border-b border-white/10 pb-2">Basic Info</h3>
                            <div>
                                <label className="block text-cream/70 text-sm mb-1">Property Title</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-cream/70 text-sm mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location || ''}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Price per Perch (Rs.)</label>
                                    <input
                                        type="number"
                                        value={formData.perch_price || ''}
                                        onChange={e => setFormData({ ...formData, perch_price: parseFloat(e.target.value) })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Total Perches</label>
                                    <input
                                        type="number"
                                        value={formData.total_perches || ''}
                                        onChange={e => setFormData({ ...formData, total_perches: parseFloat(e.target.value) })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-cream/70 text-sm mb-1">Description</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white h-32"
                                ></textarea>
                            </div>
                        </div>

                        {/* Details & Media */}
                        <div className="space-y-4">
                            <h3 className="text-gold font-bold border-b border-white/10 pb-2">Details & Media</h3>

                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <label className="block text-cream/70 text-sm">Property Images</label>
                                    <div className="text-right">
                                        <label className="text-[10px] text-cream/40 mr-2">Upload Preset:</label>
                                        <input
                                            type="text"
                                            value={customPreset}
                                            onChange={e => setCustomPreset(e.target.value)}
                                            placeholder="ml_default"
                                            className="bg-navy-dark border border-gray-700 rounded px-1 text-xs text-white w-32 focus:border-gold outline-none"
                                            title="Cloudinary Unsigned Upload Preset Name"
                                        />
                                    </div>
                                </div>

                                {/* Image Preview Grid */}
                                {formData.images && formData.images.length > 0 && (
                                    <div className="grid grid-cols-4 gap-2 mb-3">
                                        {(Array.isArray(formData.images) ? formData.images : formData.images.split(',')).map((url, index) => {
                                            const cleanUrl = url.trim();
                                            if (!cleanUrl) return null;
                                            return (
                                                <div key={index} className="relative group aspect-square bg-navy-dark rounded overflow-hidden border border-gray-700">
                                                    <img
                                                        src={cleanUrl}
                                                        alt={`Preview ${index}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/150?text=Error';
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const current = Array.isArray(formData.images) ? formData.images : formData.images.split(',').map(s => s.trim());
                                                            const newImages = current.filter((_, i) => i !== index);
                                                            setFormData({ ...formData, images: newImages });
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove Image"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* Upload Button */}
                                <div className="flex items-center gap-3">
                                    <label className={`
                                        flex items-center justify-center px-4 py-2 border border-dashed border-gold/50 rounded cursor-pointer hover:bg-gold/10 transition-colors
                                        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                        <span className="text-gold text-sm flex items-center">
                                            {uploading ? (
                                                <>Processing...</>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                    Upload Images
                                                </>
                                            )}
                                        </span>
                                    </label>
                                    <span className="text-xs text-cream/40">Select multiple files</span>
                                </div>

                                {/* Manual URL Input Fallback */}
                                <div className="mt-2">
                                    <details className="text-xs">
                                        <summary className="cursor-pointer text-cream/50 hover:text-gold mb-1">Add Image via URL</summary>
                                        <input
                                            type="text"
                                            placeholder="Paste direct image URL and press Enter..."
                                            className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white text-sm"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (e.target.value) {
                                                        const current = Array.isArray(formData.images) ? formData.images : (formData.images ? formData.images.split(',') : []);
                                                        const newImages = [...current, e.target.value];
                                                        setFormData({ ...formData, images: newImages });
                                                        e.target.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                    </details>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Distance to Kandy</label>
                                    <input
                                        type="text"
                                        value={formData.distance_to_kandy || ''}
                                        onChange={e => setFormData({ ...formData, distance_to_kandy: e.target.value })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Nearby Landmark</label>
                                    <input
                                        type="text"
                                        value={formData.landmark || ''}
                                        onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-cream/70 text-sm mb-2">Utilities Available</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center space-x-2 text-white bg-navy-dark px-3 py-2 rounded border border-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.has_water || false}
                                            onChange={e => setFormData({ ...formData, has_water: e.target.checked })}
                                        />
                                        <span>Water</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-white bg-navy-dark px-3 py-2 rounded border border-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.has_electricity || false}
                                            onChange={e => setFormData({ ...formData, has_electricity: e.target.checked })}
                                        />
                                        <span>Electricity</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-white bg-navy-dark px-3 py-2 rounded border border-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.has_telephone || false}
                                            onChange={e => setFormData({ ...formData, has_telephone: e.target.checked })}
                                        />
                                        <span>Telephone</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Agent Name</label>
                                    <input
                                        type="text"
                                        value={formData.agent_name || ''}
                                        onChange={e => setFormData({ ...formData, agent_name: e.target.value })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-cream/70 text-sm mb-1">Agent Phone</label>
                                    <input
                                        type="text"
                                        value={formData.agent_phone || ''}
                                        onChange={e => setFormData({ ...formData, agent_phone: e.target.value })}
                                        className="w-full bg-navy-dark border border-gray-700 rounded p-2 text-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            className="px-6 py-2 bg-transparent border border-gray-500 text-gray-300 rounded hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gold hover:bg-gold-light text-navy-dark font-bold rounded"
                        >
                            {loading ? 'Saving...' : 'Save Property'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // List View
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Property Listings</h2>
                <div className="flex items-center gap-4">
                    <span className="text-cream/50 text-sm">Logged in as {session.user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-red-500/50 text-red-400 rounded hover:bg-red-500/10 text-sm"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => { setFormData({}); setView('create'); }}
                        className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark font-bold rounded flex items-center"
                    >
                        <span className="mr-2">+</span> Add Property
                    </button>
                </div>
            </div>

            <div className="bg-navy-light rounded-xl border border-gold/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-navy-light text-cream/80">
                        <thead className="bg-navy-dark text-white uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-gray-700">Image</th>
                                <th className="p-4 border-b border-gray-700">Title</th>
                                <th className="p-4 border-b border-gray-700">Location</th>
                                <th className="p-4 border-b border-gray-700">Price (Rs.)</th>
                                <th className="p-4 border-b border-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {properties.map(property => (
                                <tr key={property.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="w-16 h-12 bg-navy-dark rounded overflow-hidden">
                                            {property.images && property.images[0] ? (
                                                <img
                                                    src={property.images[0]}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-white">{property.title}</td>
                                    <td className="p-4">{property.location}</td>
                                    <td className="p-4 font-mono text-gold">{(property.perch_price * property.total_perches).toLocaleString()}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => { setFormData(property); setView('edit'); }}
                                            className="text-blue-400 hover:text-blue-300 px-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            className="text-red-400 hover:text-red-300 px-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No properties found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
