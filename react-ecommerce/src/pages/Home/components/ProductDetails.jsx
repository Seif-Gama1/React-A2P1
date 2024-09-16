import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {  ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { FaStar, FaArrowCircleRight,FaArrowCircleLeft } from "react-icons/fa";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AppContext } from "../../../context/AppContext";
import { setLocalStorage } from "../../../App";

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function ProductDetails(){
    const [product, setProduct] = useState(null);
    const [selectedImageIndex,setSelectedImageIndex] = useState(null);
    const [category , setCateogry] = useState(null);
    const [relatedProd , setRelatedProd] = useState([]);
    const params = useParams();

    const { cartItems, setCartItems} = useContext(AppContext);    
    
    const handleNavButtonClick = () => {
      setSelectedImageIndex(null);
    };

    
    useEffect(() => {
      document.title = `Product Details`;
      return () => {
        document.title = "Default Title";
      };
    }, []);

    useEffect(() => {
      fetch(`https://dummyjson.com/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          fetch(`https://dummyjson.com/products/category/${data.category}`)
          .then((res) => res.json())
          .then((data2) => {
            setRelatedProd(data2.products)
          });
        });
    }, [params.id]);
    

    const handleAddProduct = useCallback((clickedItem) => {
      const tempCartProducts=[...cartItems];
      const existingItem = cartItems.find((item) => item.id==clickedItem.id)
      if(existingItem){
          if(existingItem.quantity<existingItem.stock){
              existingItem.quantity++;
              const tempCartProducts = cartItems.map(element => {
                  if (element.id === existingItem.id) {
                    return existingItem; 
                  }
                  return element; 
              });
              setCartItems(tempCartProducts);
              setLocalStorage(tempCartProducts);
          }
      }
      else{
          const updatedClickedItem = {...clickedItem, quantity : 1}
          
          tempCartProducts.push(updatedClickedItem);
          setCartItems(tempCartProducts);
          setLocalStorage(tempCartProducts);
      }
    },[cartItems]);

