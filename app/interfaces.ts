export interface IHolding {
  tradeDate: string;
  instrumentCode: string;
  marketCode: string;
  quantity: number;
  price: number;
  transactionType: TransactionTypeEnum;
  exchangeRate: number;
  brokerage: number;
  brokerageCurrency: string;
}

export enum TransactionTypeEnum {
  BUY = "Buy",
  SELL = "SELL",
}
