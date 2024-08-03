import {itemsElement, singleProductImage, descriptionElement, nextBtn, backBtn, reviewsElement, similarProductsElement} from "../shares/ui/dom-element.js";
import cartManager from "./cart/cartManager.js";

const myCartManager = new cartManager();

var productsToDisplay;

const productSuccess = function(data){ //success
    itemsElement.html(
        (data.products).map((item,index) => {
            return`<div class="col-12 col-lg-4 ">
                        <div class="border shadow rounded-2 product-item-container">
                            <div class="product-item">
                                <img src="${item.images[0]}" alt="${item.title}" data-item-test='${JSON.stringify({
                                id: item.id,
                                category: item.category,
                            })}'>
                                <h3 class="text-center" data-item-test='${JSON.stringify({
                                id: item.id,
                                category: item.category,
                            })}'>${item.title}</h3>
                                <p class=" overflow-auto " style="height:100px;">${item.description}</p>

                                <div class="d-flex g-1 mt-3 rating-style">
                                    <p class="text-black">${item.rating}</p>
                                    <i class="fa-solid fa-star mt-1 me-2"></i>
                                </div>

                                <div class="d-flex justify-content-between cost-style">
                                    <p class="me-3 mt-2">$${item.price}</p>
                                    <button class="m-3 mt-2 bg-danger" data-product='${JSON.stringify({
                                        id: item.id,
                                        title: item.title,
                                        image: item.thumbnail,
                                        price: item.price,
                                        stock: item.stock,
                                    })}'>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>` 
        }).join("")
    );
}

export const productSuccess2 = function (data){
    var clickedItem_ID = localStorage.getItem("clickedItem_ID");
    similarProductsElement.html(
        (data.products).map((item,index) => {
            if(item.id != clickedItem_ID){
                return`<div class="col-12 col-lg-3 ">
                <div class="border shadow rounded-2 product-item-container">
                    <div class="product-item">
                        <img src="${item.images[0]}" alt="${item.title}" data-item-test2='${JSON.stringify({
                        id: item.id,
                        category: item.category,
                    })}'>
                        <h3 class="text-center" data-item-test2='${JSON.stringify({
                        id: item.id,
                        category: item.category,
                    })}'>${item.title}</h3>
                        <p class=" overflow-auto " style="height:100px;">${item.description}</p>

                        <div class="d-flex g-1 mt-3 rating-style">
                            <p class="text-black">${item.rating}</p>
                            <i class="fa-solid fa-star mt-1 me-2"></i>
                        </div>

                        <div class="d-flex justify-content-between cost-style">
                            <p class="me-3 mt-2">$${item.price}</p>
                        </div>
                     </div>
                    </div>
                </div>` 
            }
        }).join("")
    );
}

export const singleProductSuccess = function(data){
    singleProductImage.html(
        (data.images).map((item,index) => {
        if(item == data.images[0]){
            return `<div class="carousel-item active">
                        <img class="d-block w-100" style="height:350px;" src="${item}" alt="${data.title}">
                    </div>`
        }else{
            return `<div class="carousel-item">
                        <img class="d-block w-100" style="height:350px;" src="${item}" alt="${data.title}">
                    </div>`   
        }
        }).join("")
    );
    if(data.images[1]){
        nextBtn.removeClass("d-none");
        backBtn.removeClass("d-none");
    }
    descriptionElement.html(
        `   <h2>${data.title}</h2><br>
            <p>${data.description}</p>
            
            <div class="d-flex g-1 mt-4 rating-style">
                <p class="text-black">${data.rating}</p>
                <i class="fa-solid fa-star mt-1 me-2"></i>
            </div>
            <div class="d-flex">
                <img src="https://f.nooncdn.com/mpcms/EN0001/assets/80299f90-dd89-4c69-a3d3-19c884d5fc05.png" style="width:5%;">
                <p class="ms-2 mt-3">Only ${data.stock} left in stock</p>
            </div>
            <div class="d-flex justify-content-start cost-style">
                <p class="me-3 mt-2">$${data.price}</p>
                <button class="m-3 mt-2 bg-danger" data-product2='${JSON.stringify({
                    id: data.id,
                    title: data.title,
                    image: data.thumbnail,
                    price: data.price,
                    stock: data.stock,
                })}'>Add to Cart</button>
            </div>
        `
    );
    reviewsElement.html(
        
        (data.reviews).map((item,index) => {
            return `
                <div class="m-3">

                    <div class="d-flex">
                        <h4 class="mb-0">${item.reviewerName}</h4>
                        <div class="d-flex g-1 ms-2 mt-1 rating-style">
                            <i class="fa-solid fa-star mt-1"></i>    
                            <p class="ms-2">${item.rating}</p>
                        </div>
                    </div>

                    <p class="text-black-50">${item.reviewerEmail}</p>
                    
                    <div class="comment-styling">
                        <p>${item.comment}</p>
                    </div>

                </div>`
        }).join("")
    );
}


export default productSuccess;