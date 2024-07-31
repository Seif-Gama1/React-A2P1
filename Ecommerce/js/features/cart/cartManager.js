import { cartBtn, cartCloseBtn, cartElement, cartList, descriptionElement, itemsCount, itemsElement } from "../../shares/ui/dom-element.js";
import cartItem from "./cartItem.js";

var clickedItem_ID, clickedItem_Category;

export default class cartManager{
    #cartItems;
    static localStorageKey = "cartItems";

    constructor(){
        const localStorageSavedItems = JSON.parse(localStorage.getItem(cartManager.localStorageKey)) || []; 
        //now localStorageSavedItems holds JS object and not array of cartItem
        console.log(localStorageSavedItems);
        
        this.#cartItems = localStorageSavedItems.map((item) => 
            cartItem.formToCartItemInstance(item)
        );

        this.#handleToggleCart();
        this.#handleRender();
        this.#addProductToCart();
        this.#updateCartItem();
    }

    getCartList = function(){
        return this.#cartItems;
    }

    #handleToggleCart = function (){
        cartBtn.on("click",
            () => cartElement.css("right","0px")
        );
        cartCloseBtn.on("click",
            () => cartElement.css("right","-100%")
        );
    };

    #handleRender = function(){
        this.#updateLocalStorage();
        
        if( this.#cartItems.length === 0){ //if cart is empty display
            cartList.html(
                `<div class="h-100 d-flex justify-content-center align-items-center">
                    <p class="fs-2 text-danger"> There are no items yet! </p>
                </div>`
            );
            itemsCount.html('0');
        }else{
            cartList.html(
                this.#cartItems.map((item,index) => item.renderElement()).join("")  
            );
            itemsCount.html(`${(this.#cartItems).length}`);
        }
    };

    #addProductToCart = function(){
       
        itemsElement.on("click", (e) =>{
            if($(e.target).attr("data-product")){
                const productData = JSON.parse($(e.target).attr("data-product"));
                
                const existingItem = this.#cartItems.find((item) => item.id==productData.id)
                
                if(existingItem){
                    existingItem.increase();
                }else{
                    const myCartItem = new cartItem(
                        productData.title,productData.id,
                        productData.image,productData.price,
                        productData.stock,
                    );
                    this.#cartItems.push(myCartItem);
                }
                this.#handleRender();
            }else{
                if ($(e.target).attr("data-item-test")){
                    const clickedItem = JSON.parse($(e.target).attr("data-item-test"));
                    clickedItem_ID = clickedItem.id;
                    clickedItem_Category = clickedItem.category;
                    localStorage.setItem("clickedItem_ID", clickedItem_ID);
                    localStorage.setItem("clickedItem_Category", clickedItem_Category);
                }
                else if($(e.target).parent().attr("data-item-test")){
                    const clickedItem = JSON.parse($(e.target).parent().attr("data-item-test"));
                    clickedItem_ID = clickedItem.id;
                    clickedItem_Category = clickedItem.category;
                    localStorage.setItem("clickedItem_ID", clickedItem_ID);
                    localStorage.setItem("clickedItem_Category", clickedItem_Category);
                }
                window.location.assign("../../../new.html");
            }
        });

    descriptionElement.on("click", (e) =>{
        if($(e.target).attr("data-product2")){
            const productData = JSON.parse($(e.target).attr("data-product2"));
            
            const existingItem = this.#cartItems.find((item) => item.id==productData.id)
            
            if(existingItem){
                existingItem.increase();
            }else{
                const myCartItem = new cartItem(
                    productData.title,productData.id,
                    productData.image,productData.price,
                    productData.stock,
                );
                console.log("created new cartItem object")
                this.#cartItems.push(myCartItem);
            }
            this.#handleRender();
        }
      });
    }

    #updateLocalStorage = function(){
        localStorage.setItem(cartManager.localStorageKey, JSON.stringify(this.#cartItems));
    }
    #updateCartItem = function(){
        cartList.on("click",(e) => {

            const element = $(e.target);
            const action = $(e.target).attr("data-action");
            var updatedCartList;

            switch(action){
                case "remove":
                    updatedCartList = this.#cartItems.filter((item) =>
                        item.id !==Number(element.attr("id"))
                    );
                    this.#cartItems = updatedCartList;
                    this.#updateLocalStorage();
                    this.#handleRender();
                break;

                case "increase":
                    var updatedItem = this.#cartItems.find(
                        (item) => item.id === Number(element.attr("id"))
                    );
                    if(updatedItem){
                        updatedItem.increase();
                        this.#updateLocalStorage();
                        this.#handleRender();
                    }
                break;

                case "decrease":
                    var updatedItem = this.#cartItems.find(
                        (item) => item.id === Number(element.attr("id"))
                    );
                    if(updatedItem){
                        updatedItem.decrease();
                        this.#updateLocalStorage();
                        this.#handleRender();
                    }
                break;

                default:
                    console.log("Invalid action");
            }
        });
    }
}