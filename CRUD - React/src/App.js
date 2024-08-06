import { useState } from 'react';
import uniqid from 'uniqid';
import './App.css';
import CreateProduct from './CreateProduct';
import SearchBar from './SearchBar';
import ProductsTable from './ProductsTable';
import WarningMessage from './WarningMessage';

const key = "products";
const initialProducts = JSON.parse(localStorage.getItem(key)) || [];

const updateLocalStorage = (newProducts) => { 
  localStorage.setItem(key, JSON.stringify(newProducts));
};

function App() {
  
  const [products, setProducts] = useState(initialProducts);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    description: "",
    id:""
  });

  const addProduct = () =>{
    
    initialzeProducts();
    
    const newProducts = [...products];    

    const productToBePushed = {...product,["id"]:uniqid()};
    newProducts.push(productToBePushed);
    
    updateLocalStorage(newProducts);
    setProducts(newProducts);
  }

  const ClearForm = () => {
    setProduct({
      name: "",
      cat: "",
      price: "",
      description: "",
      id:""
    })
  }
  
  const deleteProduct = (deleteID) => { 
    setSearchInputValue("");
    const newProducts = JSON.parse(localStorage.getItem(key)).filter((item, index) => item.id !== deleteID);
    
    updateLocalStorage(newProducts);
    setProducts(newProducts);
  }


  const handleUpdatedProduct = (productToUpdate) => {
    initialzeProducts();
    setUpdatedProduct(productToUpdate);
  }


  const updateProduct = () => {
    
    const updatedProducts = products.map((product,index) => {
      if (product.id == updatedProduct.id){
        return updatedProduct;
      }else{
        return product;
      }
    });

    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);    
    setUpdatedProduct(null);
  }

  const handleChangeOfProduct = (e) => {
    if(updatedProduct){
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    }else{
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchInputValue("");
    // setFilteredProducts(products);

    initialzeProducts();
    
    if(updatedProduct){
      updateProduct();
    }else{
      addProduct();
    }
    ClearForm();
  }

  const initialzeProducts = () =>
    setProducts(
      (prevState) => [...JSON.parse(localStorage.getItem(key))] || []
    );
  

  const filterProductsFunc = (e) => {
    
    const value = e.target.value;
    
    if(value==""){
      initialzeProducts();
      setSearchInputValue("");
    }
    else{
      const filterProducts = products.filter((product) => {
        return product.name.includes(value) //filter returns products that includes (value)
      });
      
      if(filterProducts.length > 0){
        setProducts(filterProducts);
      }else{
        initialzeProducts();
        alert("There's no results");
        e.target.value = "";
      } 
    }
  };

return <>
    <CreateProduct product={updatedProduct ? updatedProduct : product}
                   handleChange   = {handleChangeOfProduct} 
                   handleSubmit   = {handleSubmit}
                   ClearForm      = {ClearForm}
    >
        <button id="create-btn" className="btn btn-primary">
            {updatedProduct ? "Update Product" : "Add Product"}
        </button>
    </CreateProduct>
    <SearchBar filterProducts        = {filterProductsFunc}
               searchInputValue      = {searchInputValue}
               setSearchInputValue   = {setSearchInputValue}
    />
    { products.length > 0 ? 
        <ProductsTable 
        handleUpdatedProduct = {handleUpdatedProduct} 
        data={products} 
        deletefunc={deleteProduct}/> : <WarningMessage/> }
  </>
}

export default App;




//What's React or (Angular, vuejs) ? It's Component-based, declarative, state-driven library for building UI
// declarative: react does what I declare (أوصف) ... state-drive: UI is driven by state
/*

 // this is not pure JS...this is a different language called javascript-XML (JSX)
 // which is interpreted using bable(compiler)
 function Home({userName,fullName}){
  const headerStyle={
    color: "#fff",
    backgroundColor: "#333",
  }
  // we use {} to show that inside this is pure javascript code
  return (
    <> 
    <h1 style={headerStyle} className="App-header"> Home Page</h1>
    <p>username is here {userName}</p>
    <Counter/>
    </>
  );  
 }

 function Counter (){
  const headerStyle={ color: "#fff", backgroundColor: "#333"};
  // var count = 0;
     
  // thus we use states when we're certain this variable will change
  // and this change needs to be used in UI 

  return (
    <>
      <h1 style={headerStyle}> Hello, World! {counter}</h1>
      <button onClick={() => setCounter(counter+1)}>increment</button>
    </>
  )
 }
*/

//after adding/updating clear the form and clear the search
// use sweet alerts ... alert when deleting (make user choose between yes and no for delete)



// YOU CAN'T INITIALIZE STATE USING PROPS AS THEY ARE PRIVATE
// SO IT CAN'T BE SET WITH VALUES FROM AN OUTSIDE SOURCE

// TO OVERRIDE STATE [OBJECT,ARRAY]
// YOU NEED TO: 
//    1. SAVE DEEP COPY OF THE STATE IN VARIABLE
//    2. OVERRIDE VALUE OF VARIABLE
//    3. PASS VARIABLE TO SETSTATE
