const KEY = import.meta.env.VITE_GNEWS_API_KEY
const URL = import.meta.env.VITE_GNEWS_API_ENDPOINT

const useGNews = () => {
    const getData = async (query, lang = "en") => {
        const request = await fetch(
            `${URL}search?apikey=${KEY}&q=${encodeURIComponent(query)}&lang=${lang}`
        );
        return request.json();
    }
    return { getData }
}

export default useGNews;