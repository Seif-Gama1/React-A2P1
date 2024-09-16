import { memo, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import useApiCallInitilaRender from "../../../hooks/useApiCall";

function replaceCharAtIndex(str, index) {
  const firstPart = str.slice(0, index);
  const capitalizedChar = str.charAt(index + 1).toUpperCase();
  const rest = str.slice(index + 2);
  return firstPart + " " + capitalizedChar + rest;
}

// export default function SideBar({ setClickedCategory }) {
const SideBar = ({ setClickedCategory }) => {
  const { isSidebarVisible, setIsSidebarVisible } = useContext(AppContext);  //global state  
  const [categories, setCategories] = useState(null);

  //Side effect Logic:
    //arr.push("items");console.log("Hello"); //(deal with document)//call api is also side effect logic

  //useEffect && useState = hooks => v16.8
  //use function component
  //function component was called state-less component before react v16.8

  // we can deal with side effect logic (like api calls) using useEffect, event handler {onClick,...}
  useApiCallInitilaRender("products/categories", (data) => setCategories(data));

  const handleBackClick = () => {
    setIsSidebarVisible(0);
  };
  const handleCategoryClick = (category) => {
    setClickedCategory(category);
  }

  return (
    <>
      { isSidebarVisible ? (
          <aside className={`fixed top-0 z-20 left-0 h-full overflow-y-auto bg-white shadow rounded-[5px] p-2 w-1/4`}>   
            <h2 className="text-xl font-bold mb-3 ms-3 cursor-pointer" onClick={handleBackClick}>{`< Back`}</h2>
              {categories ?  (categories.map((category,index) => (
                <p key={index} className= "ms-5 round-md shadow cursor-pointer bg-white mb-2 p-1" onClick={() => handleCategoryClick(category.slug)} 
                  >{category.slug.indexOf('-') == -1 ? `${category.slug.charAt(0).toUpperCase()}${category.slug.slice(1)}` : `${category.slug.charAt(0).toUpperCase()}${replaceCharAtIndex(category.slug,category.slug.indexOf('-')).slice(1)}`}
                </p>
              ))) 
              :
                (<p className="text-gray-300 text-lg">Loading...</p>) 
              }               
          </aside>
        )
        :
        ( <aside className={`bg-white shadow rounded-[5px] p-2 hidden`}></aside> )
      }
    </>
  )
}

export default memo(SideBar);

// <aside className={`bg-white shadow rounded-[5px] p-2 ${props.color}`}>

/*useEffect(() => {
      console.log("initial render 2");
    
      if (props.color) {
          console.log("re-render phase in Case the props.color changed");
          console.log(`${props.color} updated`);
        }
    return () => console.log("Unmount phase");
  }, [props.color]); //initial render && in 
*/

/*Component LifeCycle
a) Mounting / Initial Render:
    when?
      With first call of the function component
    What happens?
      1- Initial props
      2- Initial state
      3- Define function inside useEffect
      4- Return jsx element - update DOM
      5- Call use effect in case useEffect with empty array

    logic: 
    happen just for once in initial render:
    useEffect(()=> {
        //logic
    }, [])

b) Re-redner / Updating phase: 
    when?
      1- Props changed
      2- State changes
      3- Parent re-render
      4- Context change

    what happens? 
      1- update props in case changed
      2- update state in case changed
      3- define useEffect in case  the dependency array has item change
      4- return jsx update DOM
      5- call useEffect (change 5 with 4)
  
    //before initial render => props.colr => undefaind
    useEffect(()=> {
        //logic 
    }, [])
    useEffect(()=> {
        //logic => 
            //happend in intial render
            // every time once props.color change
    }, [props.color])

c) Un-mount:
    when:
      1- component destryed or remove (don't call it when its parent re-render)
    what happens?
      1- component destroyed and removed from react tree
    
    //logic:
      useEffect(()=> {
      return ()=> logic 
      }, [])
*/
