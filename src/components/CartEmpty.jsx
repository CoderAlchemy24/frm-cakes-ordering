export default function CartEmpty(cartItems) {
    const num= cartItems.length
    return (
        <div className=" mx-2 my-6 text-red font-bold">
            <h2 className="text-2xl">Your Cart (0)</h2>
            <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" 
                className="w-full"/>
            <p className="text-lg text-center text-rose-500">Your added items will appear here</p>
        </div>
    )
}
