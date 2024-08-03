import cartManager from "./features/cart/cartManager.js";
import categoriesSuccess from "./features/categories.js";
import productSuccess from "./features/products.js";
import handelRemoteRequest,{getManyRequests,} from "./shares/api.js";
import {cateogriesContainer,
    loadingElement,
    mainElement,
    itemsElement,
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

export const uiHandlers = {
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
            itemsElement.html(`<div class="d-flex vh-100 justify-content-center align-items-center">
                <div class="alert alert-danger">${err.message}</div>
              </div>`);
              console.log("hamada");
        },
  
        () => {
            itemsElement.html(`<div class="d-flex vh-100 justify-content-center align-items-center">
                                <h3>Loading...<h3>
                            </div>`);
        }   
      );
    });
}

//Reminder: async function returns promise ... and u can use .then() on a promise
getManyRequests(uiHandlers,requestConfig).then( () => handelGetProductsByCategory());


const myCartManager = new cartManager();