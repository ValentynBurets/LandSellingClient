export interface CreateAgreement{
  lotId: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface FullAgreement{
  id:	string;
  lotId: string;
  customerId:	string;
  status:	string;
  description:	string;
  creationDate:	string;
  startDate:	string;
  endDate:	string; 
}

export interface TableAgreement{
  number: number;
  id:	string;
  lotId: string;
  customerId:	string;
  status:	string;
  description:	string;
  creationDate:	string;
  startDate:	string;
  endDate:	string; 
  isApprove: boolean;
  isDisApprove: boolean;
}