return <>
        {product ? (
              <div className="flex flex-wrap mt-[8%] mb-[10%]">
                {/* Carousel */}
                <div className="w-full md:w-[55%]">
                  <CarouselProvider
                    className="relative "
                    naturalSlideWidth={50}     naturalSlideHeight={125}
                    totalSlides={product.images.length}
                    visibleSlides={1}           isPlaying={true}
                    interval={4000}             infinite={true}
                  >
           
                    <Slider className={`w-full ms-0 lg:ms-8 sm:mt-[10%]  ${product.images.length>1? "h-[350px] lg:h-[450px]": ""}` }>
                      {product.images.length>1 ? product.images.map((image, i) => (
                        <Slide className={"w-[70%] mx-auto"} key={i} index={i}>
                          <img className="rounded-md h-[250px] lg:h-[400px] mx-auto" src={product.images[selectedImageIndex] ? product.images[selectedImageIndex] : image } alt={`${product.title} image`}/> 
                        </Slide> ))
                      : 
                        ""
                      }
                    </Slider>

                    <div className="flex flex-wrap w-full mx-auto">
                      {product.images.map((image,i) => (
                        <img className={product.images[1] ? "h-[200px] rounded-md cursor-pointer mx-auto" : "h-[400px] rounded-md cursor-pointer mx-auto"} src={image} onClick={() => setSelectedImageIndex(i)}/>
                      ))}
                    </div>
                    
                    {product.images.length > 1 ?     
                    <>             
                      <ButtonBack className="align-middle absolute left-[15%] md:left-[7%] lg:left-[14%] top-[14.5%] md:top-[14%] lg:top-[24.5%]" onClick={handleNavButtonClick}>
                        <FaArrowCircleLeft color="#000" size={50}/>
                      </ButtonBack>
                    
                      <ButtonNext className="align-middle absolute  left-[78%] md:left-[82%] lg:left-[88%] top-[14.5%] md:top-[14%] lg:top-[24.5%]" onClick={handleNavButtonClick}>
                        <FaArrowCircleRight color="#000" size={50}/>
                      </ButtonNext> 
                    </>   
                      :
                      <p></p>
                    }
                  </CarouselProvider>
                </div>
                
                {/* rest of description */}
                <div className="w-full md:w-[45%] md:mt-12">
                  <div className="w-[85%] md:w-full mx-auto">

                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="mt-5 text-base">{product.description}</p>
                      
                    <div className="flex mt-5">  
                      <FaStar className="mt-[2px] text-yellow-500" size={20}/>
                      <p className="ms-2 text-lg text-white bg-[#3e5067] rounded-md px-2">{product.rating}</p>
                    </div>

                    <div className="flex mt-2 justify-between w-[96%]">
                      <div className="flex ">
                        <p className="font-bold text-xl mt-1 md:text-base lg:text-lg">{( (product.price * (100-product.discountPercentage))/100).toFixed(2)}$</p>
                        <p className="ms-3 line-through text-gray-600 text-lg font-semibold mt-1 md:text-base lg:text-lg">{product.price}$ </p>
                        <p className="ms-1 text-gray-600 text-lg font-semibold mt-1 md:text-base lg:text-lg" > ({product.discountPercentage}% off)</p>
                      </div>
                      
                      <div>
                        <button type="button" className="bg-[#3e5067] py-[6px] px-1 text-white rounded-md relative sm:text-sm " onClick={() => handleAddProduct(product)}>Add To Cart</button>
                      </div>
                    </div>
          
                    {/* Tags */}
                    <div className="flex mt-3">
                      {product.tags.map((tag,index) => {
                        return <p key={index} className="bg-gray-400 rounded border-2 border-gray-700 text-gray-700 me-1 px-2 py-[2px]">{tag}</p>
                      })}
                    </div>


                    <table className="table-auto border-collapse border-[#3e5067] mt-10 border-4">
                      <tbody>
                        <tr>
                          <td className="border-2 border-[#3e5067]  px-4 py-2 font-bold w-[150px] border-x-4">Brand</td>
                          <td className="border-2 border-[#3e5067] px-4 py-2  w-[170px]">{product.brand? product.brand : "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-[#3e5067] px-4 py-2 font-bold w-[150px] border-x-4">Weight</td>
                          <td className="border-2 border-[#3e5067] px-4 py-2 w-[170px]">{product.weight} Kg</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-[#3e5067] px-4 py-2 font-bold w-[150px] border-x-4">Dimensions</td>
                          <td className="border-2 border-[#3e5067] px-4 py-2 w-[170px]">
                            {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-[#3e5067] px-4 py-2 font-bold w-[150px] border-x-4">Warranty</td>
                          <td className="border-2 border-[#3e5067] px-4 py-2 w-[150px]">{product.warrantyInformation}</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-[#3e5067] px-4 py-2 font-bold w-[150px] border-x-4">Availability</td>
                          <td className="border-2 border-[#3e5067] px-4 py-2 w-[150px]">{product.availabilityStatus}</td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </div>

                </div>
              </div>
            )
            :  
            <p className="absolute top-[45%] left-[40%] text-5xl">Loading...</p>
          }

          <h2 className="text-5xl text-[#3e5067] text-center font-semibold mb-4">Related Products</h2>
          <div className="flex gap-4 test-class mb-20 w-[96%] mx-auto rounded-md my-5">
            { (relatedProd.length>0) && 
              (relatedProd.filter((relatedprod, index) => relatedprod.id !== product.id).slice(0,5)
                .map((relatedprod,index) => {
                  return <div key={index} className=" w-[19%] border shadow py-[2%]">
                            <Link to={`/product-details/${relatedprod.id}`} className="me-4 hover:text-blue-800" onClick={scrollTop}>
                              <img className="h-[200px] mx-auto" src={relatedprod.images[0]} alt={relatedprod.title}/>
                            </Link>
                            <h2 className="text-center text-lg mt-4">{relatedprod.title}</h2>
                          </div>
                })
              )
            }

            {relatedProd.length === 0 && <p>Loading...</p>}
          </div>
        </>
  }