import { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getLocalStorage } from "../App";

export const AppContext = createContext(null);
export const localKey = "CartItems";


export default function AppProvider({children}){               
  const initialItems = getLocalStorage();
  

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(initialItems);
  const [isSidebarVisible, setIsSidebarVisible] = useState(0);
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const signUp = useCallback(
    (user, navigate) => {
      localStorage.setItem("auth", JSON.stringify(user));
      setUser(user);
      navigate("/home");
    },
    [user]
  );

  const logOut = useCallback(
    (navigate) => {
      localStorage.removeItem("auth");
      setUser(null);
      navigate("/home");
    },
    [user]
  );

  useEffect(() => {
    const authUser = localStorage.getItem("auth");
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  const valueObj = {
    user,
    signUp,
    logOut,
  };


    return (
          // provider here is a component that takes "value" as props
          <AppContext.Provider value={{ valueObj, isScrolled, setIsScrolled, cartItems, setCartItems, isCartMenuVisible, setIsCartMenuVisible, isSidebarVisible, setIsSidebarVisible}}> {children}</AppContext.Provider>
          // children here represents the App component <App/>
    )
}