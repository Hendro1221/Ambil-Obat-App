import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const getQty = (nama) => cart.filter(item => item.nama === nama).length;
  
  const updateQty = (nama, delta) => {
    const currentItems = cart.filter(item => item.nama === nama);
    const otherItems = cart.filter(item => item.nama !== nama);
    
    if (delta < 0) {
      // Remove one instance
      if (currentItems.length === 0) return;
      const newCurrent = currentItems.slice(1);
      setCart([...otherItems, ...newCurrent]);
    } else {
      // Add one instance
      const item = currentItems[0] || cart.find(item => item.nama === nama);
      if (!item) return;
      setCart([...cart, item]);
    }
  };

  const setQty = (nama, newQty) => {
    const otherItems = cart.filter(item => item.nama !== nama);
    const item = cart.find(item => item.nama === nama);
    const itemsToAdd = item ? Array(Math.max(0, newQty)).fill(item) : [];
    setCart([...otherItems, ...itemsToAdd]);
  };

  const removeItem = (nama) => {
    setCart(cart.filter(item => item.nama !== nama));
  };

  const totalHarga = cart.reduce((sum, item) => sum + (parseFloat(item.harga) || 0), 0);

  if (!cart) return <div className="container"><p>Loading cart...</p></div>;

  return (
    <div className="container">
      <motion.h1 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="page-title"
      >
        🛒 Keranjang Belanja ({cart.length})
      </motion.h1>

      {cart.length === 0 ? (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="empty-icon">🛒</div>
          <h2>Keranjang Kosong</h2>
          <p>Belum ada produk di keranjang Anda. Mulai belanja sekarang!</p>
          <Link to="/" className="button primary large">
            🏠 Lanjut Belanja
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="grid cart-grid">
            {[...new Set(cart.map(item => item.nama))].map((nama) => {
              const item = cart.find(i => i.nama === nama);
              const qty = getQty(nama);
              if (!item) return null;
              
              return (
                <motion.div 
                  className="card cart-item"
                  key={nama}
                  whileHover={{ y: -5 }}
                  layout
                >
                  <div className="cart-image">
                    <img
                      src={item.gambar ? `http://localhost:5000/${item.gambar}` : '/placeholder-medicine.png'}
                      alt={item.nama}
                      onError={(e) => {
                        e.target.src = '/placeholder-medicine.png';
                      }}
                    />
                  </div>
                  <div className="cart-details">
                    <h3>{item.nama}</h3>
                    <p className="kategori">{item.kategori || 'Obat Umum'}</p>
                    <p className="harga">Rp {parseFloat(item.harga || 0).toLocaleString()}</p>
                    <div className="quantity">
                      <button className="qty-btn" onClick={() => updateQty(nama, -1)} disabled={qty === 0}>-</button>
                      <input 
                        type="number" 
                        min="0" 
                        value={qty}
                        onChange={(e) => setQty(nama, parseInt(e.target.value) || 0)}
                        className="qty-input"
                      />
                      <button className="qty-btn" onClick={() => updateQty(nama, 1)}>+</button>
                    </div>
                    <button
                      className="button danger small"
                      onClick={() => removeItem(nama)}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            className="checkout-total"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="total-info">
              <span>Total ({cart.length} item):</span>
              <strong>Rp {totalHarga.toLocaleString()}</strong>
            </div>
            <Link to="/checkout" className="button primary large checkout-btn">
              💳 Checkout Sekarang
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Cart;

