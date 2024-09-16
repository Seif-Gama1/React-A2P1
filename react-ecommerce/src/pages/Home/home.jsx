// import { Outlet } from "react-router-dom";
import MySlider from "./components/CarouselProductList";
import ProductList from "./components/ProductList";
import SideBar from "./components/SideBar";
import { memo, useEffect, useState } from "react";

// export default function Home (){
const Home = () => {

    const [products, setProducts] = useState(null);
    const [clickedCategory, setClickedCategory] = useState(null);
    
    useEffect(() => {
        document.title = "Home";
        return () => {
          document.title = "Default Title";
        };
    }, []);
    
    return  <>  
                {/* Carousel */}
                <MySlider/>

                {/* 4 Images below carousel */}
                <div className="w-[96%] flex flex-wrap mx-auto mt-20 gap-2 font-bold text-lg md:text-sm lg:text-lg">
                    
                    <div className="w-full md:w-[24%] relative">
                        <img className="w-full" src="/images/home-photo1.jpeg" alt="random-photo"/>
                        <div className="absolute top-0 left-0 right-0 bottom-0 pb-10 flex flex-wrap justify-end items-center bg-black bg-opacity-30 text-white">
                            <p className="w-[40%] text-[#3e5067]">SAVE 40%</p>
                            <h2 className="ms-40 w-[40%] text-[#212529]">PANTS</h2>
                        </div>
                    </div>

                    <div className="w-full md:w-[24%] relative">
                        <img className="w-full" src="/images/home-photo2.jpg" alt="random-photo"/>
                        <div className="absolute top-0 left-0 right-0 bottom-0 pb-10  flex flex-wrap justify-end items-center h-[97%] bg-black bg-opacity-30 text-white">
                            <p className="w-[40%] text-[#3e5067]">SAVE 30%</p>
                            <h2 className="ms-40 w-[40%] text-[#212529]">HEADSETS</h2>
                        </div>
                    </div>

                    <div className="w-full md:w-[24%] relative">
                        <img className="w-full" src="/images/home-photo3.jpg" alt="random-photo"/>
                        <div className="absolute top-0 left-0 right-0 bottom-0 pb-10 flex flex-wrap justify-end items-center h-[97%] bg-black bg-opacity-30 text-white">
                            <p className="w-[40%] text-[#3e5067]">SAVE 60%</p>
                            <h2 className="ms-40 w-[40%] text-[#212529]">SHOES</h2>
                        </div>
                    </div>

                    <div className="w-full md:w-[24%] relative ">
                        <img className="w-full" src="/images/home-photo4.jpg" alt="random-photo"/>
                        <div className="absolute top-0 left-0 right-0 bottom-0 pb-10 flex flex-wrap justify-end items-center h-[97%] bg-black bg-opacity-30 text-white">
                            <p className="w-[40%] text-[#3e5067]  ">SAVE 30%</p>
                            <h2 className="ms-40 w-[40%] text-[#212529]">TOYS</h2>
                        </div>
                    </div>
                </div>

                <main>
                    {/* SideBar & ProductList Container */}
                    <div className="mx-auto my-14 w-[100%]">

                        <div className="flex me-0">   
                            <div>
                                <SideBar setClickedCategory={setClickedCategory}/>
                            </div> 
                            
                            <div className="w-full">
                                <div className="text-center">
                                    <h4 className="text-[#3e5067] text-lg font-semibold">Special Offer</h4>
                                    <h1 className="text-4xl font-semibold font-sans">TOP COLLECTION</h1>
                                    <hr className="w-20 mt-3 border-b-[#3e5067] border-b-4 mx-auto"/>
                                    <p className="text-[#777777] text-sm w-[50%] mt-4 mx-auto leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                </div>

                                <div className={`bg-white shadow rounded-[5px]`}>
                                    <div className="flex flex-wrap mt-0 justify-between md:mt-12 lg:mt-12 w-[96%] mx-auto">
                                        <ProductList clickedCategory={clickedCategory} products={products} setProducts={setProducts}/>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </main>
                {/* <div>
                    <Outlet/> {/* Renders the child route component }
                </div> */}
            </>
}

export default memo(Home);

// const key2 = "checkedItems";
// const initialItems        = JSON.parse(localStorage.getItem(key1)) || [];
// const initialCheckedItems = JSON.parse(localStorage.getItem(key2)) || [];

// const updateItemsStorage = (newItems) => { 
//     localStorage.setItem(key1, JSON.stringify(newItems));
//   };
// const [items, setItems] = useState(initialItems);


// export default function Home(props) {
//   const [color, setColor] = useState("bg-[#000]");
//   return (
//     <main className="mt-5">
//       <div className="container mx-auto">
//         <div className="flex">
//           {/* sidbar */}
//           <div className="w-1/4">{color && <SideBar />}</div>

//           <button onClick={() => setColor(null)}>Unmount Sidebar</button>
//           {/* <button
//             onClick={() => setColor("bg-rose-500")}
//             className="block mb-4 bg-rose-400"
//           >
//             Change Color
//           </button>
          
//           {/* products list */}
//         </div>
//       </div>
//     </main>
//   );
// }
