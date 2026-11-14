# Sheikh's Shop (sheiks-shop)

A modern, production-grade luxury menswear e-commerce storefront and private owner inventory administration portal built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Storage, & Auth)**.

---

## 🌟 Key Features

### 🛍️ Public Customer Storefront (`/`)
- **Luxury Menswear Catalog**: Browse Oxford shirts, polo shirts, shorts, boxers, perfumes, jeans, slides, combo deals, and gift sets.
- **Dynamic Category Navigation**: Instant filtering across categories with mobile-optimized horizontal touch scrolling.
- **Fast Search Modal**: Live keyword search with keyboard and touch accessibility, zero auto-zoom on iOS.
- **Cart & WhatsApp Checkout**: Interactive cart drawer and checkout form routing completed orders directly to WhatsApp with automated customer details, delivery options (Accra Store Pickup / Nationwide Courier), and calculated totals.
- **Customer Profile & Support Pages**: Saved delivery profiles, size guide, order tracking, shipping & returns, FAQs, and company story.
- **Responsive & Accessible**: 100% compliant with Apple Human Interface Guidelines and WCAG 2.1 (minimum 44x44px tap targets, 16px input zoom guards, safe-area notches/dynamic island padding).

### 🛡️ Private Owner Admin Portal (`/admin`)
- **Server-Protected Route**: Protected by Supabase server-side session authentication (`requireOwner()`) and Edge Middleware. Non-owners are immediately redirected to `/admin/login`.
- **Live KPI Metrics**: Real-time summary cards for Total Catalog Products, In-Stock items, Sold-Out inventory, and Active Promo/Sale counts.
- **Complete Product Management**:
  - Add new products with image upload directly to Supabase Storage (`product-images` bucket).
  - Edit prices, compare-at promotional prices, descriptions, and sizes.
  - One-click stock toggle (Available / Sold Out) and sale toggle.
  - Delete products with safe confirmation modal and automatic cache revalidation.
- **One-Click Catalog Seed**: Instantly populate an empty Supabase database with all 21 default menswear products.

---

## 📁 Project Structure

```text
sheiks-shop/
├── public/                     # Static assets (images, icons, manifest.json)
├── src/
│   ├── app/
│   │   ├── admin/              # Private owner admin dashboard & login
│   │   │   ├── login/          # Secure owner login form & action
│   │   │   ├── actions.ts      # Auth & logout server actions
│   │   │   ├── product-actions.ts # Product CRUD & image upload server actions
│   │   │   ├── page.tsx        # Admin dashboard server component
│   │   │   └── AdminDashboardClient.tsx # Interactive inventory table & modals
│   │   ├── api/subscribe/      # Newsletter subscriber route handler
│   │   ├── cart/               # Cart & WhatsApp order checkout page
│   │   ├── categories/         # Category browsing & dynamic [slug] routes
│   │   ├── products/           # Dynamic product detail [slug] routes
│   │   ├── account/            # Customer profile & sizes page
│   │   ├── support/            # Contact, FAQs, Track Order, Shipping, Size Guide
│   │   ├── error.tsx           # Luxury branded error boundary
│   │   ├── global-error.tsx    # Root application error boundary
│   │   ├── globals.css         # Tailwind v4, safe-area insets, mobile zoom fixes
│   │   ├── layout.tsx          # Root layout, viewport metadata, theme-color
│   │   └── page.tsx            # Customer-facing public storefront homepage
│   ├── components/
│   │   ├── public/             # Public shop components (Header, Footer, Hero, etc.)
│   │   ├── admin/              # Dedicated admin navbar, footer, and branding
│   │   └── shared/             # Shared components (Logo, etc.)
│   ├── data/                   # Default catalog, categories, and store config
│   ├── lib/
│   │   ├── supabase/           # Browser, server, and admin client helpers
│   │   │   ├── client.ts       # Browser client (@supabase/ssr createBrowserClient)
│   │   │   ├── server.ts       # Server client (@supabase/ssr createServerClient)
│   │   │   ├── admin.ts        # Server-only client with SUPABASE_SERVICE_ROLE_KEY
│   │   │   └── middleware.ts   # Edge session refresher & /admin route guard
│   │   ├── auth.ts             # Server-side requireOwner() guard
│   │   ├── products.ts         # Live Supabase / fallback catalog fetcher
│   │   └── scrollLock.ts       # iOS Safari momentum body scroll lock helper
│   └── middleware.ts           # Global Next.js middleware delegator
├── supabase/
│   ├── schema.sql              # Complete database schema, RLS policies, & bucket setup
│   └── migrations/             # Timestamped migration file for Supabase CLI
├── .env.example                # Clean template for required environment variables
├── next.config.ts              # Next.js config with Supabase storage remote patterns
├── package.json                # Dependencies and browserslist configuration
└── tsconfig.json               # Strict TypeScript configuration
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory for local development:

```bash
# 1. Supabase Project Core URL & Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 2. Store Owner Email (Route Protection & Permissions)
OWNER_EMAIL=wyflic@gmail.com

# 3. Customer Order WhatsApp Routing
NEXT_PUBLIC_WHATSAPP_NUMBER=233593684022
```

> ⚠️ **Security Notice**: `SUPABASE_SERVICE_ROLE_KEY` is server-only. It is never exposed in client bundles or prefixed with `NEXT_PUBLIC_`.

---

## 🗄️ Supabase Database & Storage Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open [`supabase/schema.sql`](supabase/schema.sql) from this repository, paste the contents into the SQL Editor, and click **Run**.
   - This creates the `public.products` table with performance indexes and updated-at triggers.
   - Enables **Row Level Security (RLS)** allowing public read and owner-only write.
   - Configures the public `product-images` storage bucket (2MB limit, JPEG/PNG/WebP).
4. Go to **Authentication ➔ Users ➔ Add User ➔ Create User**:
   - Email: `wyflic@gmail.com` (or your configured `OWNER_EMAIL`)
   - Password: Choose a strong password.

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the owner portal.

```bash
# 3. Verify TypeScript & Production Build
npm run build
```

---

## ☁️ Vercel Deployment

1. Push your code to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Import the repository in [vercel.com](https://vercel.com).
3. In **Project Settings ➔ Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OWNER_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Click **Deploy**. Vercel will build and deploy the production application with zero errors.
