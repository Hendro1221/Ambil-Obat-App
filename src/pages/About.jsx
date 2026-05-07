import { motion } from 'framer-motion';

function About() {
  return (
    <div className="container">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1>🏥 Apotek Berkah Sehat</h1>
        <p>Platform modern untuk menemukan obat dengan cepat, aman, dan terpercaya.</p>
      </motion.div>

      <div className="bento-grid" style={{ marginBottom: '2rem' }}>
        <div className="bento-card glass">
          <h2 className="section-title">Kualitas & Keamanan</h2>
          <p className="muted">
            Setiap produk ditampilkan dengan informasi harga, kategori, dan ketersediaan stok yang jelas.
          </p>
          <div className="divider-glow" />
          <div className="feature-row">
            <span className="chip">✅ Validasi Data</span>
            <span className="chip">🛡️ Transparan Stok</span>
          </div>
        </div>

        <div className="bento-card glass">
          <h2 className="section-title">Medical-Tech Experience</h2>
          <p className="muted">
            UI futuristik dengan micro-interactions, bento layout, dan tampilan premium untuk pengalaman belanja obat yang lebih nyaman.
          </p>
          <div className="divider-glow" />
          <div className="feature-row">
            <span className="chip">✨ Premium UI</span>
            <span className="chip">⚡ Cepat & Rapi</span>
          </div>
        </div>

        <div className="bento-card glass" style={{ gridColumn: 'span 2' }}>
          <h2 className="section-title">Trust Metrics</h2>
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-value">100%</div>
              <div className="metric-label">Transparansi Info</div>
            </div>
            <div className="metric">
              <div className="metric-value">24/7</div>
              <div className="metric-label">Akses Dashboard</div>
            </div>
            <div className="metric">
              <div className="metric-value">AI-ish</div>
              <div className="metric-label">Arah Rekomendasi</div>
            </div>
            <div className="metric">
              <div className="metric-value">Secure</div>
              <div className="metric-label">Trust-first Design</div>
            </div>
          </div>
        </div>

        <div className="bento-card glass" style={{ gridColumn: 'span 2' }}>
          <h2 className="section-title">Komitmen Layanan</h2>
          <ul className="feature-list">
            <li>🧠 Informasi obat yang mudah dipahami (kategori, harga, deskripsi).</li>
            <li>📦 Antarmuka keranjang dan checkout yang rapi.</li>
            <li>🧾 Admin dashboard untuk pengelolaan stok dan data obat.</li>
            <li>🌙 Dark mode elegan dengan aksen glows yang halus.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;




