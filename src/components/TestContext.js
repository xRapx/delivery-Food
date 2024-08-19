"use client"

import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext({})

export function AppProviderTest({children}) {

	const [cart, setCart] = useState([])

	const ls = typeof window !== "undefined" ? window.localStorage : null

	// save cart data to localStorage
	function saveDataToLocal () {
		if(ls) {
			ls.setItem("cart" , JSON.stringify(cart))
		}
	}

	// check cart data update
	useEffect(() => {
		saveDataToLocal(cart)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[cart])

	// get data from localStorage
	useEffect(() => {
		if(ls && ls.getItem("cart")){
			setCart(JSON.parse(ls.getItem("cart")))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	// clear data from localStorage
	function clearCart () {
		setCart([])
		saveDataToLocal([])
	}

	// add cart from localStorage
	function addCart(product) {
		setCart((prev) => {
			const cartProduct = {...product};
			const newProduct = [...prev , cartProduct]
			saveDataToLocal(newProduct)
			return newProduct
		})
	}


	const actionCart =  {
		cart, 
		setCart,
		clearCart,
		addCart
	}

	return (
		<SessionProvider>
			<AppContext.Provider value={actionCart}>
				{children}
			</AppContext.Provider>
		</SessionProvider>
	)
}