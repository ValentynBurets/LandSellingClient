export interface Bid{
  bidderId: string;
  lotId: string;
  value: number;
  isWinner: boolean;
  date: string;
}

export interface CreateBid{
  lotId: string;
  value: number;
}