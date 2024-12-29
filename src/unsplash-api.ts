import axios from "axios";

const apiUrl = "https://api.unsplash.com/search/photos";
const perPage = 15;
const apiKey = "zXc12zaGd0nxOt5ndbMDhSp0YoNd6S06IdsDImcFrEQ";

export interface ImageData {
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

export interface ApiResponse {
  total: number;
  total_pages: number;
  results: ImageData[];
}

export async function fetchData(
  query: string,
  page: number
): Promise<ApiResponse> {
  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your environment variables."
    );
  }

  const headersList = {
    Accept: "*/*",
    "Accept-Version": "v1",
    Authorization: `Client-ID ${apiKey}`,
  };

  const reqOptions = {
    url: `${apiUrl}?query=${query}&per_page=${perPage}&page=${page}`,
    method: "GET",
    headers: headersList,
  };

  const response = await axios.request<ApiResponse>(reqOptions);
  return response.data;
}
