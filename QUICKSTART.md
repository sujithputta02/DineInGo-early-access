# Quick Start - Deploy in 5 Minutes ⚡

## 1. Push to GitHub (30 seconds)

From your main project root:

```bash
cd "DineInGo-App V1.0"
./dineingo-early-access/deploy.sh
```

Or manually:
```bash
git subtree push --prefix=dineingo-early-access early-access main
```

## 2. Deploy to Vercel (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select: `sujithputta02/DineInGo-early-access`
4. Click "Deploy" (don't change any settings)

## 3. Add Environment Variables (2 minutes)

After deployment, go to: **Settings → Environment Variables**

Add these 7 variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://dineingoapp:FzyC357xJaxj6oXM@cluster0dine.sofa1gx.mongodb.net/dineingoapp?retryWrites=true&w=majority&appName=Cluster0dine` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` (copy from Vercel) |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `sec.dinelngo.team@gmail.com` |
| `EMAIL_PASS` | `finkqeuvzkpbgqfy` |
| `EMAIL_FROM` | `"DineInGo 🦖 <sec.dinelngo.team@gmail.com>"` |

## 4. Redeploy (30 seconds)

1. Go to **Deployments** tab
2. Click the three dots on latest deployment
3. Click "Redeploy"

## 5. Test (30 seconds)

1. Visit your Vercel URL
2. Sign up with your email
3. Check your inbox for welcome email
4. Share your referral code!

---

## That's it! 🎉

Your early access page is live and ready to collect signups.

### What's Next?

- Share the link on social media
- Add a custom domain (optional)
- Monitor signups in MongoDB Atlas
- Check analytics in Vercel Dashboard

### Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
