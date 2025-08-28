import React, { useState, useEffect } from 'react';
import ConfirmedOrder from './ConfirmedOrder'

export default function CartWithItems({ cartItems, onIncrement, onDecrement, onRemove, setCartItems, onReset }) {
    const [showModal, setShowModal] = useState(false);
    // Merge duplicates (same name) defensively in case state tartalmaz régi duplikált objektumokat
    const merged = Object.values(
        cartItems.reduce((acc, item) => {
            const name = item?.name || "";
            if (!name) return acc;
            const qty = Number(item.quantity) || 0;
            if (!acc[name]) {
                acc[name] = { ...item, quantity: qty };
            } else {
                acc[name].quantity += qty;
            }
            return acc;
        }, {})
    );

    const orderTotal = merged.reduce((sum, i) => {
        const price = Number(i.price) || 0;
        const qty = Number(i.quantity) || 0;
        return sum + price * qty;
    }, 0);
    const totalQuantity = merged.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);

    
    useEffect(() => {
        if (showModal) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [showModal]);

    useEffect(() => {
        if (showModal && cartItems.length === 0) {
            setShowModal(false);
        }
    }, [cartItems, showModal]);

    return (<>
        <div className="flex flex-col gap-2 mx-auto w-full">
            <h2 className="text-xl font-bold text-red">Your Cart ({totalQuantity})</h2>
            <ul className="flex flex-col gap-3">
                {merged.map(item => (
                    <li key={item.name} className="flex flex-col gap-1 border-b border-rose-100 pb-2 last:border-b-0">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-md font-semibold text-rose-900">{item.name}</span>
                                <div className="flex flex-row align-middle gap-1">
                                  <span className="text-md text-rose-500">{Number(item.quantity) || 0} x 
                                    <span className="text-rose-300 font-medium"> @ ${(Number(item.price) || 0).toFixed(2)}</span></span>
                                  <span className="text-md font-normal text-rose-500">${(((Number(item.price) || 0) * (Number(item.quantity) || 0))).toFixed(2)}</span>
                                </div>
                            </div>
                            <span className="text-md font-semibold text-rose-900">${(((Number(item.price) || 0) * (Number(item.quantity) || 0))).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           
                            <button onClick={() => onRemove(item)} className="ml-auto text-xs text-red rounded-full border-1 border-rose-300 p-1 hover:cursor-pointer" aria-label="Remove item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-rose-500">Order Total</span>
                <span className="text-lg font-bold text-rose-900">${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-rose-900 text-xs align-middle justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#1EA575" d="M8 15.333A7.333 7.333 0 1 1 8 .667a7.333 7.333 0 0 1 0 14.666Zm0-1.333A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"/><path fill="#1EA575" d="M7.333 10.667 4.667 8l.94-.94 1.726 1.72 3.06-3.06.94.947-4 4Z"/></svg>
                <span>This is a carbon-neutral delivery</span>
            </div>
           <button  onClick={() => setShowModal(true)} 
                className="w-full rounded-full bg-red text-white py-3 text-sm font-semibold 
                hover:cursor-pointer hover:bg-red/90 transition">
                    Confirm Order</button>
        </div>
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-24">
                
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
                <div
                    className="relative z-10 w-full max-w-[600px] rounded-xl bg-white shadow-xl p-0 animate-fade-in max-h-[85vh] flex flex-col"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Order confirmation"
                >
                    <div className="overflow-y-auto px-6 pt-6 pb-4 custom-scroll flex-1 ">
                        <ConfirmedOrder
                            cartItems={cartItems}
                            orderTotal={orderTotal}
                            setShowModal={setShowModal}
                            setCartItems={setCartItems}
                            onReset={onReset}
                        />
                    </div>
                  
                </div>
            </div>
        )}
          </>
    );

}