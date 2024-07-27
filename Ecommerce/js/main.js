import cartManager from "./features/cart/cartManager.js";
import categoriesSuccess from "./features/categories.js";
import productSuccess from "./features/products.js";
import handelRemoteRequest,{getManyRequests,} from "./shares/api.js";
import {cateogriesContainer,
    loadingElement,
    mainElement,
    itemsElement,
    categoriesElement,
    errorElement} from "./shares/ui/dom-element.js";

const requestConfig = [
    {
        endpoint: 'products',
        success: (data) => productSuccess(data)
    },
    {
        endpoint: 'products/categories',
        success: (data) => categoriesSuccess(data)
    },
];

const uiHandlers = {
    startLoading() {
        loadingElement.removeClass("d-none");
        loadingElement.addClass("d-flex");
    },
    error(err) {
        errorElement.removeClass("d-none");
        errorElement.addClass("d-flex");
        
        mainElement.removeClass("row");
        mainElement.addClass("d-none");
        
        errorElement.find(".alert").text(err.message);
    },
    stopLoading() {
        loadingElement.removeClass("d-flex");
        loadingElement.addClass("d-none");
    }
};

function handelGetProductsByCategory() {
    cateogriesContainer.children().on("click", (e) => {

      handelRemoteRequest(`products/category/${e.target.id}`,
  
        (data) => productSuccess(data),
  
        (err) => {
        itemsElement.html(`<div id="error" class="d-none vh-100 justify-content-center align-items-center">
                                <div class="alert alert-danger"></div>
                            </div>`);
        },
  
        () => {
          itemsElement.html(`<div class="d-flex vh-100 justify-content-center align-items-center">
                                <h3>Loading...<h3>
                            </div>`);
        }   
      );
    });
}

// function debounce(func, wait) {
//     let timeout;
//     return function(...args) {
//       const later = () => {
//         clearTimeout(timeout);
//         func(...args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
// }

//Reminder: async function returns promise ... and u can use .then() on a promise
getManyRequests(uiHandlers,requestConfig).then( () => handelGetProductsByCategory());


const myCartManager = new cartManager();

/*
itemsElement.on("click",(e) =>{
    if($(e.target).attr("data-product")){
        console.log(JSON.parse($(e.target).attr("data-product")));
    }
    // console.log(e.target);
});*/

//add item functionality with consideration for amount of stock available

//cart:
//1.static design for button click -> show menu
//initially if array products is empty -> print There no items added to the cart yet ( - ! - )
//2.UI logic [toggle cart sidebar]
//3.add product functionality

//4.when user add product: push the whole object into products array, 
//                         show length of array in span
//                         Loop array in case it's not empty and show products in cart sidebar
//                         user can increase the number of products if number of items is less than or equal to stock property of the product
//                         user can decrease the number of products if number of items is greater than 0

//5. get products by category