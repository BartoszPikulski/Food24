import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { db } from "../Firebase/firebase.config";
import { ProductReducer, initialState } from "../state/ProductSate/ProductReducer";
import { ERROR_DATA, FETCHING_DATA, LOADING_DATA } from "../state/ProductSate/actionTypes";

const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const firebaseData = async () => {
        dispatch({ type: LOADING_DATA });
        try {
            const collectionRef = collection(db, "1");
            const docSnap = await getDocs(collectionRef);

            let products = [];
            docSnap.docs.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id, quantity: 1 });
            });

            dispatch({ type: FETCHING_DATA, payload: products });
        } catch (error) {
            dispatch({ type: ERROR_DATA, error });
        }
    };

    useEffect(() => {
        firebaseData();
    }, []);

    const value = {
        state, dispatch
    }

    return (
        <PRODUCT_CONTEXT.Provider value={value}>{children}</PRODUCT_CONTEXT.Provider>
    )
};

export const useProducts = () => {
    const context = useContext(PRODUCT_CONTEXT);
    return context;
}


export default ProductProvider;