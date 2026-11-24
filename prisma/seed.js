const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Om Agencies Database...");

  // Clean existing records
  await prisma.payment.deleteMany();
  await prisma.projectItem.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User (D. B. Magar Sir)
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "dbmagar005@yahoo.co.in",
      passwordHash: adminPasswordHash,
      name: "D. B. Magar (Proprietor)",
      phone: "+91 94233 93107",
      role: "admin",
      customerType: "commercial",
      locality: "N-11 HUDCO",
      address: "Plot No. 11, K-Sector, Near D-Mart, D-Mart–Rashtrawadi Bhavan Road, N-11 HUDCO, CIDCO, Chhatrapati Sambhajinagar – 431003",
      msedclConsumerNo: "015510009876",
      sanctionedLoad: 10.0,
    },
  });

  // 2. Create Demo Sambhajinagar Customer (Dr. Rahul Shinde)
  const customerPasswordHash = await bcrypt.hash("customer123", 10);
  const customer = await prisma.user.create({
    data: {
      email: "rahul@sambhajinagar.in",
      passwordHash: customerPasswordHash,
      name: "Dr. Rahul Shinde",
      phone: "+91 98220 12345",
      role: "user",
      customerType: "residential",
      locality: "N-11 HUDCO",
      address: "Row House 4, Near Podar International School, N-11 HUDCO, Chhatrapati Sambhajinagar",
      msedclConsumerNo: "015520948123",
      sanctionedLoad: 5.0,
    },
  });

  // 3. Create Commercial Customer (Hotel Grand Kailash, Jalna Road)
  const commCustomerHash = await bcrypt.hash("hotel123", 10);
  const commCustomer = await prisma.user.create({
    data: {
      email: "accounts@grandkailash.com",
      passwordHash: commCustomerHash,
      name: "Grand Kailash Hospitality",
      phone: "+91 94222 55500",
      role: "user",
      customerType: "commercial",
      locality: "Cidco",
      address: "Jalna Road, Near CIDCO Bus Stand, Chhatrapati Sambhajinagar",
      msedclConsumerNo: "015530887711",
      sanctionedLoad: 25.0,
    },
  });

  // 4. Create Projects for Dr. Rahul Shinde
  // Project 1: 3 kW Rooftop Solar PV System
  const proj1 = await prisma.project.create({
    data: {
      userId: customer.id,
      projectNumber: "OM-SOLAR-2026-001",
      serviceType: "Rooftop Solar EPC",
      capacity: "3 kW Grid-Tie",
      systemSizeKw: 3.0,
      brand: "Tata Power Solar (DCR Mono PERC)",
      locality: "N-11 HUDCO",
      installationSite: "Row House 4, N-11 HUDCO, Sambhajinagar",
      status: "installation",
      scheduledDate: new Date("2026-11-28"),
      grossCost: 195000.0,
      subsidyAmount: 78000.0,
      netCost: 117000.0,
      notes: "Hot-dip galvanized structure mounted. Inverter ACDB/DCDB wiring in progress. MSEDCL inspection scheduled for next week.",
      items: {
        create: [
          {
            description: "Tata Power Solar 545W Mono PERC Half-Cut DCR Panels (6 Nos)",
            specification: "ALMM Approved, 25-Year Performance Warranty",
            quantity: 6,
            rate: 16500.0,
            amount: 99000.0,
          },
          {
            description: "Polycab 3.3 kW Single Phase Grid-Tie Inverter with WiFi Dongle",
            specification: "Dual MPPT, IP65 Outdoor Rated, 10-Year Warranty",
            quantity: 1,
            rate: 38000.0,
            amount: 38000.0,
          },
          {
            description: "Hot-Dip Galvanized (HDG) Elevated Rooftop Mounting Structure",
            specification: "Wind resistant up to 150 km/h, stainless steel fasteners",
            quantity: 1,
            rate: 28000.0,
            amount: 28000.0,
          },
          {
            description: "ACDB, DCDB (with Type-II SPD & MCB), Copper Earthing Kit & Net Meter Paperwork",
            specification: "MSEDCL Compliant Liaisoning & Portal Upload",
            quantity: 1,
            rate: 30000.0,
            amount: 30000.0,
          },
        ],
      },
      payments: {
        create: [
          {
            userId: customer.id,
            amount: 25000.0,
            currency: "INR",
            method: "upi",
            status: "completed",
            transactionId: "UPI/63291049281/OM",
            notes: "Initial site survey booking token",
          },
          {
            userId: customer.id,
            amount: 92000.0,
            currency: "INR",
            method: "bank_transfer",
            status: "completed",
            transactionId: "NEFT/HDFC000123/OMAGENCY",
            notes: "Material dispatch installment",
          },
        ],
      },
    },
  });

  // Project 2: Supreme Solar Water Heater
  await prisma.project.create({
    data: {
      userId: customer.id,
      projectNumber: "OM-HEATER-2026-042",
      serviceType: "Supreme Solar Water Heater",
      capacity: "220 LPD Glass-Lined",
      brand: "Supreme 220 GL PC",
      locality: "N-11 HUDCO",
      installationSite: "Row House 4, N-11 HUDCO, Sambhajinagar",
      status: "commissioned",
      scheduledDate: new Date("2026-10-10"),
      grossCost: 27900.0,
      subsidyAmount: 0.0,
      netCost: 27900.0,
      notes: "Installed and tested with hard water high TDS protection. 10-year inner tank warranty active.",
      items: {
        create: [
          {
            description: "Supreme 220 GL PC Pressurized Solar Water Heater (21 Evacuated Tubes)",
            specification: "Ceramic Glass-Lined Inner Tank for hard borewell water",
            quantity: 1,
            rate: 27900.0,
            amount: 27900.0,
          },
        ],
      },
      payments: {
        create: [
          {
            userId: customer.id,
            amount: 27900.0,
            currency: "INR",
            method: "bank_transfer",
            status: "completed",
            transactionId: "IMPS/6300192834/OM",
            notes: "Full payment upon delivery and installation",
          },
        ],
      },
    },
  });

  // Project 3: Commercial 15 kW System for Hotel Grand Kailash
  await prisma.project.create({
    data: {
      userId: commCustomer.id,
      projectNumber: "OM-COMM-2026-008",
      serviceType: "Rooftop Solar EPC",
      capacity: "15 kW Commercial Three-Phase",
      systemSizeKw: 15.0,
      brand: "Waaree 550W Bifacial",
      locality: "Cidco",
      installationSite: "Grand Kailash Hotel Roof, Jalna Road, Sambhajinagar",
      status: "msedcl_paperwork",
      scheduledDate: new Date("2026-12-05"),
      grossCost: 825000.0,
      subsidyAmount: 0.0,
      netCost: 825000.0,
      notes: "Commercial LT-II connection. Load sanction application submitted to MSEDCL Circle Office, Khadkeshwar.",
      items: {
        create: [
          {
            description: "Waaree 550W Bifacial TOPCon Tier-1 Solar PV Modules (28 Nos)",
            specification: "High efficiency commercial generation with 30-year linear warranty",
            quantity: 28,
            rate: 17500.0,
            amount: 490000.0,
          },
          {
            description: "Sungrow 15 kW Three-Phase Commercial Grid-Tie Inverter",
            specification: "Triple MPPT with intelligent I-V curve scanning",
            quantity: 1,
            rate: 135000.0,
            amount: 135000.0,
          },
        ],
      },
    },
  });

  console.log("Om Agencies database seeded successfully!");
  console.log("Admin: dbmagar005@yahoo.co.in / admin123 (D. B. Magar Sir)");
  console.log("Customer: rahul@sambhajinagar.in / customer123 (Dr. Rahul Shinde)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
