// var products = null;
var products = JSON.parse(localStorage.getItem("Products") );

var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");

var updateContainer = document.getElementById("update-form");
var shadowbg = document.getElementById("shadow-bg");

//global variables/state
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

var searchInput=document.getElementById("search-input");


var createBtn = document.getElementById("create-btn");
var clearBtn = document.getElementById("clear-btn");

var productForm = document.getElementById("product-form");


class SubmitionData{
    #name;
    #category;
    #price;
    #description;

    constructor(name,category,price,description){
        this.#name=name;
        this.#category=category;
        this.#price=price;
        this.#description=description;
    }

    getName = function(){
        return this.#name;
    }
    getCategory = function(){
        return this.#category;
    }
    getPrice = function(){
        return this.#price;
    }
    getDescription = function(){
        return this.#description;
    }
    setName = function(name){
        this.#name=name;
    }
    setCategory = function(category){
        this.#category=category;
    }
    setPrice = function(price){
        this.#price=price;
    }
    setDescription = function(description){
        this.#description=description;
    }
}

updateContainer.onsubmit=function(event){
    event.preventDefault();

    if( prodName2.value!="" &&  prodCat2.value!="" &&  prodPrice2.value!="" &&  prodDesc2.value!=""){ 

        products[updateindex].name=prodName2.value;  
        products[updateindex].category=prodCat2.value;  
        products[updateindex].price=prodPrice2.value;  
        products[updateindex].description=prodDesc2.value;  
        handleRenderData();
        
        localStorage.setItem("Products",products);

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

    prodName2.value  = products[updateindex].getName();
    prodCat2.value   = products[updateindex].getCategory();
    prodPrice2.value = products[updateindex].getPrice();
    prodDesc2.value  = products[updateindex].getDescription();
}

function handleRenderData(){
    if(products && products.length != 0){
        // console.log("Products are available");
        productsContainer.classList.add("myd-block");
        productsContainer.classList.remove("d-none");
        warningMessage.classList.add("d-none");
        warningMessage.classList.remove("myd-block");

        var userDataContent = "";

        for(var i=0; i<products.length ; i++){
            userDataContent += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${products[i].getName()}</td>
                    <td>${products[i].getCategory()}</td>
                    <td>${products[i].getPrice()}</td>
                    <td>${products[i].getDescription()}</td>
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
        
        clearForm();
    }
    else{
        warningMessage.classList.replace("d-none", "myd-block");
        productsContainer.classList.add("d-none");
        productsContainer.classList.remove("myd-block");   
    }
}

function clearForm(){
    productForm.reset();
}


handleRenderData();


clearBtn.onclick = function(){
    clearForm();
}

productForm.onsubmit = function(event){
    event.preventDefault();
    if( prodName.value!="" &&  prodCat.value!="" &&  prodPrice.value!="" &&  prodDesc.value!=""){
        if(!products){
            products = [];
        }
        var product = new SubmitionData(prodName.value,
                                       prodCat.value,
                                       prodPrice.value,
                                       prodDesc.value
                                    );
    
        products.push(product);
        localStorage.setItem("Products", JSON.stringify(product) );
        handleRenderData();
    }
};
//when user clicks button add data to table



searchInput.onkeyup = function(event){
    var value= searchInput.value;
    var rows ="";
    var flag=0;
    for( var i=0 ; i<products.length ; i++){
        if(products[i].name.includes(value)){
            rows += `
            <tr>
                <th>${i + 1}</th>
                <td>${products[i].getName()}</td>
                <td>${products[i].getCategory()}</td>
                <td>${products[i].getPrice()}</td>
                <td>${products[i].getDescription()}</td>
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
        if(rows){
            tabelBody.innerHTML = rows;
            flag=1;
        }
    }
    if(flag==0){
        alert("No Results");
        handleRenderData();
        searchInput.value="";
    }
}


//element.insertBefore( (element_to_insert) , (choose_element_to_insert_before) )

//Restful API
//difference between PATCH and PUT

//SetTimeOut and setTimeInterval are also asynchronous
//so which is executed first from the following: 1) setTimeOut 2) setTimeInterval 3) Fetch?

// window.localStorage.setItem("Products: ",products);
// window.localStorage.getItem("Products");
// window.localStorage.removeItem("Products");
// window.localStorage.clear();