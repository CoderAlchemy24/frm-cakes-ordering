import CartButton from "./CartButton";

export default function FoodMobile({ item, count = 0, onAdd, onIncrement, onDecrement }) {
    return (
        <div className="w-full max-w-full flex flex-col gap-2 font-RedHat">
            <div className="relative">
                <img
                    src={item.image.mobile}
                    alt={item.name}
                    className="object-cover w-full h-[212px] rounded-[8px]"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <CartButton
                        aria-label={`Add ${item.name} to cart`}
                        count={count}
                        onAdd={() => onAdd?.(item)}
                        onIncrement={() => onIncrement?.(item)}
                        onDecrement={() => onDecrement?.(item)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 pt-8 px-1">
                <p className="text-sm text-rose-500">{item.category}</p>
                <p className="text-lg text-rose-900 font-semibold">{item.name}</p>
                <p className="text-base text-red font-semibold">${item.price.toFixed(2)}</p>
            </div>
        </div>
    );
}