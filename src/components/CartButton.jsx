export default function CartButton({ count = 0, onAdd, onIncrement, onDecrement }) {
  if (count === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="cart-button w-[160px] h-[44px] flex items-center justify-center gap-2 
        rounded-full border border-rose-300 bg-white hover:border-red 
        hover:cursor-pointer transition-colors px-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20" className="shrink-0"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
        <span className="text-red font-RedHat text-sm font-semibold">Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="cart-button  h-[44px] w-[160px] bg-red text-white rounded-full flex items-center justify-between px-2">
  <button
        type="button"
        aria-label="Decrement"
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-white/20 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      </button>
      <span className="text-sm font-semibold font-RedHat">{count}</span>
  <button
        type="button"
        aria-label="Increment"
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center 
        rounded-full border border-white text-white text-red 
        hover:bg-white/20 transition "
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
      </button>
    </div>
  );
}