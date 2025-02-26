import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.scss'

const SearchForm = ({ setter }) => {
  const langRef = useRef();
  const queryRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = queryRef.current?.value.trim();
    const lang = langRef.current?.value.trim();

    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set("q", query);
      if (lang) searchParams.set("lang", lang);

      navigate(`/?${searchParams.toString()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="search"
    >
      <select
        ref={langRef}
        aria-label="Choose language"
        className='search__select'
      >
        <option value="en" defaultValue>
          ENG
        </option>
        <option value="fr" disabled>FRA</option>
        <option value="uk" disabled>UKR</option>
      </select>

      <input
        type="text"
        ref={queryRef}
        placeholder="Search..."
        className='search__input'
      />

      <input
        type="submit"
        className="search__submit"
        value="GO!"
      ></input>
    </form>
  )
};

export default SearchForm