import { ADD_AGAIN, ADD_TO_CART, ERROR_DATA, FETCHING_DATA, LOADING_DATA, REMOVE_AGAIN } from "./actionTypes";

export const initialState = {
    items: [],
    loading: false,
    error: null,
    cart: [],

};


export const ProductReducer = (state, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCHING_DATA:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };
        case ERROR_DATA:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ADD_TO_CART:
            const itemToAdd = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.id === itemToAdd.id);
            if (existingItemIndex !== -1) {
                // Item already exists in cart, update its quantity
                const updatedCart = [...state.cart];
                const existingItem = updatedCart[existingItemIndex];
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + itemToAdd.quantity };
                updatedCart.splice(existingItemIndex, 1, updatedItem);
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                // Item does not exist in cart, add it
                return {
                    ...state,
                    cart: [...state.cart, itemToAdd]
                };
            }

        case ADD_AGAIN:
            const existingCartItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (existingCartItemIndex !== -1) {
                // Item already exists in cart, update its quantity
                const updatedCart = [...state.cart];
                const existingCartItem = updatedCart[existingCartItemIndex];
                const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
                updatedCart.splice(existingCartItemIndex, 1, updatedCartItem);
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                // Item does not exist in cart, add it
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                };
            }

        case REMOVE_AGAIN:
            const itemToRemove = action.payload;
            const removeItem = state.cart.findIndex(item => item.id === itemToRemove.id);

            if (removeItem !== -1) {
                const updatedCart = [...state.cart];
                const existingCartItem = updatedCart[removeItem];

                if (existingCartItem.quantity === 1) {
                    // Item quantity is 1, remove the item from the cart
                    updatedCart.splice(removeItem, 1);
                } else {
                    // Decrease the item quantity by 1
                    const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
                    updatedCart.splice(removeItem, 1, updatedCartItem);
                }

                return {
                    ...state,
                    cart: updatedCart
                };
            };
            break;

        case "CLEAR_ALL_FROM_CART":
            return {
                ...state,
                cart: []
            }

        default:
            return state;
    }
}