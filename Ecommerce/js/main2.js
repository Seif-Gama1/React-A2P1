import cartManager from "./features/cart/cartManager.js";
import { productSuccess2, singleProductSuccess } from "./features/products.js";
import { getData, getManyRequests } from "./shares/api.js";
import { errorElement2, loadingElement2, singleProductImage, } from "./shares/ui/dom-element.js";

const myCartManager = new cartManager();

var clickedItem_ID = localStorage.getItem("clickedItem_ID");
var clickedItem_Category = localStorage.getItem("clickedItem_Category");

var requestConfig = [
    {
        endpoint: `products/${clickedItem_ID}`,
        // endpoint: `products/130`,
        success: (data) => singleProductSuccess(data)
    },
    {
        endpoint: `products/category/${clickedItem_Category}`,
        success: (data) => productSuccess2(data)
    }
]

const uiHandlers = {
    startLoading() {
        loadingElement2.removeClass("d-none");
        loadingElement2.addClass("d-flex");
    },
    error(err) {
        errorElement2.removeClass("d-none");
        errorElement2.addClass("d-flex");
        
        singleProductImage.addClass("d-none");
        
        errorElement2.find(".alert").text(err.message);
    },
    stopLoading() {
        loadingElement2.removeClass("d-flex");
        loadingElement2.addClass("d-none");

        singleProductImage.removeClass("d-none");
    }
};
getManyRequests(uiHandlers,requestConfig);

// getManyRequests(uiHandlers,requestConfig).then( () => handelGetProductsByCategory());
