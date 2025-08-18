# Supabase Setup Guide for Digital Potting Shed

## 🚀 Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name: `digital-potting-shed`
5. Enter database password (save this!)
6. Choose region closest to you
7. Click "Create new project"

### 2. Get Your API Keys
1. Go to your project dashboard
2. Navigate to **Settings → API**
3. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ` - keep this secret!)

### 3. Set Up Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-setup.sql`
3. Paste and run the SQL script
4. This creates all necessary tables and security policies

### 4. Configure Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 5. Test the Setup
1. Deploy your app to Vercel
2. Try the "Scan Seed Packet" feature
3. Upload an image of a seed packet
4. Verify OCR processing works

## 📊 Database Schema

The setup creates these tables:

### `profiles`
- User profile information
- Auto-created when users sign up

### `plants`
- Plant inventory with all details
- Links to user profiles
- Includes OCR-extracted data

### `journal_entries`
- Plant care notes and observations
- Links to specific plants

### Storage Bucket: `seed-packets`
- Stores uploaded seed packet images
- Public read access for OCR processing

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Secure file upload policies
- Automatic user profile creation

## 🛠️ Troubleshooting

### OCR Not Working?
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Check browser console for errors
4. Ensure Tesseract.js is properly installed

### Database Connection Issues?
1. Verify API keys are correct
2. Check if Supabase project is paused (free tier)
3. Ensure RLS policies are created

### File Upload Fails?
1. Check storage bucket exists (`seed-packets`)
2. Verify storage policies are set up
3. Check file size limits (default 50MB)

## 📱 Features Enabled

✅ **Real OCR Processing** - Extract plant info from seed packets  
✅ **Secure File Storage** - Store images in Supabase  
✅ **User Authentication** - Secure user accounts  
✅ **Plant Management** - Full CRUD operations  
✅ **Journal Entries** - Track plant care  
✅ **Data Privacy** - Users only see their own data  

## 🎯 Next Steps

After setup, your app will have:
- Working OCR for seed packet scanning
- Secure user authentication
- Plant inventory management
- Garden journal functionality
- Image storage and processing

Your Digital Potting Shed will be fully functional! 🌱
