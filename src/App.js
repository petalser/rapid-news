import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Loading from "./components/Loading/Loading";
import Logo from "./components/Logo/Logo";
import ListItem from "./components/ListItem/ListItem";
import Page from "./components/Page/Page";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const loadingSetter = (isLoading) => {
    setLoading(isLoading);
  };

  const resultSetter = (results) => {
    setResult(results);
  };

  return (
    <div className="container">
      <SearchForm loading={loadingSetter} result={resultSetter} />
      {loading && <Loading />}
      {!loading && !result && <Logo topText="Rapid" bottomText="News" />}
      {!loading && result && result.length === 0 && (
        <Logo topText="No" bottomText="Results" />
      )}
      {!loading &&
        result &&
        result.length > 0 &&
        result.map((item, index) => (
          <ListItem
            key={index}
            id={index}
            image={item["image_url"]}
            title={item["title"]}
            description={item["description"]}
            text={item["content"]}
          />
        ))}
    </div>
  );
}

export default App;
