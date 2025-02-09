import React from "react";
import { useRef } from "react";
import './SearchForm.scss'

const KEY = import.meta.env.VITE_GNEWS_API_KEY
const URL = import.meta.env.VITE_GNEWS_API_ENDPOINT

export default function SearchForm({ loading, result }) {
  const langRef = useRef();
  const queryRef = useRef();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    loading(true);
    const fetchNews = async () => {
      const request = await fetch(
        `${URL}search?apikey=${KEY}&q=${queryRef.current.value}&lang=${langRef.current.value}`
      );
      const data = await request.json();
      console.log(data)
      loading(false);
      result(data.articles);
    };
    try {
      fetchNews();

    } catch (err) {
      loading(false);
      result([]);
      console.log('Fetch failed: ' + err)
    }
  };

  return (
    <form
      id="form"
      method="GET"
      onSubmit={handleOnSubmit}
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
        <option value="fr">FRA</option>
        <option value="uk">UKR</option>
        <option value="pl">POL</option>
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