# Medical Portal - Setup Guide

## Authentication System Update

Your medical portal has been updated to support **real user registration and login** instead of demo credentials. The system now uses **Supabase** for authentication.

## Features Implemented

✅ **User Registration** - Patients and Doctors can create new accounts  
✅ **User Login** - Real email/password authentication  
✅ **Role-based System** - Separate registration for Doctors and Patients  
✅ **Real Database Storage** - User profiles stored in Supabase  
✅ **Session Management** - Persistent login with Supabase sessions  

## Setup Instructions

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Sign Up"
3. Create an account (you can use GitHub)
4. Create a new project

### Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Project Settings → API**
2. Copy:
   - **Project URL** (under "Project URL")
   - **Anon Public Key** (under "Project API keys")

### Step 3: Configure Environment Variables

Edit the `.env.local` file in your project root:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```
VITE_SUPABASE_URL=https://abcdefg123456.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create Database Tables

Run these SQL commands in your Supabase SQL editor:

#### Create Doctors Table
```sql
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  specialization TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  clinic_name TEXT DEFAULT '',
  clinic_address TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Create Patients Table
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  zip_code TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  blood_type TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 5: Restart the Dev Server

After adding the environment variables:

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

## How to Use

### For New Users

1. Go to the application
2. Choose your role: **Patient** or **Doctor**
3. Click **"Sign Up"** to create a new account
4. Fill in:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
5. Click **"Create Account"**
6. You'll be logged in automatically!

### For Existing Users

1. Choose your role: **Patient** or **Doctor**
2. Click **"Sign In"** (or use the toggle)
3. Enter your email and password
4. Click **"Sign In"**

### To Log Out

Look for the **Logout** option in the Settings or Header menu of your dashboard.

## Troubleshooting

### "Invalid credentials" error
- Make sure you're using the correct email and password
- Check that the email is registered

### "Can't reach Supabase"
- Verify your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Make sure you copied them exactly from Supabase dashboard
- Restart the dev server after adding environment variables

### User can login but no profile is created
- This shouldn't happen with the updated code, but check:
  - Tables exist in Supabase
  - Tables have the correct structure
  - Row-level security (RLS) policies allow inserts

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to version control
- The `.env.local` file is in `.gitignore` by default
- Your `VITE_SUPABASE_ANON_KEY` is meant to be public (it's the "anonymous" key)
- Use Row-Level Security (RLS) policies in Supabase for production

## File Changes Made

The following files were updated to enable real authentication:

1. **src/contexts/AuthContext.tsx** - Updated to use Supabase authentication
2. **src/components/Login.tsx** - Added signup tab and form
3. **src/lib/supabase.ts** - Connected to real Supabase
4. **src/types/index.ts** - Added `user_id` field to Doctor and Patient types

## Next Steps

1. ✅ Set up Supabase account and project
2. ✅ Copy credentials to `.env.local`
3. ✅ Create database tables using SQL commands
4. ✅ Restart dev server
5. ✅ Test registration and login!

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Check the browser console for detailed error messages
