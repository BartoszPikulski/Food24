import React from 'react';
import { useProducts } from '../context/ProductProvider';
import { ADD_AGAIN, REMOVE_AGAIN } from '../state/ProductSate/actionTypes';
import buttonClickSound from '../assets/mixkit-on-or-off-light-switch-tap-2585.wav';

const OrderCard = ({ order }) => {
    const { dispatch } = useProducts();

    const handleAdd = () => {
        const audio = new Audio(buttonClickSound);
        audio.play();
        dispatch({ type: ADD_AGAIN, payload: order })
    }

    const handleRemove = () => {
        const audio = new Audio(buttonClickSound);
        audio.play();
        dispatch({ type: REMOVE_AGAIN, payload: order })
    }

    return (
        <div className='shadow-lg relative rounded-3xl border p-3 flex flex-col text-indigo-900'>
            <div className='rounded-full grid place-items-center absolute top-2 right-2 bg-indigo-500 text-white h-8 w-8 font-bold '>
                <p className="text-white"> {order?.quantity} </p>
            </div>
            <div className='h-52 w-52 mx-auto'>
                <img src={order?.image} alt={order?.image} />
            </div>
            <h1 className='font-bold text-center'>{order?.name}</h1>
            <p className='text-center font-semibold mb-3'>Price: {order?.price}$</p>
            <p className='text-center font-semibold mb-3'>
                {

                    (order?.description?.length > 100)
                        ?
                        order?.description?.slice(0, 90)
                        :
                        order?.description

                }
            </p>

            <button onClick={handleAdd} className='bg-indigo-500 rounded-full py-1 px-2 mb-2 flex-1 text-white text-bold'>
                Add Item
            </button>



            <button onClick={handleRemove} className='bg-rose-500 rounded-full py-1 px-2 flex-1 text-white text-bold'>
                Remove Item
            </button>

        </div>
    );
};

export default OrderCard;