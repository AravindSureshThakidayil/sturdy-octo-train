import React, { useState } from 'react';

export default function PharmacyPage() {
  const [stock, setStock] = useState([
    { id: 1, name: 'Paracetamol', quantity: 500, price: 5 },
    { id: 2, name: 'Amoxicillin', quantity: 200, price: 10 },
    { id: 3, name: 'Ibuprofen', quantity: 300, price: 7 },
    { id: 4, name: 'Omeprazole', quantity: 150, price: 15 },
  ]);

  const [purchases, setPurchases] = useState([
    { id: 1, medicines: [{ id: 1, name: 'Paracetamol', quantity: 50 }], totalPrice: 250, date: '2023-07-10' },
    { id: 2, medicines: [{ id: 2, name: 'Amoxicillin', quantity: 30 }], totalPrice: 300, date: '2023-07-11' },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (medicine) => {
    if (medicine.quantity > 0) {
      const existingItem = cart.find(item => item.id === medicine.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCart([...cart, { ...medicine, quantity: 1 }]);
      }
      setStock(stock.map(item => 
        item.id === medicine.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const removeFromCart = (medicineId) => {
    const existingItem = cart.find(item => item.id === medicineId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== medicineId));
    } else {
      setCart(cart.map(item => 
        item.id === medicineId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
    setStock(stock.map(item => 
      item.id === medicineId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const filteredStock = stock.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBill = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const completePurchase = () => {
    setShowPopup(true);
  };

  const confirmPurchase = () => {
    const newPurchase = {
      id: purchases.length + 1,
      medicines: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
      totalPrice: totalBill,
      date: purchaseDate
    };
    setPurchases([...purchases, newPurchase]);
    setCart([]);
    setShowPopup(false);
  };

  return (
    <div className="pharmacy-page">
      <h1>Pharmacy </h1>
      
      <div className="content">
        <div className="stock-section">
          <h2>Stock</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Remaining Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map(medicine => (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>
                    <span className={medicine.quantity <= 50 ? 'low-stock' : ''}>
                      {medicine.quantity}
                    </span>
                    {medicine.quantity <= 50 && <span className="warning">⚠️</span>}
                  </td>
                  <td>${medicine.price}</td>
                  <td>
                    <button 
                      onClick={() => addToCart(medicine)}
                      disabled={medicine.quantity === 0}
                      className="add-button"
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="billing-section">
          <h2>Billing</h2>
          <div className="cart">
            <h3>Cart</h3>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name} (x{item.quantity})</span>
                <div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => addToCart(item)}
                    disabled={stock.find(m => m.id === item.id).quantity === 0}
                    className="add-button"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-bill">Total: ${totalBill}</div>
          <div className="purchase-date">
            <span>📅</span>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>
          <button 
            onClick={completePurchase}
            disabled={cart.length === 0}
            className="complete-purchase-button"
          >
            🛒 Complete Purchase
          </button>
        </div>
      </div>

      <div className="purchase-history">
        <h2>Recent Purchases</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Medicines</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(purchase => (
              <tr key={purchase.id}>
                <td>{purchase.date}</td>
                <td>
                  {purchase.medicines.map((medicine, index) => (
                    <div key={medicine.id}>
                      {medicine.name} (x{medicine.quantity})
                      {index < purchase.medicines.length - 1 && ', '}
                    </div>
                  ))}
                </td>
                <td>${purchase.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirm Purchase</h2>
            <div className="popup-cart">
              {cart.map(item => (
                <div key={item.id} className="popup-cart-item">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="popup-total">Total: ${totalBill}</div>
            <div className="popup-buttons">
              <button onClick={confirmPurchase} className="confirm-button">Confirm</button>
              <button onClick={() => setShowPopup(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pharmacy-page {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
  padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          background: linear-gradient(to top left, rgba(47, 47, 119, .5), rgb(186, 26, 53, .5));
        color:white;
}

h2 {
  margin: 0;
          font-size: 24px;
          color:rgb(76, 139, 177)
}


        .content {
        //   display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .stock-section, .billing-section {
  flex: 1;
  min-width: 300px;
  background-color: rgb(252, 236, 243);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
        .search-bar {
          display: flex;
          margin-bottom: 15px;
        }

        .search-bar input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        
.search-button {
  padding: 8px 12px;
  background-color: rgb(76, 139, 177);
  color: white;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
}

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f3f4f6;
        }

        .low-stock {
          color: #ef4444;
          font-weight: bold;
        }

        .warning {
          color: #f59e0b;
          margin-left: 5px;
        }

        .add-button, .remove-button {
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

.add-button {
  background-color: #88C273;
  color: white;
}

.remove-button {
  background-color: #F95454;
  color: white;
  margin-right: 5px;
}


        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .total-bill {
          font-size: 1.2rem;
          font-weight: bold;
          margin: 15px 0;
        }

        .purchase-date {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .purchase-date input {
          margin-left: 10px;
          padding: 5px;
        }

.complete-purchase-button {
  width: 100%;
  padding: 10px;
  background-color: rgb(76, 139, 177);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

        .complete-purchase-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

      .purchase-history {
  margin-top: 20px;
  background-color: rgb(252, 236, 243);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .popup h2 {
          margin-bottom: 15px;
        }

        .popup-cart {
          margin-bottom: 15px;
        }

        .popup-cart-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }

        .popup-total {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .popup-buttons {
          display: flex;
          justify-content: space-between;
        }

        .confirm-button, .cancel-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .confirm-button {
          background-color: #10b981;
          color: white;
        }

        .cancel-button {
          background-color: #ef4444;
          color: white;
        }

        @media (max-width: 768px) {
          .content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}