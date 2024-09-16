import { memo, useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { IoIosArrowRoundDown, IoIosArrowRoundUp, IoIosClose } from "react-icons/io";
import { setLocalStorage } from "../../../App";


// export default function Cart (){
// export default function Cart (){
const Cart = () => {
    const { isScrolled, cartItems, setCartItems, isCartMenuVisible, setIsCartMenuVisible } = useContext(AppContext);
    
    const handleXClick = () => {
        setIsCartMenuVisible(0);
    }
    
    const increaseQuantity = (itemToIncrease) => {
        if(itemToIncrease.quantity < itemToIncrease.stock){
            const updatedCartItems = cartItems.map(item => {
                if (item.id === itemToIncrease.id) {
                    item.quantity++;
                }
                return item;
            });
            setCartItems(updatedCartItems);
            setLocalStorage(updatedCartItems);        // Update Local Storage
        }
    };

    const decreaseQuantity = (itemToDecrease) => {
        if(itemToDecrease.quantity >= 2){
            const updatedCartItems = cartItems.map(item => {
            if (item.id === itemToDecrease.id) {
                item.quantity--;
            }
            return item;
            });
            setCartItems(updatedCartItems);
            setLocalStorage(updatedCartItems);        // Update Local Storage
        }
    };

    const handleDelete = (itemToDelete) => {
        const updatedCartList = cartItems.filter((item) =>
            item.id !== itemToDelete.id
        );
        setCartItems(updatedCartList);
        setLocalStorage(updatedCartList);        // Update Local Storage
    };

    return(
      <>
        { isCartMenuVisible ? (
            <aside className={`fixed z-20 right-0  overflow-y-auto bg-[#F8F0E3] shadow rounded-[5px] p-2 w-[60%] md:w-1/3 lg:w-1/4 ${isScrolled ? 'top-[9%] h-[91%]' : 'top-[18%] h-[82%]' }`}>   
                
                <IoIosCloseCircle size={22} onClick={handleXClick}/>
                <div className="cart-items-container flex flex-col flex-grow">
                    {cartItems ?  (cartItems.map((item,index) => (
                        <div key={index} className="shadow rounded-[5px] w-[90%] mx-auto flex">
                            <div>
                                <IoIosClose className="cursor-pointer" size={24} onClick={() => handleDelete(item)}/>
                            </div>
                            <div className="w-[30%]">
                                <img src={item.images} alt={item.title} className="w-full"/>
                            </div>
                            <div className="mt-2">
                                <h3 >{item.title}</h3>
                                <p className="mt-2">Price: {item.quantity} x {item.price} : {(item.quantity*item.price).toFixed(2)} </p>
                            </div>
                            <div className="mt-5 ">
                                <IoIosArrowRoundUp className="cursor-pointer hover:text-blue-900" size={30} onClick={() => increaseQuantity(item)}/>
                                <IoIosArrowRoundDown className="cursor-pointer hover:text-blue-900" size={30} onClick={() => decreaseQuantity(item)}/>
                            </div>
                        </div>
                    ))) 
                    :
                        (<p className="text-red-600">Cart Is Empty</p>)
                    }         
                </div>      
            </aside>
            )
            :
            (<p></p>)
        }
      </>  
    )
}

export default memo(Cart);