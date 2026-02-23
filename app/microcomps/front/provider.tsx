'use client';

import { Dispatch, createContext, ReactNode, useContext, useEffect, useReducer } from "react";

type InitialState = {
    search: string;
    filter: string[];
    headers: string[];
    list: any[];
    categories: string[];
    update: string;
    setListing: Dispatch<any>;
}

const initial = {
    search: '',
    filter: [],
    headers: [],
    list: [],
    categories: [],
    update: ''
}

const Provider = createContext<InitialState>({
    ...initial,
    setListing: () => {}
});

const ListingProvider = ({children}:{children:ReactNode}) => {
    const reducer = (state:any, action:any) => {
        const payload = action.payload;
        switch (action.type) {
            case 'update': 
            const {name, value} = payload;
            return {...state, [name]: value};
            default: 
            return {...state, ...action}
        }
    };

    const [listing, setListing] = useReducer(reducer, initial);

    const providerContext = Object.fromEntries(Object.entries(initial).map(([key, _]) => [key, listing[key]]));

    return (
        <Provider.Provider value={{...providerContext, setListing: setListing}}>
            {children}
        </Provider.Provider>
    ) 
};

const useProvider = () => {
    return useContext(Provider);
}

export {ListingProvider, useProvider, Provider};