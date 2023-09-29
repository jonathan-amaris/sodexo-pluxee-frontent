export interface News {
  id: number;
  title: string;
  summary: string;
  published_at: string;
  added_to_favorites_at?: string;
}

export enum OrderingEnum {
  ASC = 'published_at',
  DESC = '-published_at',
}