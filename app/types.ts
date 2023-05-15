export type CSVData = {
  [key: string]: string;
};

export type Holding = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  tradeDate: string;
  instrumentCode: string;
  marketCode: string;
  quantity: string;
  price: string;
  transactionType: string;
  exchangeRate: string;
  brokerage: string;
  brokerageCurrency: string;
};
