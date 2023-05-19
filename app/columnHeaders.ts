import { Holding } from "@prisma/client";

export const columnHeadersTradeIB: string[] = [
  "CurrencyPrimary",
  "FXRateToBase",
  "Symbol",
  "TradeDate",
  "Exchange",
  "Quantity",
  "TradePrice",
  "IBCommission",
  "IBCommissionCurrency",
  "Buy/Sell",
];

export const columnHeadersHolding: string[] = [
  "Trade Date",
  "Instrument Code",
  "Market Code",
  "Quantity",
  "Price",
  "Transaction Type",
  "Exchange Rate (optional)",
  "Brokerage (optional)",
  "Brokerage Currency (optional)",
];

// Define the mapping between the imported CSV column headers and the Prisma model
const csvToModelMapping: { [key: string]: keyof Holding } = {
  TradeDate: "tradeDate",
  Symbol: "instrumentCode",
  Exchange: "marketCode",
  Quantity: "quantity",
  TradePrice: "price",
  "Buy/Sell": "transactionType",
  FXRateToBase: "exchangeRate",
  IBCommission: "brokerage",
  IBCommissionCurrency: "brokerageCurrency",
};

export const columnHeadersYearlyExchangeRate: string[] = [
  "Currency Code",
  "Sterling value of Currency Unit £",
];

export const columnHeadersMonthlyExchangeRate: string[] = [
  "Currency Code",
  "Currency units per �1",
];
