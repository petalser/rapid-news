import React from "react";
import { useRef } from "react";
import './SearchForm.scss'

export default function SearchForm({ loading, result }) {
  const langRef = useRef();
  const queryRef = useRef();  

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    loading(true);
    const fetchNews = async () => {
      const request = await fetch(
        // explicit API key isn't good practice, but in this case it is ok
        `https://newsdata.io/api/1/news?apikey=pub_1852633884987bf5fd21aa8e00edb15afd4ae&q=${queryRef.current.value}&language=${langRef.current.value}`
      );
      const data = await request.json();
      loading(false);
      result(data.results);
      console.log('content:')
      console.log(data.results[0])
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