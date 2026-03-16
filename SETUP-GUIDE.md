# Shelby AI Deals — Setup Guide

Complete step-by-step instructions for setting up Supabase auth, Google OAuth, environment variables, and tool logos.

---

## Step 1: Create a Supabase Project

1. Go to **https://supabase.com** and click **Start your project**
2. Sign up with GitHub (recommended) or email
3. Click **New project**
4. Fill in:
   - **Organization**: Select your org (or create one)
   - **Project name**: `shelby-ai-deals`
   - **Database password**: Generate a strong password and **save it somewhere safe**
   - **Region**: Choose the closest to your audience (e.g. `West EU (Ireland)` or `East US (Virginia)`)
5. Click **Create new project** — wait ~2 minutes for provisioning

### Copy your keys (you'll need these later):

6. Once the project is ready, go to **Settings** (gear icon, left sidebar) → **General**
7. Find and copy the **Reference ID** (a short string like `abcdefghij`) — your project URL is `https://{reference-id}.supabase.co`
8. Now go to **Settings** → **API Keys**
9. Copy the **Publishable key** — this is a long `eyJ...` string
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase renamed it from "anon public" to "Publishable key")
   - It's safe to use in the browser when Row Level Security (RLS) is enabled (which our schema sets up)

So you now have two values:
   - **Project URL**: `https://{reference-id}.supabase.co` → this becomes `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key**: `eyJ...` → this becomes `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Run the database schema:

8. Go to **SQL Editor** (left sidebar, looks like a terminal icon)
9. Click **New query**
10. Open the file `supabase-schema.sql` from your project root
11. Copy the **entire contents** and paste into the SQL Editor
12. Click **Run** (or press Ctrl+Enter)
13. You should see "Success. No rows returned" — this means all tables, policies, and triggers are created

### Verify tables were created:

14. Go to **Table Editor** (left sidebar)
15. You should see 3 tables: `profiles`, `reviews`, `review_votes`
16. Click each one to confirm they have the correct columns

---

## Step 2: Set Up Google OAuth

### Part A: Google Cloud Console

1. Go to **https://console.cloud.google.com/**
2. Sign in with your Google account
3. At the top, click the project dropdown → **New Project**
   - **Project name**: `Shelby AI Deals`
   - Click **Create**
4. Make sure the new project is selected in the dropdown at the top

### Configure OAuth Consent Screen:

5. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**
6. Select **External** → click **Create**
7. Fill in:
   - **App name**: `ShelbyAIDeals`
   - **User support email**: your email
   - **App logo**: (optional, skip for now)
   - Scroll down to **Developer contact information** → enter your email
8. Click **Save and Continue**
9. On the **Scopes** page → click **Save and Continue** (no changes needed)
10. On the **Test users** page → click **Save and Continue** (no changes needed)
11. Click **Back to Dashboard**

### Create OAuth Client ID:

12. In the left sidebar, go to **APIs & Services** → **Credentials**
13. Click **+ Create Credentials** → **OAuth client ID**
14. Fill in:
    - **Application type**: `Web application`
    - **Name**: `Shelby AI Deals Login`
    - **Authorized JavaScript origins**: Add these:
      - `https://shelby-ai.com`
      - `http://localhost:3000`
    - **Authorized redirect URIs**: Add this (replace `YOUR_PROJECT_REF` with your Supabase project reference — the random letters in your Supabase URL, e.g. `abcdefghij`):
      - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
15. Click **Create**
16. A popup shows your **Client ID** and **Client Secret** — **copy both** and save them

### Part B: Configure Google in Supabase

17. Go back to your Supabase project dashboard
18. Go to **Authentication** (left sidebar) → **Providers**
19. Find **Google** in the list and click to expand it
20. Toggle **Enable Sign in with Google** to ON
21. Paste in:
    - **Client ID**: the Client ID from step 16
    - **Client Secret**: the Client Secret from step 16
22. Click **Save**

### Publish the OAuth app (IMPORTANT for production):

23. Go back to Google Cloud Console → **APIs & Services** → **OAuth consent screen**
24. Click **Publish App** → **Confirm**
    - This allows any Google user to sign in (not just test users)
    - Google may show a review warning — for basic scopes (email/profile), no review is needed

---

## Step 3: Add Environment Variables to Vercel

### For production (Vercel):

1. Go to **https://vercel.com/dashboard**
2. Click on your **shelby-ai** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (the anon public key) | Production, Preview, Development |

5. Click **Save** for each one

### For local development:

