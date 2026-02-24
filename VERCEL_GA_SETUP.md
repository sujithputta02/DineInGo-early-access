# Setting Up Google Analytics in Vercel

## Step-by-Step Guide

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in to your account

2. **Select Your Project**
   - Click on your `dineingo-early-access` project
   - Or go directly to: https://vercel.com/sujithputta02s-projects/dineingo-early-access

3. **Open Settings**
   - Click on the **"Settings"** tab at the top

4. **Navigate to Environment Variables**
   - In the left sidebar, click **"Environment Variables"**

5. **Add the Google Analytics Variable**
   - Click **"Add New"** button
   - Fill in:
     - **Key:** `NEXT_PUBLIC_GA_ID`
     - **Value:** `G-28Q7PTVRHN`
     - **Environments:** Check all three boxes:
       - ✅ Production
       - ✅ Preview
       - ✅ Development

6. **Save**
   - Click **"Save"** button

7. **Redeploy**
   - Go to **"Deployments"** tab
   - Click the three dots (...) on the latest deployment
   - Click **"Redeploy"**
   - Or just push a new commit to trigger automatic deployment

### Option 2: Via Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
cd dineingo-early-access
vercel link

# Add the environment variable
vercel env add NEXT_PUBLIC_GA_ID

# When prompted:
# - Enter value: G-28Q7PTVRHN
# - Select environments: Production, Preview, Development (use spacebar to select all)

# Redeploy
vercel --prod
```

### Option 3: Via vercel.json (Not Recommended for Secrets)

You can also add it to `vercel.json`, but this is NOT recommended for sensitive data:

```json
{
  "env": {
    "NEXT_PUBLIC_GA_ID": "G-28Q7PTVRHN"
  }
}
```

**Note:** Since `NEXT_PUBLIC_GA_ID` is public (visible in browser), this is technically safe, but it's better practice to use the dashboard.

## Verification Steps

After adding the environment variable and redeploying:

1. **Check Build Logs**
   - Go to Vercel Dashboard → Deployments
   - Click on the latest deployment
   - Check the build logs for any errors
   - You should see: `- Environments: .env.local, .env.production`

2. **Test the Live Site**
   - Visit your deployed URL
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for requests to `google-analytics.com` or `googletagmanager.com`
   - You should see GA tracking requests

3. **Check Google Analytics**
   - Go to https://analytics.google.com/
   - Click **"Realtime"** → **"Overview"**
   - Visit your live site in another tab
   - You should see yourself as a live visitor within 30 seconds

## Common Issues & Solutions

### Issue 1: "Environment variable not found"
**Solution:** Make sure you selected all three environments (Production, Preview, Development) when adding the variable.

### Issue 2: "GA not tracking"
**Solution:** 
- Clear browser cache
- Check if ad blockers are blocking GA
- Verify the Measurement ID is correct: `G-28Q7PTVRHN`
- Wait 24-48 hours for data to appear in reports (Realtime should work immediately)

### Issue 3: "Build fails after adding env var"
**Solution:** 
- The env var name must be exactly: `NEXT_PUBLIC_GA_ID`
- No spaces, no typos
- Redeploy after adding

### Issue 4: "GA works locally but not on Vercel"
**Solution:**
- Verify the env var is added in Vercel dashboard
- Make sure you redeployed after adding the variable
- Check that the variable is available in all environments

## What Happens After Setup

Once configured correctly:

✅ Google Analytics will automatically track all visitors
✅ Data appears in GA dashboard within seconds (Realtime)
✅ Historical data is preserved
✅ No code changes needed
✅ Works on all deployments (production, preview, development)

## Security Notes

- `NEXT_PUBLIC_GA_ID` is safe to expose (it's public by design)
- The Measurement ID is visible in browser source code
- This is normal and expected for client-side analytics
- Keep your other env vars (MongoDB, Email) private!

## Need Help?

If you encounter any issues:
1. Check Vercel build logs for errors
2. Verify the env var is spelled correctly
3. Make sure you redeployed after adding the variable
4. Test in an incognito window (to avoid ad blockers)

---

**Your Measurement ID:** `G-28Q7PTVRHN`
**Variable Name:** `NEXT_PUBLIC_GA_ID`
**Status:** Ready to deploy ✅
