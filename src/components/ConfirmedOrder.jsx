export default function ConfirmedOrder({ cartItems, orderTotal, setShowModal, onReset, setCartItems }) {
    // Merge duplicates just in case (same logic as in cart panel) so modal always shows consolidated quantities
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

    return (
        <div className="flex flex-col gap-4 w-5/6 mx-auto sm:max-w-[300px] sm:mx-2 p-5 sm:px-2 font-RedHat">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 16 16"><path fill="#1EA575" d="M8 15.333A7.333 7.333 0 1 1 8 .667a7.333 7.333 0 0 1 0 14.666Zm0-1.333A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"/><path fill="#1EA575" d="M7.333 10.667 4.667 8l.94-.94 1.726 1.72 3.06-3.06.94.947-4 4Z"/></svg>
            </div>
            <h2 className="font-bold text-4xl sm:text-2xl text-rose-900 sm:mx-2">Order Confirmed</h2>
            <p className="text-sm text-rose-500">We hope you enjoy your food!</p>
            <div className="flex flex-col w-full">
                <ul className="flex flex-col gap-3 bg-rose-100 rounded-xl w-full py-3 ">
                    {merged.map(item => (
                        <li key={item.name} className="flex flex-col gap-1 pb-2 mx-5 sm:mx-2
                        border-b last:border-b-0 border-rose-50">
                            <div className="w-full flex flex-row justify-between gap-3 relative">
                                <img src={item.image.thumbnail} alt={item.name} className="rounded-sm w-16 h-16 object-cover" />
                                <div className="flex flex-col my-1 flex-1">
                                    <span className="text-sm font-semibold text-rose-900">{item.name}</span>
                                    <div className="flex flex-row items-center gap-2 py-1">
                                        <span className="text-sm text-rose-500"><span className="text-red">{Number(item.quantity) || 0} x</span></span>
                                        <span className="text-sm text-rose-500">@ ${(Number(item.price) || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-rose-900 mt-6">${(((Number(item.price) || 0) * (Number(item.quantity) || 0))).toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-rose-900 ml-1">Order Total</span>
                <span className="text-lg font-bold text-rose-900">${orderTotal.toFixed(2)}</span>
            </div>
            <button
                onClick={() => {
                    setShowModal(false);
                    if (onReset) {
                        onReset();
                    } else if (setCartItems) {
                        setCartItems([]);
                    }
                }}
                className="w-full rounded-full bg-red text-white py-3 text-sm font-semibold hover:bg-red/90 transition"
            >
                Start New Order
            </button>
        </div>
    );
}
