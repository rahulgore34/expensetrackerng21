export interface ExpenseRecord {
  _id?: string;
  expenseName: string;
  amount: number;
  paidFrom: string;
  date: string;
}

export interface ExpenseRecordsResponse {
  statusCode: number;
  count: number;
  data: ExpenseRecord[];
}

export interface ExpenseSummary {
  mostUsedPaymentMethod: string;
  topCategory: string;
  topCategoryFrequency: number;
  totalExpense: number;
  totalTransactions: number;
}
