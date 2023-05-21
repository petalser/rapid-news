import { useRef, useState } from "react";
function App() {
  const queryRef = useRef();
  const langRef = useRef();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fetchNews = async () => {
      const request = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_1852633884987bf5fd21aa8e00edb15afd4ae&q=${queryRef.current.value}&language=${langRef.current.value}`
      );
      const data = await request.json();
      setResult(data.results);
      setLoading(false);
      console.log(result);
    };
    fetchNews();
  };

  return (
    <div className="container">
      <form
        id="form"
        method="GET"
        onSubmit={handleOnSubmit}
        className="search searchform row mt-3 justify-content-center"
      >
        <select
          className="form-select-lg bg-success col-md-1 text-light"
          ref={langRef}
          aria-label="Choose language"
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
          className="form-control col-md"
          ref={queryRef}
          placeholder="What are you looking for?"
        />

        <input
          type="submit"
          className="btn btn-success col-md-1"
          value="Search"
        ></input>
      </form>
      {loading && <h3>Loading...</h3>}
      {!loading &&
        result.map((item) => (
          <div key={result.indexOf(item)}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default App;

// { title: "111", description: "999999" },
// { title: "sad", description: "fwewf" },
