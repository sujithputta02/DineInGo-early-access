# Pre-Deployment Checklist ✅

## Before Pushing to GitHub

- [ ] `.env.local` is in `.gitignore` (already done ✅)
- [ ] No sensitive data in code (already done ✅)
- [ ] All dependencies installed (`npm install`)
- [ ] Build works locally (`npm run build`)
- [ ] Dev server works (`npm run dev`)
- [ ] Test signup flow locally
- [ ] Test email sending locally

## GitHub Setup

- [ ] Repository created: `sujithputta02/DineInGo-early-access`
- [ ] Repository is public or Vercel has access
- [ ] Remote added: `git remote add early-access https://github.com/sujithputta02/DineInGo-early-access.git`
- [ ] Code pushed: `git subtree push --prefix=dineingo-early-access early-access main`

## Vercel Setup

- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub
- [ ] Initial deployment successful

## Environment Variables in Vercel

- [ ] `MONGODB_URI` added
- [ ] `NEXT_PUBLIC_BASE_URL` added (with Vercel URL)
- [ ] `EMAIL_HOST` added
- [ ] `EMAIL_PORT` added
- [ ] `EMAIL_USER` added
- [ ] `EMAIL_PASS` added
- [ ] `EMAIL_FROM` added
- [ ] Redeployed after adding variables

## Post-Deployment Testing

- [ ] Visit Vercel URL - page loads
- [ ] User signup works
- [ ] Business signup works
- [ ] Welcome email received (user)
- [ ] Welcome email received (business)
- [ ] Referral code generated
- [ ] Referral link works
- [ ] Logos display correctly in emails
- [ ] Mobile responsive
- [ ] No console errors

## MongoDB Verification

- [ ] Database connection works
- [ ] Collections created automatically
- [ ] Signups appear in database
- [ ] Referral codes are unique
- [ ] IP whitelist allows Vercel (0.0.0.0/0)

## Email Verification

- [ ] Gmail App Password is correct
- [ ] Emails not going to spam
- [ ] Both templates render correctly
- [ ] Links in emails work
- [ ] Images in emails load

## Performance Check

- [ ] Page load time < 3s
- [ ] API response time < 2s
- [ ] Email sent within 5s
- [ ] No serverless timeout errors
- [ ] Lighthouse score > 90

## Optional Enhancements

- [ ] Custom domain configured
- [ ] Analytics enabled (Vercel Analytics)
- [ ] Error monitoring (Sentry)
- [ ] Social media preview images
- [ ] Favicon updated
- [ ] SEO meta tags added

## Monitoring Setup

- [ ] Vercel deployment notifications enabled
- [ ] MongoDB Atlas alerts configured
- [ ] Email delivery monitoring
- [ ] Error tracking enabled

## Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Team members have access
- [ ] Credentials stored securely

## Launch Checklist

- [ ] All above items completed
- [ ] Tested on multiple devices
- [ ] Tested on multiple browsers
- [ ] Backup plan ready
- [ ] Support email monitored
- [ ] Social media posts ready
- [ ] Press release ready (if applicable)

---

## Quick Commands

```bash
# Test locally
npm run dev

# Build locally
npm run build

# Deploy to GitHub
./deploy.sh

# View Vercel logs
vercel logs

# Check MongoDB
mongosh "mongodb+srv://cluster0dine.sofa1gx.mongodb.net/dineingoapp" --username dineingoapp
```

## Support Contacts

- **Email**: sec.dinelngo.team@gmail.com
- **GitHub**: https://github.com/sujithputta02/DineInGo-early-access
- **Vercel**: https://vercel.com/dashboard

---

**Last Updated**: Ready for deployment ✅
