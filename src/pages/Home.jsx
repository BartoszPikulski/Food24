import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from "../context/ProductProvider";

const Home = () => {
    const { state } = useProducts();
    const { items } = state;
    // console.log(items);

    return (
        <div className='max-w-7xl gap-14 mx-auto my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10'>
                {
                    items.map(product => <ProductCard product={product} key={product.id}></ProductCard>)
                }

            </div>
        </div>
    );
};

export default Home;