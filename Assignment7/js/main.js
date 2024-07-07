var products = null;

var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");

var updateContainer = document.getElementById("update-form");
var shadowbg = document.getElementById("shadow-bg");

//global variable
var updateindex;


//get data
var prodName = document.getElementById("product_name");
var prodCat = document.getElementById("product_category");
var prodPrice = document.getElementById("product_price");
var prodDesc = document.getElementById("prodct_desc");


//get update data
var prodName2 = document.getElementById("product_name2");
var prodCat2 = document.getElementById("product_category2");
var prodPrice2 = document.getElementById("product_price2");
var prodDesc2 = document.getElementById("prodct_desc2");


// prodName.value="";  
// prodCat.value="";
// prodPrice.value="";  
// prodDesc.value="";

var createBtn = document.getElementById("create-btn");
var clearBtn = document.getElementById("clear-btn");

var productForm = document.getElementById("product-form");


updateContainer.onsubmit=function(event){
    event.preventDefault();

    if( prodName2.value!="" &&  prodCat2.value!="" &&  prodPrice2.value!="" &&  prodDesc2.value!=""){ 

        products[updateindex].name=prodName2.value;  
        products[updateindex].category=prodCat2.value;  
        products[updateindex].price=prodPrice2.value;  
        products[updateindex].description=prodDesc2.value;  
        handleRenderData();

        updateContainer.classList.remove("d-block");
        updateContainer.classList.add("d-none");

        shadowbg.classList.add("d-none");
        shadowbg.classList.remove("d-block");
    }
}


function deleteProduct(index) {
    products.splice(index, 1);
    handleRenderData();
}


function updateForm(index){
    updateContainer.classList.remove("d-none");
    updateContainer.classList.add("d-block");
    shadowbg.classList.remove("d-none");
    shadowbg.classList.add("d-block");
    updateindex=index;

    prodName2.value = products[updateindex].name;
    prodCat2.value=products[updateindex].category;
    prodPrice2.value=products[updateindex].price;
    prodDesc2.value=products[updateindex].description;
}

function handleRenderData(){
    if(products && products.length != 0){
        console.log("Products are available");
        productsContainer.classList.add("myd-block");
        productsContainer.classList.remove("d-none");
        warningMessage.classList.add("d-none");
        warningMessage.classList.remove("myd-block");

        var userDataContent = "";

        for(var i=0; i<products.length ; i++){
            userDataContent += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${products[i].name}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].description}</td>
                    <td>
                        <button id="update-${i}" class="btn btn-outline-success" onclick="updateForm(${i})">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button id="delete-${i}" class="btn btn-outline-danger" onclick="deleteProduct(${i})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr> 
            `;
        }
        tabelBody.innerHTML = userDataContent;
        prodName.value="";  
        prodCat.value="";
        prodPrice.value="";  
        prodDesc.value="";
    }
    else{
        warningMessage.classList.remove("d-none");
        warningMessage.classList.add("myd-block");
        productsContainer.classList.add("d-none");
        productsContainer.classList.remove("myd-block");   
    }
}



handleRenderData();


clearBtn.onclick = function(){
    prodName.value="";  
    prodCat.value="";
    prodPrice.value="";  
    prodDesc.value="";
}

productForm.onsubmit = function(event){
    event.preventDefault();
    if( prodName.value!="" &&  prodCat.value!="" &&  prodPrice.value!="" &&  prodDesc.value!=""){
        if(!products){
            products = [];
        }
            
        var product= {
            name:prodName.value,
            category: prodCat.value,
            price: prodPrice.value,
            description:prodDesc.value
        };

        products.push(product);
        handleRenderData();
    }
};
//when user clicks button add data to table