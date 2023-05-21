import React from "react";


export default function SearchForm() {
    return (
        <form
        id="form"
        method="GET"
        onsubmit="fetchData(); return false;"
        className="search searchform row mt-3 justify-content-center"
      ><select
        className="form-select form-select-lg bg-success col-md-1 text-light"
        name="language"
        aria-label="Choose language"
      >
        <option value="en" selected>ENG</option>
        <option value="fr">FRA</option>
        <option value="uk">UKR</option>
        <option value="pl">POL</option>
      </select>
       
        <input
          type="text"
          className="form-control col-md-8"
          name="q"
          placeholder="What are you looking for?"
        />
        
        <input type="submit" className="btn btn-success col-md-1" value="Search">
      </input>
      </form>
    )
};