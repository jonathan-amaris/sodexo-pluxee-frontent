export interface News {
  id: number;
  title: string;
  description?: string;
  summary: string;
  published_at: string;
  checkAsFavorite: boolean;
}


export interface GetNewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[]
}
