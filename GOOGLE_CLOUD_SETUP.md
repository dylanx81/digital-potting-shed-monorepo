# Google Cloud Vision API Setup Guide

## 🚀 **Why Google Cloud Vision?**

- **Best Accuracy**: Industry-leading OCR accuracy
- **Handles Complex Layouts**: Better with different fonts and orientations
- **Robust Processing**: Handles low-quality images better
- **Production Ready**: Used by major companies worldwide

## 📋 **Setup Steps**

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name: `digital-potting-shed-vision`
4. Click "Create"

### 2. Enable Cloud Vision API

1. Go to [Cloud Vision API](https://console.cloud.google.com/apis/library/vision.googleapis.com)
2. Click "Enable"
3. Wait for activation (usually 1-2 minutes)

### 3. Create Service Account

1. Go to [IAM & Admin → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click "Create Service Account"
3. Name: `vision-api-service`
4. Description: `Service account for OCR processing`
5. Click "Create and Continue"

### 4. Grant Permissions

1. Role: `Cloud Vision API User`
2. Click "Continue"
3. Click "Done"

### 5. Create API Key

1. Go to [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Copy the API key (starts with `AIza...`)

### 6. Set Up Billing

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link a billing account
3. **Important**: Google Cloud Vision costs $1.50 per 1000 requests

## 🔧 **Environment Variables**

Add these to your Vercel project:

```
GOOGLE_CLOUD_API_KEY=AIzaSyYourApiKeyHere
```

## 💰 **Pricing**

- **First 1000 requests/month**: FREE
- **Additional requests**: $1.50 per 1000
- **Typical usage**: ~$5-15/month for active users

## 🎯 **Features Enabled**

✅ **Superior OCR Accuracy** - Best in class text recognition  
✅ **Complex Layout Handling** - Handles different seed packet designs  
✅ **Low-Quality Image Support** - Works with blurry photos  
✅ **Production Reliability** - Google's infrastructure  
✅ **Advanced Text Parsing** - Better plant data extraction  

## 🧪 **Testing**

1. Deploy your app to Vercel
2. Try scanning a seed packet
3. Check the accuracy vs previous OCR solutions
4. Monitor costs in Google Cloud Console

## 🔒 **Security Best Practices**

1. **Restrict API Key**: Limit to Cloud Vision API only
2. **Set Quotas**: Limit requests per day/month
3. **Monitor Usage**: Set up billing alerts
4. **Rotate Keys**: Change API keys periodically

## 📊 **Expected Results**

With Google Cloud Vision, you should see:
- **95%+ text accuracy** on clear images
- **85%+ accuracy** on blurry/low-quality images
- **Better plant name detection** from seed packets
- **Improved variety recognition** (BushSteak, Cherry, etc.)

## 🚨 **Cost Management**

### Set Up Budget Alerts:
1. Go to [Billing → Budgets & Alerts](https://console.cloud.google.com/billing/budgets)
2. Create budget: $20/month
3. Set alert at 50% ($10)
4. Set alert at 80% ($16)

### Typical Monthly Costs:
- **10 users, 50 scans each**: ~$3.75/month
- **100 users, 20 scans each**: ~$15/month
- **1000 users, 10 scans each**: ~$75/month

## 🎉 **You're Ready!**

Your Digital Potting Shed now has **enterprise-grade OCR** with the best accuracy available! 🌱📸
