export interface Bid{
  bidderId: string;
  lotId: string;
  value: number;
  isWinner: boolean;
  date: string;
}