import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const API_BASE_URL = "http://localhost:5000";

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/obat`);
        if (!res.ok) throw new Error('Gagal memuat data');
        const result = await res.json();
        const obatData = result.data || (Array.isArray(result) ? result : []);
        setData(obatData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchObat();
  }, []);

  // HAPUS parameter 'namaObat' yang tidak digunakan
  const getImageUrl = (gambarPath) => {
    if (!gambarPath) {
      return 'https://cdn-icons-png.flaticon.com/512/3096/3096392.png';
    }
    if (gambarPath.startsWith('http')) {
      return gambarPath;
    }
    if (gambarPath.startsWith('/')) {
      return `${API_BASE_URL}${gambarPath}`;
    }
    return `${API_BASE_URL}/${gambarPath}`;
  };

  const filtered = data.filter((obat) => {
    const matchSearch = obat.nama?.toLowerCase().includes(search.toLowerCase()) ||
                       obat.kategori?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" ? true : filter === "tersedia" ? (obat.stok || 0) > 0 : (obat.stok || 0) === 0;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="container">
        <div className="hero">
          <h1>🏥 Apotek Berkah Sehat</h1>
          <p>Menyediakan obat-obatan lengkap dengan harga terjangkau</p>
        </div>
        <div className="grid">
          {[1,2,3,4,5,6].map((i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-image"></div>
              <div style={{ padding: '1rem' }}>
                <div className="skeleton-text" style={{ height: '20px', marginBottom: '0.5rem' }}></div>
                <div className="skeleton-text" style={{ height: '16px', width: '60%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="hero">
          <h1>🏥 Apotek Berkah Sehat</h1>
        </div>
        <div className="error-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔌</div>
          <h2>Server Belum Aktif</h2>
          <p>Pastikan backend berjalan di http://localhost:5000</p>
          <button className="button primary" onClick={() => window.location.reload()}>🔄 Refresh</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>🏥 Apotek Berkah Sehat</h1>
        <p>Menyediakan obat-obatan lengkap dengan harga terjangkau & pelayanan terbaik</p>
      </motion.div>

      <div className="controls-wrapper">
        <input
          className="search-box"
          placeholder="🔍 Cari obat atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">📋 Semua Obat</option>
          <option value="tersedia">🟢 Tersedia</option>
          <option value="habis">🔴 Habis</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '3rem' }}>🔍</div>
          <h3>Tidak Ada Hasil</h3>
          <p>Tidak ditemukan obat yang sesuai dengan pencarian Anda</p>
          <button className="button primary" onClick={() => {setSearch(''); setFilter('all');}}>Reset Filter</button>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((obat, index) => (
            <motion.div
              key={obat.id}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-image-wrapper">
                <img
                  src={getImageUrl(obat.gambar)}
                  alt={obat.nama}
                  className="card-img"
                  onError={(e) => {
                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3096/3096392.png';
                  }}
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <span className="kategori">{obat.kategori || 'Obat Umum'}</span>
                <h3>{obat.nama}</h3>
                {obat.harga && obat.harga > 0 && (
                  <div className="harga">
                    Rp {obat.harga.toLocaleString()}
                    <small> / pcs</small>
                  </div>
                )}
                {obat.deskripsi && (
                  <p className="detail">{obat.deskripsi.substring(0, 65)}...</p>
                )}
                <div className={`badge ${obat.stok > 0 ? "aman" : "habis"}`}>
                  {obat.stok > 0 ? `✅ Stok ${obat.stok}` : '❌ Stok Habis'}
                </div>
                <Link to={`/obat/${obat.id}`} className="button primary">
                  👀 Lihat Detail
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;