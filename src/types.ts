export interface Image {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  likes?: number;
  user?: {
    name: string;
    location?: string;
    total_photos?: number;
    portfolio_url?: string;
  };
}
