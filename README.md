# Om Agencies — Rooftop Solar EPC & Supreme Solar Water Heaters
### Chhatrapati Sambhajinagar (Aurangabad), Maharashtra

Official full-stack web application for **Om Agencies** (Proprietorship D. B. Magar, Est. 2010), the highest-rated Rooftop Solar EPC contractor and authorized Supreme Solar Water Heater dealer in Chhatrapati Sambhajinagar.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** (with local SQLite zero-config storage and full PostgreSQL / Supabase Row Level Security support).

---

## 🌟 Business Overview & Verified Credentials
- **Proprietor:** D. B. Magar | **CEO:** G. Magar
- **Year Established:** 2010 (16 Years of Local Engineering Service)
- **GSTIN:** `27ASIPM4616L1ZD` | **HSN:** `84211100`, `85372000`
- **Showroom Address:** Plot No. 11, K-Sector, Near D-Mart, D-Mart–Rashtrawadi Bhavan Road, N-11 HUDCO, CIDCO, Chhatrapati Sambhajinagar, Maharashtra – 431003
- **Direct Phone:** `+91 94233 93107` | **Email:** `dbmagar005@yahoo.co.in`
- **Showroom Hours:** Monday – Sunday: 10:00 AM – 8:00 PM
- **Ratings:** 4.9★ Google Maps (239+ Reviews) | 4.8★ Justdial (398 Ratings)

---

## 🚀 Page-by-Page Architecture

1. **Landing Page (`/`):**
   - Top Policy Strip highlighting *"PM Surya Ghar Subsidy up to ₹78,000 (Valid till 31 March 2027) • 5% Concessional GST • N-11 HUDCO Showroom"*.
   - Split Hero with bold local value proposition, 4.9★ trust pills, MSEDCL architectural net-metering flow, and instant **"Book FREE Roof Survey"** lead card connected to WhatsApp.
   - Interactive 4-Mode Solar Savings & Subsidy Calculator (`Residential LT-I`, `SMART <100 Units`, `Housing Society / RWA`, `Commercial`).
   - Local EPC vs. Out-of-Town Aggregators (SolarSquare) comparison table.
   - 4-Stage MSEDCL Execution Roadmap and verified neighborhood testimonials (HUDCO, CIDCO, Ulkanagari, Waluj).
2. **Products & Turnkey Pricing (`/pricing`):**
   - **Turnkey Solar EPC Packages:** 2 kW, 3 kW (Max ₹78,000 subsidy tier), and 5 kW with transparent gross and net out-of-pocket costs.
   - **Filterable Supreme Solar Water Heater Catalog (All 12 Verified Models):**
     - Filter by Technology: `Glass-Lined Hard-Water SPGL/GL PC` vs. `ETC Stainless Steel SSPC`.
     - Filter by Family Size: `2–4 Members`, `4–6 Members`, `6+ Members`.
     - 1-tap **"Order / Enquire on WhatsApp"** button pre-filled with the exact model name and verified rate to `+91 94233 93107`.
3. **Authentication (`/login` & `/signup`):**
   - Consumer & Administrator accounts with Edge Middleware route guards.
   - 1-click verification presets:
     - **Homeowner Customer:** `rahul@sambhajinagar.in` / `customer123` (Dr. Rahul Shinde, N-11 HUDCO)
     - **Proprietor Admin:** `dbmagar005@yahoo.co.in` / `admin123` (D. B. Magar Sir)
4. **Customer Project Portal (`/dashboard`):**
   - Live 4-stage visual progress tracking (`Survey Scheduled` → `MSEDCL Paperwork` → `Mounting & Wiring` → `Commissioned & Subsidy Credited`).
   - 1-click **Official Quotation PDF View** with formal specifications and OEM warranties.
   - 1-click WhatsApp shortcut directly to Magar Sir for each project.
5. **Book Roof Survey (`/dashboard/projects/new`):**
   - Solar capacity and Supreme heater model selector with live subsidy and net cost calculation.
   - Preferred site visit date picker and address input.
6. **Token Payment Deposit (`/dashboard/checkout`):**
   - Advance survey token deposit (₹1,000, 100% adjustable in final bill) with UPI, Card, and Bank Wire simulation.
   - Printable Official Payment Receipt with Om Agencies GSTIN.
7. **Consumer Profile Settings (`/dashboard/settings`):**
   - Manage consumer address, Sambhajinagar locality, 12-digit MSEDCL light bill consumer number, and sanctioned load.
8. **Proprietor Admin Center (`/admin`):**
   - Role-protected executive dashboard exclusively for `dbmagar005@yahoo.co.in`.
   - Real-time telemetry: Total Sambhajinagar consumers, total rooftop solar kW pipeline, total PM Surya Ghar subsidy facilitated, and live stage updater.

---

## ⚡ Quick Start (Local Setup)

```powershell
cd D:\SA3\invoicely
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

© 2010–2026 Om Agencies, Chhatrapati Sambhajinagar.
