# DineInGo Early Access

Early access landing page for DineInGo - The Future of Dining 🦖

## Features

- 🎯 Dual signup flow (Users & Businesses)
- 🔗 Referral system with unique codes
- 📧 Automated welcome emails (separate templates for users/businesses)
- 🎨 Beautiful UI with emerald (users) and gold (business) themes
- 📊 MongoDB integration for lead tracking
- ⚡ Optimized for Vercel serverless deployment

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer (Gmail SMTP)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Hosting**: Vercel

## Local Development

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- `MONGODB_URI` - Your MongoDB connection string
- `NEXT_PUBLIC_BASE_URL` - `http://localhost:6173` for dev
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - Gmail SMTP credentials

3. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:6173`

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sujithputta02/DineInGo-early-access)

### Manual Deploy

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add all variables from `.env.example`
   - Update `NEXT_PUBLIC_BASE_URL` to your Vercel domain

### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="DineInGo 🦖 <your-email@gmail.com>"
```

## Project Structure

```
dineingo-early-access/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── early-access/
│   │   │       └── join/
│   │   │           └── route.ts          # Signup API endpoint
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Landing page
│   ├── components/
│   │   ├── BusinessSection.tsx           # Business signup section
│   │   └── UserSection.tsx               # User signup section
│   ├── lib/
│   │   ├── db.ts                         # MongoDB connection (serverless-optimized)
│   │   ├── email.ts                      # Email service
│   │   └── emailTemplates/
│   │       ├── userWelcome.ts            # User email template
│   │       └── businessWelcome.ts        # Business email template
│   └── models/
│       └── EarlyAccess.ts                # MongoDB schema
├── public/
│   └── images/                           # Logo and assets
├── vercel.json                           # Vercel configuration
├── next.config.ts                        # Next.js config
└── package.json
```

## Email Templates

### User Email
- Theme: Emerald green (#10b981)
- Logo: DineInGo + Dino Icon
- Features: AI dining, reservations, early perks

### Business Email
- Theme: Gold (#fbbf24) + Emerald (#00F29D)
- Logo: DineInGo BUSINESS
- Features: 3D floor management, analytics, founder status

## Referral System

- Format: `DINO-XXXXXX` (6 random characters)
- Cryptographically secure generation
- Collision detection with retry logic
- Tracks referral chains in database

## API Endpoints

### POST `/api/early-access/join`

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "user" | "business",
  "referralCode": "DINO-ABC123" // optional
}
```

**Response:**
```json
{
  "success": true,
  "referralCode": "DINO-XYZ789"
}
```

## Database Schema

```typescript
{
  email: String (unique per userType)
  userType: "user" | "business"
  referralCode: String (unique, indexed)
  referredBy: String (optional)
  createdAt: Date
}
```

## Performance Optimizations

- ✅ Serverless-optimized MongoDB connection caching
- ✅ Standalone output for smaller deployments
- ✅ Image optimization enabled
- ✅ Compression enabled
- ✅ 10s max function duration
- ✅ Mumbai region (bom1) for Indian users

## Troubleshooting

### Email not sending
- Verify Gmail App Password (not regular password)
- Enable "Less secure app access" if needed
- Check SMTP credentials in `.env.local`

### MongoDB connection issues
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

### Vercel deployment fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `node_modules` is not committed

## License

Private - DineInGo Team

## Contact

📧 sec.dinelngo.team@gmail.com