6. Open the file `.env.local` in your project root (create it if it doesn't exist)
7. Add:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ_your_anon_key_here
```

8. **Never commit `.env.local` to git** — it should already be in `.gitignore`

### Trigger a new deployment:

9. After adding env vars on Vercel, you need a new deployment for them to take effect
10. Either push a new commit, or go to Vercel → **Deployments** → click the three dots on the latest deployment → **Redeploy**

---

## Step 4: Add Tool Logos

### Where to get logos:

For each AI tool you've reviewed, you need a logo image. Sources:

1. **Official press kit / brand page** (best quality):
   - Most tools have a `/press` or `/brand` page with downloadable logos
   - Example: `https://jasper.ai/press`, `https://pictory.ai/brand`

2. **Clearbit Logo API** (quick, 128px):
   - URL format: `https://logo.clearbit.com/{domain}`
   - Example: `https://logo.clearbit.com/jasper.ai` → downloads Jasper's logo
   - Works for most companies

3. **Google Images** → search `{tool name} logo png transparent`
   - Right-click → Save as

### How to add logos:

1. Save each logo as SVG (preferred) or PNG in:
   ```
   public/logos/{tool-slug}.svg
   ```

   For example:
   ```
   public/logos/pictory.svg
   public/logos/frase.svg
   public/logos/jasper-ai.svg
   public/logos/copy-ai.svg
   public/logos/grammarly.svg
   public/logos/synthesia.svg
   public/logos/descript.svg
   public/logos/surfer-seo.svg
   public/logos/semrush.svg
   public/logos/elevenlabs.svg
   public/logos/mangools.svg
   public/logos/writesonic.svg
   ```

2. Logo requirements:
   - **Square aspect ratio** (will be displayed in a 28x28px circle)
   - **Transparent background** preferred
   - **SVG format** is best (scales perfectly, tiny file size)
   - If PNG, minimum 128x128px

### Update MDX frontmatter:

3. For each review file in `src/content/reviews/`, add these fields to the frontmatter:

```yaml
---
title: "Pictory Review: ..."
# ... existing fields ...

# NEW — add these:
toolLogo: "/logos/pictory.svg"
socialLinks:
  twitter: "https://twitter.com/pictaborelabs"
  youtube: "https://youtube.com/@pictory"
  linkedin: "https://linkedin.com/company/pictory-ai"
  instagram: ""
  github: ""
youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_HERE"
---
```

### Social media links reference:

Find each tool's social media by visiting their website footer or "About" page. Here's a starting template:

| Tool | Twitter | YouTube | LinkedIn |
|------|---------|---------|----------|
| Pictory | @pictaborelabs | @pictory | pictory-ai |
| Frase | @faborelase_io | @FraseIO | frase |
| Jasper | @jasaboreper_ai | @JasperAI | jasper-ai |
| Copy.ai | @copy_ai | @CopyAI | copy-ai |
| Grammarly | @Grammarly | @grammarly | grammarly |
| Synthesia | @synthesiaIO | @SynthesiaIO | synthesiaaio |
| Descript | @DescriptApp | @descript | descript |
| Surfer SEO | @surferseo | @SurferSEO | surferseo |
| Semrush | @semrush | @semaborerush | semrush |
| ElevenLabs | @elevaborelabsio | @ElevenLabs | elevenlabs |

(Verify each link — handles change. Visit the tool's website footer for current links.)

### YouTube URLs:

For `youtubeUrl`, find either:
- The tool's official demo video on their YouTube channel
- A popular review video (prefer under 10 minutes)
- Leave as `""` if no good video exists

---

## Step 5: Verify Everything Works

### Local testing:

1. Run the dev server:
   ```bash
   cd /home/sprljo/claudee/PROJECTS/shelby-deals
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser

3. Test each feature:

- [ ] **Newsletter tab** — click "Newsletter" in the nav → should open the newsletter page
- [ ] **Language dropdown** — click the flag icon in the header → dropdown shows 15 languages with flags
- [ ] **Language switch** — select a language → nav labels, buttons, and UI text change
- [ ] **Login button** — click "Login" → auth modal opens in login mode
- [ ] **Join for Free** — click "Join for Free" → auth modal opens in signup mode
- [ ] **Google sign in** — click "Sign in with Google" → redirects to Google → returns logged in
- [ ] **Email signup** — fill in username, first/last name, email, password → creates account
- [ ] **Newsletter auto-subscribe** — after signup, check Beehiiv → email should appear as subscriber
- [ ] **User menu** — after login, header shows avatar + name dropdown
- [ ] **Profile page** — click Profile in dropdown → shows your info + reviews
- [ ] **Tool logos** — go to /reviews → tool logos appear on cards (if you added them)
- [ ] **Social links** — go to a tool review page → social icons show below hero image
- [ ] **YouTube embed** — if youtubeUrl is set → YouTube player appears on the review page
- [ ] **Write review** — on a tool review page, scroll to "User Rating" → click "Write a Review"
- [ ] **Submit review** — fill in stars + title + body → submits to Supabase → appears in list
- [ ] **Rating distribution** — after adding reviews → star bars show the distribution
- [ ] **Mobile menu** — resize to mobile → hamburger menu shows all new nav items + auth buttons
- [ ] **Dark/Light mode** — theme toggle still works, all new components adapt correctly

### Production deployment:

4. After all tests pass locally:
   ```bash
   git add -A
   git commit -m "feat: add auth, i18n, user reviews, social links, YouTube embeds, newsletter page"
   git push
   ```

5. Vercel auto-deploys on push. Check the deployment logs for any errors.

6. Visit `https://shelby-ai.com` and repeat the test checklist above.

---

## Troubleshooting

### "supabaseUrl is required" error during build
- This means env vars aren't set. The build should still succeed (the code handles this gracefully), but features won't work. Make sure `.env.local` exists with the correct values.

### Google OAuth not redirecting back
- Check that the redirect URI in Google Cloud Console matches exactly: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- Check that the Supabase Site URL is set to `https://shelby-ai.com` in **Authentication** → **URL Configuration**

### Reviews not saving
- Open browser DevTools → Network tab → check for errors on Supabase API calls
- In Supabase Dashboard → **Authentication** → **Users** — confirm your user exists
- In **Table Editor** → `profiles` — confirm your profile row exists
- Check RLS policies in **Authentication** → **Policies**

### Language not switching
- Open browser DevTools → Console → look for "Failed to load translations" warnings
- Check that the locale JSON files exist in `src/i18n/locales/`
- Try clearing `localStorage` item "locale" in DevTools → Application → Local Storage

### CSP blocking YouTube / Google / Supabase
- Open browser DevTools → Console → look for "Refused to..." CSP errors
- Compare the blocked domain with `vercel.json` CSP header
- Add the missing domain to the appropriate CSP directive
