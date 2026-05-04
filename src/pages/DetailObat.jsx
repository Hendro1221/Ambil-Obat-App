import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (gambarPath, namaObat) => {
  if (!gambarPath) {
    return `https://placehold.co/400x400/0D9488/white?text=${encodeURIComponent(namaObat || 'Obat')}`;
  }
  if (gambarPath.startsWith('http')) return gambarPath;
  if (gambarPath.startsWith('/')) return `${API_BASE_URL}${gambarPath}`;
  return `${API_BASE_URL}/${gambarPath}`;
};

function DetailObat({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obat, setObat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/obat/${id}`);
        if (!res.ok) throw new Error('Obat tidak ditemukan');
        const result = await res.json();
        const obatData = result.data || result;
        setObat(obatData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchObat();
  }, [id]);

  const changeQty = (delta) => {
    setQty(prev => Math.max(1, Math.min(prev + delta, obat?.stok || 99)));
  };

  const addToCart = () => {
    if (!obat || obat.stok === 0) return;
    const newItem = { ...obat, quantity: qty };
    setCart(prev => [...prev, newItem]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-state">
          <div className="skeleton-image" style={{ width: '280px', margin: '0 auto', borderRadius: '20px' }}></div>
          <div className="skeleton-text" style={{ width: '60%', margin: '1rem auto' }}></div>
          <div className="skeleton-text" style={{ width: '40%', margin: '0 auto' }}></div>
        </div>
      </div>
    );
  }

  if (error || !obat) {
    return (
      <div className="container">
        <div className="error-state">
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2>Obat Tidak Ditemukan</h2>
          <p>{error || 'Data obat tidak tersedia'}</p>
          <button className="button primary" onClick={() => navigate("/")}>← Kembali ke Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.button 
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ x: -4 }}
      >
        ← Kembali
      </motion.button>

      <motion.div 
        className="detail-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="detail-image-box">
          <motion.img
            src={getImageUrl(obat.gambar, obat.nama)}
            alt={obat.nama}
            className="detail-img"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              e.target.src = `https://placehold.co/400x400/0D9488/white?text=${encodeURIComponent(obat.nama)}`;
            }}
          />
          <div className="stok-badge">
            {obat.stok > 0 ? `✅ Stok ${obat.stok}` : '❌ Stok Habis'}
          </div>
        </div>

        <div className="detail-info">
          <h1>{obat.nama}</h1>
          
          <div className="detail-meta">
            <span className="meta-item">
              <strong>Kategori</strong>
              {obat.kategori || 'Obat Umum'}
            </span>
            <span className="meta-item">
              <strong>Status</strong>
              {obat.stok > 0 ? 'Tersedia' : 'Habis'}
            </span>
          </div>

          {obat.harga && obat.harga > 0 && (
            <div className="harga-display">
              <span className="harga">Rp {obat.harga.toLocaleString()}</span>
              <span className="per-piece">/ per pcs</span>
            </div>
          )}

          {obat.deskripsi && (
            <div className="detail-section">
              <h3>📝 Tentang Obat Ini</h3>
              <p>{obat.deskripsi}</p>
            </div>
          )}

          {obat.stok > 0 && (
            <>
              <div className="quantity-section">
                <span style={{ fontWeight: 600 }}>Jumlah:</span>
                <div className="quantity">
                  <button className="qty-btn" onClick={() => changeQty(-1)} disabled={qty <= 1}>−</button>
                  <span className="qty-display">{qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(1)} disabled={qty >= obat.stok}>+</button>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Maksimal {obat.stok} item</span>
              </div>

              <div className="action-buttons">
                <motion.button 
                  className="button success"
                  onClick={addToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {added ? '✅ Berhasil Ditambahkan!' : `🛒 Tambah ${qty > 1 ? `${qty}x ` : ''}ke Keranjang`}
                </motion.button>
                <button className="button secondary" onClick={() => navigate('/cart')}>
                  🛍️ Lihat Keranjang ({cart.length})
                </button>
              </div>
            </>
          )}

          {obat.stok === 0 && (
            <div className="action-buttons">
              <button className="button" disabled style={{ background: 'var(--gray-300)', cursor: 'not-allowed' }}>
                ❌ Stok Habis
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {added && (
        <motion.div 
          className="toast"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          ✅ {qty} {obat.nama} ditambahkan ke keranjang!
        </motion.div>
      )}
    </div>
  );
}

export default DetailObat;