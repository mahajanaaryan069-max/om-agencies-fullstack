export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency = "INR"): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// PM Surya Ghar Muft Bijli Yojana Central Govt Direct Subsidy Calculator
export function calculatePMSubsidy(systemKw: number, customerType: string = "residential"): number {
  const kw = Math.max(0, systemKw);
  if (customerType === "society") {
    // ₹18,000 per kW for Common Facilities / EV Charging in Housing Societies
    return Math.min(kw * 18000, 9000000);
  }
  if (customerType === "commercial") {
    // Commercial gets 40% Accelerated Depreciation tax benefit, no direct DBT subsidy
    return 0;
  }
  // Residential LT-I
  if (kw <= 0) return 0;
  if (kw < 2) return 30000;
  if (kw < 3) return 60000;
  return 78000; // Cap at ₹78,000 for 3 kW and above
}

// Collateral-Free Nationalized Bank Solar Loan EMI Calculator (~6.0% p.a., 5 Years)
export function calculateSolarLoanEMI(principal: number, annualRate = 6.0, tenureYears = 5): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

export function calculateInvoiceTotals(
  items: { quantity: number; rate: number }[],
  taxRatePercent = 0
) {
  const subtotal = items.reduce((acc, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return acc + qty * rate;
  }, 0);

  const taxAmount = (subtotal * (Number(taxRatePercent) || 0)) / 100;
  const total = subtotal + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}
