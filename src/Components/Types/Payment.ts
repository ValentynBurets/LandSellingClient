export interface CreatePayment{
  AgreementId: string;
  Price: number;
  Nonce: any;
}

export interface Payment{
  userId: string;
  agreementId: string;
  date: string;
  value: number;
  description: string;
}