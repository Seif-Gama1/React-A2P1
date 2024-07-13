const options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];

var controlMenu = document.querySelector("#control-menu");
var Menu = document.querySelector("#menu");
var menuList = document.querySelector(".menu-list");

var allRecipesContainer = document.querySelector("#recipe-container");

var base_url = "https://forkify-api.herokuapp.com/api/search?q=";

getApi('pizza');

controlMenu.onclick = function(){
    
    controlMenu.classList.toggle("white-text");
    
    if(Menu.style.left==='-100%'){
        Menu.style.left='0';
        controlMenu.classList.remove("text-white-50");
    }
    else{
        Menu.style.left='-100%';
        controlMenu.classList.add("text-white-50");
    }
}


var temp_li;
var temp_p;
for(var i=0; i<options.length ; i++){
    temp_li = document.createElement('li');
    temp_p = document.createElement('p');
    temp_li.classList.add( "menu-item","py-3", "ps-3", "border-bottom", "fs-3");
    
    // temp_li.setAttribute('id',options[i]);
    temp_p.className = 'menu-p btn text-left text-white-50 fs-3 my-0 pe-5';
    temp_p.setAttribute('onclick', `getApi('${options[i]}')`);
    temp_p.textContent = `${options[i]}`;
    temp_li.appendChild(temp_p);
    menuList.appendChild(temp_li);
}

async function getApi(option) {
    try {
        var data = await getRecipesData(option);
        displayRecipesData(data.recipes);
    } catch (error) {
        console.error(error);
    }
}

async function getRecipesData(option) {
    var response = await fetch(base_url+option);
    if (!response.ok) {
        throw new Error("Could Not Fetch resipes data");
    }
    var data= await response.json();
    return data;
} 

{/* <div class="col-md-4" id="a723e8">
        <div class="recipe-box make-pointer bg-light shadow-lg border rounded">
            <div class="resipe-img">
                <img src="http://forkify-api.herokuapp.com/images/BBQChickenPizza3e2b.jpg" class="w-100" alt="">
            </div>
            <div class="content px-2">
                <h3 class="my-3">Barbecue Chicken Pizza</h3>
                <p>My Baking Addiction</p>
            </div>
        </div>
    </div>  */}

function displayRecipesData(response) {
    allRecipesContainer.innerHTML = ''; 
    for (let i = 0; i < response.length; i++) {
        var recipe = response[i];
        var recipeContainer = document.createElement('div');
        
        var recipeOuterDiv = document.createElement('div');

        
        var recipeInnerDiv1 = document.createElement('div');
        var recipeImg = document.createElement('img');
        
        var recipeInnerDiv2 = document.createElement('div');
        var recipeTitle = document.createElement('h3');
        var recipeDescription = document.createElement('p');

        recipeContainer.classList.add('col-md-4', 'mb-4');
        recipeContainer.id = recipe.recipe_id;

        // recipeOuterDiv.classList.add('resipe-box', 'make-pointer', 'bg-light', 'shadow-lg', 'border', 'rounded');
        recipeOuterDiv.className= "recipe-outerDiv make-pointer bg-light shadow-lg border rounded";
        
        //Inner Div1
        recipeInnerDiv1.classList.add('recipe-img');
        recipeImg.src = recipe.image_url;
        recipeImg.classList.add('w-100');
        recipeImg.alt = recipe.title;

        // Inner Div2
        recipeInnerDiv2.classList.add('recipe-contents', 'px-2');
        recipeTitle.classList.add('my-3');
        recipeTitle.textContent = recipe.title;
        recipeDescription.textContent = recipe.publisher;
        
        recipeInnerDiv1.appendChild(recipeImg);

        recipeInnerDiv2.appendChild(recipeTitle);
        recipeInnerDiv2.appendChild(recipeDescription);

        recipeOuterDiv.appendChild(recipeInnerDiv1);
        recipeOuterDiv.appendChild(recipeInnerDiv2);

        recipeContainer.appendChild(recipeOuterDiv);
        allRecipesContainer.appendChild(recipeContainer);
    }
}