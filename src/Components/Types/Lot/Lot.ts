import { Bid } from "../Bid";
import { LotImage } from "../LotImage";
import { PersonInfo } from "../PersonInfo";
import { PriceCoef } from "../PriceCoef";

interface LotLocation{
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
  street: string;
  house: string;
}

export interface SimpleLot{
  id: string;
  header: string;
  publicationDate: string;
  buyPrice: number;
  isRent: boolean;
  isAuction: boolean;
  location: LotLocation;
}

export interface DetailedLot{
  id: string;
  ownerId: string;
  status: string;
  header: string;
  description: string;
  views: number;
  publicationDate: string;
  buyPrice: number;
  minBidPrice: number;
  auctionDuration: number;
  isRent: boolean;
  isAuction: boolean;
  location: LotLocation;
  ownerInfo: PersonInfo;
  images: LotImage[],
  priceCoefs: PriceCoef[],
  bids: Bid[]
}

