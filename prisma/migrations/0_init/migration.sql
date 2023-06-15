-- CreateTable
CREATE TABLE "Holding" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "tradeDate" TIMESTAMPTZ(3) NOT NULL,
    "instrumentCode" TEXT NOT NULL,
    "marketCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(12,6) NOT NULL,
    "transactionType" TEXT NOT NULL,
    "exchangeRate" DECIMAL(12,6) NOT NULL,
    "brokerage" DECIMAL(12,6) NOT NULL,
    "brokerageCurrency" TEXT NOT NULL,
    "exchangeRateYearly" DECIMAL(12,6),
    "currencyCode" TEXT,
    "exchangeRateMonthly" DECIMAL(12,6),
    "exchangeRateMonthlyInverse" DECIMAL(12,6),

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRateYearly" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "exchangeRate" DECIMAL(12,6) NOT NULL,

    CONSTRAINT "ExchangeRateYearly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRateMonthly" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "exchangeRate" DECIMAL(12,6) NOT NULL,
    "currencyCode" TEXT NOT NULL,

    CONSTRAINT "ExchangeRateMonthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "payDate" TIMESTAMPTZ(3) NOT NULL,
    "instrumentCode" TEXT NOT NULL,
    "amount" DECIMAL(12,6) NOT NULL,
    "currencyCode" TEXT,
    "exchangeRate" DECIMAL(12,6) NOT NULL,
    "exchangeRateYearly" DECIMAL(12,6),
    "exchangeRateMonthly" DECIMAL(12,6),
    "exchangeRateMonthlyInverse" DECIMAL(12,6),

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dividend" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "payDate" TIMESTAMPTZ(3) NOT NULL,
    "instrumentCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "tax" DECIMAL(12,6) NOT NULL,
    "fee" DECIMAL(12,6) NOT NULL,
    "grossRate" DECIMAL(12,6) NOT NULL,
    "grossAmount" DECIMAL(12,6) NOT NULL,
    "netAmount" DECIMAL(12,6) NOT NULL,
    "currencyCode" TEXT,
    "exchangeRate" DECIMAL(12,6) NOT NULL,
    "exchangeRateYearly" DECIMAL(12,6),
    "exchangeRateMonthly" DECIMAL(12,6),
    "exchangeRateMonthlyInverse" DECIMAL(12,6),

    CONSTRAINT "Dividend_pkey" PRIMARY KEY ("id")
);

