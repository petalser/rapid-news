import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Page from "./pages/Page/Page";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.slice(1); // Get the path without the leading "/"

    if (path && !location.pathname.startsWith("/article/")) {
      navigate(`/?q=${encodeURIComponent(path)}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:slug" element={<Page />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App