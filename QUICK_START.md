# Quick Start Testing Guide

## What Changed?

Your app now has **real user registration and login** instead of demo credentials!

## How to Test (Local Testing)

The app is currently running at **http://localhost:5174**

### Test 1: Try Sign Up
1. Go to the app
2. Click "Patient" or "Doctor"
3. Click "Sign Up" tab
4. Fill in:
   - Full Name: "John Doe"
   - Email: "test@example.com"
   - Password: "test123456"
   - Confirm Password: "test123456"
5. Click "Create Account"

**What happens:**
- You'll see an error about Supabase not being configured
- This is expected! You need to set up Supabase credentials first

### Test 2: After Setting Up Supabase
1. Follow instructions in [SETUP.md](./SETUP.md)
2. Add Supabase credentials to `.env.local`
3. Restart dev server: `npm run dev`
4. Repeat Test 1
5. You'll be logged in with access to the dashboard!

## Key Features Now Available

✅ **New User Registration**
- Patients and Doctors can sign up
- Password validation (minimum 6 characters)
- Automatic profile creation

✅ **User Login**
- Real email/password authentication
- Session persistence
- Logout option in settings

✅ **Role-Based System**
- Doctor dashboard for doctors
- Patient dashboard for patients

✅ **No Demo Credentials**
- Demo logins no longer work
- Each user must create an account

## What You Need to Do

1. **Get Supabase** (5 minutes)
   - Go to https://supabase.com
   - Create account
   - Create a new project

2. **Add Credentials** (2 minutes)
   - Copy Project URL & API Key
   - Paste into `.env.local`

3. **Create Database Tables** (3 minutes)
   - Copy SQL from SETUP.md
   - Run in Supabase SQL editor

4. **Restart App** (1 minute)
   - Stop dev server: Ctrl+C
   - Start again: npm run dev

5. **Test Sign Up & Login** (2 minutes)
   - Create new account
   - Log in and enjoy!

**Total time: ~15 minutes to full setup**

## Files to Read

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions with SQL commands
- **[CHANGES.md](./CHANGES.md)** - What was changed in the code
- **.env.local** - Where to put your Supabase credentials

## Questions?

All documentation is in the SETUP.md file. Good luck! 🚀
