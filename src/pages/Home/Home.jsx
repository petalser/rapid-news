import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGNews } from "../../hooks/useGNews";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loading from "../../components/Loading/Loading";
import Logo from "../../components/Logo/Logo";
import ListItem from "../../components/ListItem/ListItem";
import "./Home.scss";

function Home() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // Track fetch errors
    const { getData } = useGNews();
    const [searchParams] = useSearchParams();
    const debounceTimeout = useRef(null);

    const query = searchParams.get("q");
    const lang = searchParams.get("lang") || "en";

    const fetchNews = async (query, lang) => {
        try {
            const res = await getData(query, lang);
            return res.articles;
        } catch (err) {
            console.error("Fetch failed:", err);
            return [];
        }
    };

    useEffect(() => {
        if (query && query.trim()) {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

            debounceTimeout.current = setTimeout(async () => {
                setLoading(true)
                const articles = await fetchNews(query, lang);
                setResult(articles);
                setLoading(false)
            }, 500);
        } else {
            setResult(null);
        }

        return () => clearTimeout(debounceTimeout.current);
    }, [query, lang]);

    return (
        <div className="container">
            <SearchForm />

            {loading && <Loading />}

            {!loading && !result && !error && (
                <Logo topText="Rapid" bottomText="News" />
            )}

            {!loading && error && (
                <Logo topText="Error" bottomText={error} />
            )}

            {!loading && result && result.length === 0 && !error && (
                <Logo topText="No" bottomText="Results" />
            )}

            {!loading && result && result.length > 0 && (
                result.map((item, index) => (
                    <ListItem key={index} id={index} data={item} />
                ))
            )}
        </div>
    );
}

export default Home;
