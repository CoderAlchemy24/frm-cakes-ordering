

import React, { useState } from 'react';
import './App.css'
import data from './js/json/data.json'
import CartWithItems from './components/CartWithItems'
import CartEmpty from './components/CartEmpty'
import FoodMobile from './components/FoodMobile'
import FoodTablet from './components/FoodTablet';
import FoodDesktop from './components/FoodDesktop';




function App() {
  // cartItems: [{ name: string, quantity: number, price: number, image: {...}, category: string }]
  const [cartItems, setCartItems] = useState([]);

  const findItemIndex = (name) => cartItems.findIndex(ci => ci.name === name);

  const handleAdd = (item) => {
    if (!item || !item.name) return;
    setCartItems(prev => {
      const idx = findItemIndex(item.name);
      if (idx === -1) {
        const price = Number(item.price) || 0;
        return [...prev, { name: item.name, quantity: 1, price, image: item.image, category: item.category }];
      }
      return prev.map((ci, i) => i === idx ? { ...ci, quantity: (Number(ci.quantity) || 0) + 1 } : ci);
    });
  };

  const handleIncrement = (item) => {
    if (!item || !item.name) return;
    setCartItems(prev => {
      const idx = findItemIndex(item.name);
      if (idx === -1) {
        const price = Number(item.price) || 0;
        return [...prev, { name: item.name, quantity: 1, price, image: item.image, category: item.category }];
      }
      return prev.map(ci => ci.name === item.name ? { ...ci, quantity: (Number(ci.quantity) || 0) + 1 } : ci);
    });
  };

  const handleDecrement = (item) => {
    if (!item || !item.name) return;
    setCartItems(prev => {
      const exists = prev.some(ci => ci.name === item.name);
      if (!exists) return prev; // nothing to decrement
      return prev
        .map(ci => ci.name === item.name ? { ...ci, quantity: (Number(ci.quantity) || 0) - 1 } : ci)
        .filter(ci => (Number(ci.quantity) || 0) > 0);
    });
  };

  const getQuantity = (name) => {
    const found = cartItems.find(ci => ci.name === name);
    return found ? (Number(found.quantity) || 0) : 0;
  };

  const handleResetOrder = () => {
  
    setCartItems([])
    ;
  };

  return (
    <main className='flex flex-col lg:flex-row justify-center items-start gap-2
            mx-2 my-11 font-RedHat bg-white px-6 sm:px-1 '>
      <div className='m-0 p-0 w-full'>
        <h1 className="mt-0 mb-8 mx-2 font-bold text-3xl text-rose-900">Desserts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 place-content-center
                         gap-2 p-2 m-2 ">
          {data.map(item => {
            const name = item.name;
            const qty = getQuantity(name);
            const boundAdd = () => handleAdd(item);
            const boundInc = () => handleIncrement(item);
            const boundDec = () => handleDecrement(item);
            return (
              <div key={name} className="w-full">
                {/* Mobile */}
                <div className="block sm:hidden">
                  <FoodMobile
                    item={item}
                    count={qty}
                    onAdd={boundAdd}
                    onIncrement={boundInc}
                    onDecrement={boundDec}
                  />
                </div>
                {/* Tablet */}
                <div className="hidden sm:block lg:hidden">
                  <FoodTablet
                    item={item}
                    count={qty}
                    onAdd={boundAdd}
                    onIncrement={boundInc}
                    onDecrement={boundDec}
                  />
                </div>
                {/* Desktop */}
                <div className="hidden lg:block">
                  <FoodDesktop
                    item={item}
                    count={qty}
                    onAdd={boundAdd}
                    onIncrement={boundInc}
                    onDecrement={boundDec}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='sm:w-full md:w-3/4 lg:w-1/3 mx-auto my-2 p-2 h-fit sticky top-8'>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <CartWithItems
            cartItems={cartItems}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={(item) => setCartItems(prev => prev.filter(ci => ci.name !== item.name))}
            setCartItems={setCartItems}
            onReset={handleResetOrder}
          />
        )}
      </div>
    </main>
  );
}

export default App
