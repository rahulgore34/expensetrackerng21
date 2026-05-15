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
