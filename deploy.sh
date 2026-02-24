#!/bin/bash

# DineInGo Early Access - Deployment Script
# This script pushes only the dineingo-early-access folder to the separate GitHub repo

echo "🦖 DineInGo Early Access Deployment"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the dineingo-early-access folder?"
    exit 1
fi

echo "📦 Current directory: $(pwd)"
echo ""

# Go to parent directory (main repo root)
cd ..

echo "🔍 Checking git status..."
git status

echo ""
echo "📤 Pushing to GitHub..."
echo ""

# Add remote if not exists
if ! git remote | grep -q "early-access"; then
    echo "➕ Adding remote 'early-access'..."
    git remote add early-access https://github.com/sujithputta02/DineInGo-early-access.git
fi

# Push using git subtree
echo "🚀 Pushing dineingo-early-access folder to GitHub..."
git subtree push --prefix=dineingo-early-access early-access main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Import the GitHub repo: sujithputta02/DineInGo-early-access"
echo "3. Add environment variables in Vercel Dashboard"
echo "4. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
