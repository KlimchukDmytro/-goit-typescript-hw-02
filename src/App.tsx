import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import { fetchData } from "../src/unsplash-api";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { Toaster, toast } from "react-hot-toast";

interface Image {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
  user: {
    name: string;
    location?: string;
    total_photos: number;
    portfolio_url?: string;
  };
}

function App() {
  const [results, setResults] = useState<Image[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [imageModalIsOpen, setImageModalIsOpen] = useState<boolean>(false); 
  const [imageModal, setImageModal] = useState<Image | null>(null); 
  const [query, setQuery] = useState<string>(""); 
  const [page, setPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(0); 
  useEffect(() => {
    if (query === "") return;

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage("");

        const apiResponse = await fetchData(query, page);
        const newResults = apiResponse.data.results as Image[]; 

        setResults((prevResults) => [...prevResults, ...newResults]);
        setTotalPages(apiResponse.data.total_pages);

        if (newResults.length === 0) {
          toast.error("No images found for your query.");
        }
      } catch (error) {
        setError(true);
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  function openModal(img: Image) {
    setImageModal(img);
    setImageModalIsOpen(true);
  }

  function closeModal() {
    setImageModal(null);
    setImageModalIsOpen(false);
  }

  function handleAxiosError(error: any) {
    if (error.response) {
      setErrorMessage(`Server error: ${error.response.data}`);
    } else if (error.request) {
      setErrorMessage("No response from server. Please check your network.");
    } else {
      setErrorMessage(`Request setup error: ${error.message}`);
    }
  }

  const handleSearch = (searchTerm: string) => {
    setResults([]);
    setQuery(searchTerm);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isEmptyResults = !loading && query && results.length === 0;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 5000,
            style: { background: "red", color: "white" },
          },
        }}
      />
      <SearchBar onSubmit={handleSearch} />
      {results.length > 0 && (
        <ImageGallery results={results} openModal={openModal} />
      )}
      {page < totalPages && !loading && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage errorMsg={errorMessage} />}
      {isEmptyResults && <p>No images found</p>}
      {imageModalIsOpen && (
        <ImageModal
          isOpen={imageModalIsOpen}
          closeModal={closeModal}
          img={imageModal!} 
        />
      )}
    </>
  );
}

export default App;
