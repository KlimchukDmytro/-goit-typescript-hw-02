import axios from "axios";

const apiUrl = "https://api.unsplash.com/search/photos";
const perPage = 15;
const apiKey = "zXc12zaGd0nxOt5ndbMDhSp0YoNd6S06IdsDImcFrEQ";

export async function fetchData(query: string, page: number) {
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

  const response = await axios.request(reqOptions);
  return response;
}
