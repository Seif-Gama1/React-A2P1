import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoHeartCircle, IoSearchCircle } from "react-icons/io5";
import { TiArrowSync } from "react-icons/ti";

import { AppContext } from "../../../context/AppContext";
import { localKey, setLocalStorage } from "../../../App";
import useApiCallInitilaRender from "../../../hooks/useApiCall";

const buttonClassName = "w-[75%] mx-auto text-white z-10 py-1 bg-[#3e5067] absolute top-[53%] left-0 right-0 rounded hidden group-hover:block";
const iconClassName = "absolute hidden right-0 rounded-md hover:bg-[#3e5067]";

// export default function ProductList({products , setProducts, clickedCategory}) {
const ProductList = ({products , setProducts, clickedCategory}) => {
    // const [isClicked, setIsClicked] = useState(true);
    const { valueObj, cartItems, setCartItems} = useContext(AppContext);
    const {user} = valueObj;
    useApiCallInitilaRender("products", (data) => setProducts(data.products));
    
    useEffect(() => {
        if(clickedCategory){
            fetch(`https://dummyjson.com/products/category/${clickedCategory}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
            });    
        }
    }, [clickedCategory]);

    const handleAddProduct = useCallback((clickedItem) => {
        const tempCartProducts=[...cartItems];
        const existingItem = cartItems.find((item) => item.id==clickedItem.id)
        if(existingItem){
            if(existingItem.quantity<existingItem.stock){
                existingItem.quantity++;
                const tempCartProducts = cartItems.map(element => {
                    if (element.id === existingItem.id) {
                      return existingItem; 
                    }
                    return element; 
                });
                setCartItems(tempCartProducts);
                setLocalStorage(tempCartProducts);
            }
        }
        else{
            const updatedClickedItem = {...clickedItem, quantity : 1}
            
            tempCartProducts.push(updatedClickedItem);
            setCartItems(tempCartProducts);
            setLocalStorage(tempCartProducts);
        }
    },[cartItems]);

    return (
        <>
            {products ?  (products.map((item,index) => (
                <>
                    <div key={index} className="relative group flex justify-center mx-auto my-4 gap-4 w-full md:w-1/3 lg:w-[16%]">
                        <Link to={`/home/product-details/${item.id}`} key={index} className="relative w-full h-[320px]">
                            
                            <div className="relative w-full">
                                <img className="h-[200px] mx-auto " src={item.images[0]} alt={item.title} />
                                
                                <IoHeartCircle size={30} color="#bbbbbb" className={`${iconClassName} group-hover:block top-[25%]`} />
                                <IoSearchCircle size={30} color="#bbbbbb" className="absolute hidden group-hover:block top-[45%] right-0 rounded-md hover:bg-[#3e5067]" />
                                <TiArrowSync size={30} color="#bbbbbb" className="absolute hidden group-hover:block top-[65%] right-0 rounded-md hover:bg-[#3e5067]" />
                            </div>
                            
                            {item.rating > 4.5 ? 
                                <div className="flex mt-2 justify-center items-center text-yellow-500">
                                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                                </div>
                            :   <div className="flex mt-2 justify-center items-center text-yellow-500">
                                    <FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/>
                                </div>
                            }
                            
                            <h3 className="text-center text-[#777777]">{item.title}</h3>
                            <p className="text-center font-medium text-xl mt-1">${item.price}</p>

                        </Link>
                        {user && 
                            <button type="button" className={`${buttonClassName}`} 
                                onClick={ (event) => {
                                    handleAddProduct(item);
                                }}
                            >Add To Cart</button> }
                        
                    </div>
                </>
                ))) 
                : (<p className="text-gray-300 text-lg">Loading...</p>)
            }
        </>
    );
}

export default memo(ProductList);







    {/* <button type="button" className={buttonClassName} 
        onClick={ (event) => {
            handleClick(event);
            handleAddProduct(item);
        }}
    >Add To Cart</button> */}