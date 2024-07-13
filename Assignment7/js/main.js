// var products = null;

//Initially window.localStorage is empy so we put products =Null
var products = JSON.parse(localStorage.getItem("Products") );

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

var searchInput=document.getElementById("search-input");



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

    prodName2.value = products[updateindex].name;
    prodCat2.value=products[updateindex].category;
    prodPrice2.value=products[updateindex].price;
    prodDesc2.value=products[updateindex].description;
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
        
        clearForm();
    }
    else{
        warningMessage.classList.remove("d-none");
        warningMessage.classList.add("myd-block");
        productsContainer.classList.add("d-none");
        productsContainer.classList.remove("myd-block");   
    }
}

function clearForm(){
    // prodName.value="";  
    // prodCat.value="";
    // prodPrice.value="";  
    // prodDesc.value="";
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
            
        var product= {
            name:prodName.value,
            category: prodCat.value,
            price: prodPrice.value,
            description:prodDesc.value
        };
        
        products.push(product);
        localStorage.setItem("Products", JSON.stringify(products) );
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


//adding styling in .js file has same power as inline styling

//querySelector("#parent") -> used if parent is an id

//element.classList.add("container");
//element.classList.remove("parent");
//element.classList.replace("container","parent");

//element.style.setProperty("background-color","#0ac");
//element.className = "parent section";

//element.getAttribute("class");
//element.setAttribute("id","gallery");


// var tableRow = document.createElement("tr"); 
// var tableRow = document.createElement("h1"); 

//element.insertBefore( (element_to_insert) , (element_to_be_inserted_before_this) )
//element.before

//Js is event driven


//Restful API
//difference between PATCH and PUT

//Js is single threaded and non-blocking
/*so if fetch(Asynchronous code -> they go to webAPI section instead of stack ... so it's executed after stack is clear) 
  blocks the thread while waiting for repsonse */
//Js leaves this and proceeds with the next lines of code outside fetch,then
//(Probably all lines we used before are synchronous code -> they go to stack)

//SetTimeOut and setTimeInterval are also asynchronous
//so which is executed first from the following: 1) setTimeOut 2) setTimeInterval 3) Fetch?


// window.localStorage.setItem("Products: ",products);
// window.localStorage.getItem("Products");
// window.localStorage.removeItem("Products");
// window.localStorage.clear();