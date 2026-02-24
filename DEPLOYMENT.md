# Deployment Guide - DineInGo Early Access

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas account (free tier works)
- Gmail account with App Password

## Step 1: Push to GitHub

Since this folder is inside a larger repo, you need to push only this folder to the separate repo.

### Option A: Using Git Subtree (Recommended)

From the root of your main project:

```bash
# Add the remote for early access repo
git remote add early-access https://github.com/sujithputta02/DineInGo-early-access.git

# Push only the dineingo-early-access folder to main branch
git subtree push --prefix=dineingo-early-access early-access main
```

### Option B: Manual Copy Method

```bash
# Navigate to the early access folder
cd dineingo-early-access

# Initialize git (if not already)
git init

# Add remote
git remote add origin https://github.com/sujithputta02/DineInGo-early-access.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: DineInGo Early Access"

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo: `sujithputta02/DineInGo-early-access`
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Deploy from the dineingo-early-access folder
cd dineingo-early-access
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: dineingo-early-access
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

## Step 3: Configure Environment Variables in Vercel

After deployment, add environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable:

```
MONGODB_URI
Value: mongodb+srv://dineingoapp:FzyC357xJaxj6oXM@cluster0dine.sofa1gx.mongodb.net/dineingoapp?retryWrites=true&w=majority&appName=Cluster0dine

NEXT_PUBLIC_BASE_URL
Value: https://your-project-name.vercel.app (use your actual Vercel URL)

EMAIL_HOST
Value: smtp.gmail.com

EMAIL_PORT
Value: 587

EMAIL_USER
Value: sec.dinelngo.team@gmail.com

EMAIL_PASS
Value: finkqeuvzkpbgqfy

EMAIL_FROM
Value: "DineInGo 🦖 <sec.dinelngo.team@gmail.com>"
```

3. Click "Save" for each variable
4. Redeploy the project (Vercel → Deployments → Redeploy)

## Step 4: Update Base URL

After deployment, update the `NEXT_PUBLIC_BASE_URL`:

1. Copy your Vercel deployment URL (e.g., `https://dineingo-early-access.vercel.app`)
2. Go to Vercel → Settings → Environment Variables
3. Edit `NEXT_PUBLIC_BASE_URL` to your Vercel URL
4. Redeploy

## Step 5: Test the Deployment

1. Visit your Vercel URL
2. Test user signup with a real email
3. Check if you receive the welcome email
4. Test business signup
5. Verify referral codes work

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds and show logs

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Go to Vercel → Settings → Domains
3. Add your domain
4. Update DNS records as instructed by Vercel
5. Update `NEXT_PUBLIC_BASE_URL` to your custom domain
6. Redeploy

## Monitoring

### Check Logs
```bash
vercel logs
```

### View Analytics
- Go to Vercel Dashboard → Analytics
- Monitor page views, performance, errors

### Database Monitoring
- MongoDB Atlas → Metrics
- Check connection count, operations, storage

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Ensure TypeScript has no errors: `npm run build` locally

### Email Not Sending
- Verify Gmail App Password is correct
- Check Vercel logs for email errors
- Test SMTP connection locally first

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0)
- Ensure database name matches

### Environment Variables Not Working
- Ensure variables are set in Vercel Dashboard
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)

## Updating the Deployment

### From Main Repo (Git Subtree)
```bash
# Make changes in dineingo-early-access folder
# Commit in main repo
git add dineingo-early-access
git commit -m "Update early access"

# Push to early access repo
git subtree push --prefix=dineingo-early-access early-access main
```

### Direct Push
```bash
cd dineingo-early-access
git add .
git commit -m "Update message"
git push origin main
```

Vercel will automatically deploy the changes.

## Performance Tips

1. **Enable Vercel Analytics** (free tier available)
2. **Monitor Function Execution Time** (should be < 10s)
3. **Check MongoDB Connection Pooling** (already optimized)
4. **Use Vercel Edge Network** (automatic)
5. **Enable Compression** (already enabled in config)

## Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ No credentials in code
- ✅ Environment variables in Vercel only
- ✅ MongoDB IP whitelist configured
- ✅ Gmail App Password (not regular password)
- ✅ HTTPS enabled (automatic on Vercel)

## Cost Estimate

- **Vercel**: Free (Hobby plan)
- **MongoDB Atlas**: Free (M0 tier, 512MB)
- **Gmail SMTP**: Free (500 emails/day limit)
- **Total**: $0/month

## Support

Issues? Contact: sec.dinelngo.team@gmail.com
