import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const searchTerm = inputRef.current?.value.trim() || "";

    if (searchTerm.length < 3) {
      toast.error("Search text must be longer than 2 characters.");
      return;
    }

    onSubmit(searchTerm);

    evt.currentTarget.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={s.input}
          name="searchTerm"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
