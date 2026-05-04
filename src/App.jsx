import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import DetailObat from "./pages/DetailObat";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

function Navbar({ cart, theme, toggleTheme }) {
  return (
    <div className="navbar">
      <h2>
        <span role="img" aria-label="pill">💊</span> Apotek Berkah Sehat
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" className="active">🏠 Home</Link>
        <Link to="/cart">🛒 Cart ({cart.length})</Link>
        <Link to="/about">ℹ️ About</Link>
        <Link to="/contact">✉️ Contact</Link>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} theme={theme} toggleTheme={toggleTheme} />

      <div className="app-wrapper">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* DETAIL */}
          <Route
            path="/obat/:id"
            element={<DetailObat cart={cart} setCart={setCart} />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          {/* STATIC PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;