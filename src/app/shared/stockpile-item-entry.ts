import { StockpileItem } from "./user";

export interface StockpileItemEntry {
    product: StockpileItem;
    bestBeforeDates: { date: Date | null; count: number; }[];
    name: string;
    items?: StockpileItemEntry[]; 
  }
