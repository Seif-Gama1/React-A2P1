import {itemsElement,} from "../shares/ui/dom-element.js";
    
const productSuccess = function(data){ //success
    // console.log(data);
    itemsElement.html(
        (data.products).map((item,index) => {
            return`<div class="col-12 col-lg-4 ">
                        <div class="border shadow rounded-2 product-item-container">
                            <div class="product-item">
                                <img src="${item.images[0]}" alt="${item.title}">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>

                                <div class="d-flex g-1 mt-3 ms-3 rating-style">
                                    <i class="fa-solid fa-star mt-2 me-2"></i>
                                    <p class="text-danger">${item.rating}</p>
                                </div>

                                <div class="d-flex justify-content-between cost-style">
                                    <p class="m-3 mt-2">$${item.price}</p>
                                    <button class="m-3 mt-2 bg-danger" data-product='${JSON.stringify({
                                        id: item.id,
                                        title: item.title,
                                        image: item.images[0],
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

export default productSuccess;