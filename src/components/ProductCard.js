import React from "react";
import { toast } from "react-hot-toast";
import { useLocation } from 'react-router-dom';
import buttonClickSound from '../assets/mixkit-on-or-off-light-switch-tap-2585.wav';
import { useProducts } from "../context/ProductProvider";
import { ADD_TO_CART } from "../state/ProductSate/actionTypes";

const ProductCard = ({ product }) => {

    const {dispatch } = useProducts();

    const handleOrder = (id) => {
        dispatch({ type: ADD_TO_CART, payload: product });

        // Play the click sound
        const audio = new Audio(buttonClickSound);
        audio.play();
        toast.success('ADD TO CART');
    }

    const { pathname } = useLocation();


    return (
        <div className='shadow-lg relative rounded-3xl border p-3 flex flex-col text-indigo-900'>
            {pathname.includes("cart") && (
                <div className='rounded-full grid place-items-center absolute top-2 right-2 bg-indigo-500 text-white h-8 w-8 font-bold '>
                    <p className="text-black"> {product?.quantity} </p>
                </div>
            )}
            <div className='h-52 w-52 mx-auto'>
                <img src={product?.image} alt={product?.image} />
            </div>
            <h1 className='font-bold text-center'>{product?.name}</h1>
            <p className='text-center font-semibold mb-3'>Price: {product?.price}$</p>
            <p className='text-center font-semibold mb-3'>
                {

                    (product?.description?.length > 100)
                        ?
                        product?.description?.slice(0, 90)
                        :
                        product?.description

                }


            </p>

            {!pathname.includes("cart") && (
                <div className='flex gap-2 mt-5'>
                    <button onClick={handleOrder} className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'>
                        Order Now
                    </button>
                </div>
            )}



        </div>
    );
};

export default ProductCard;