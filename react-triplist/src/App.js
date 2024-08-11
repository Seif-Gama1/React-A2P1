import './App.css';
import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import CreateItems from './CreateItems';
import Header from './header';
import Inputs from './inputs';
import swal from 'sweetalert';
import Footer from './Footer';

const key1 = "items";
const key2 = "checkedItems";
const initialItems        = JSON.parse(localStorage.getItem(key1)) || [];
const initialCheckedItems = JSON.parse(localStorage.getItem(key2)) || [];

const updateItemsStorage = (newItems) => { 
  localStorage.setItem(key1, JSON.stringify(newItems));
};
const updateCheckedItemsStorage = (newItems) =>{
  localStorage.setItem(key2, JSON.stringify(newItems));
}

function App() {
  
  const [items, setItems] = useState(initialItems);
  const [singleItem, setSingleItem] = useState({
    name:"",
    quantity:"1",
    id:""
  });

  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  
  useEffect(() => {
    updateCheckedItemsStorage(checkedItems);
    setCheckedItems(checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    removeUncheckedItems();
  }, [items]);

  const addProduct = () =>{
    const newItems = [...items];    
    const ItemToBePushed = {...singleItem,"id":uniqid()};
    newItems.push(ItemToBePushed);
    
    updateItemsStorage(newItems);
    setItems(newItems);
  }

  const deleteItem = (deleteID) => {    
    const newItems = items.filter((item, index) => item.id !== deleteID);  
    setItems(newItems);
    updateItemsStorage(newItems);
  }

  const handleChangeOfItem = (e) => {
      setSingleItem({ ...singleItem, [e.target.name]: e.target.value });
  }

  const mySort = (option) => {
    
    const newItems = [...items];
    const defaultItems = JSON.parse(localStorage.getItem(key1)) || [];
    switch(option){
        case 1:
          newItems.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
          setItems(newItems);
          break;
        case 2:
          newItems.sort((a, b) => a.name.localeCompare(b.name));
          setItems(newItems);
          break;
        case 3:
          setItems(defaultItems); 
          break;
        case 4:
          setItems(sortCheckedItems());
          break;
        default: 
          setItems(defaultItems); 
          break;
    }
  }

  const sortCheckedItems = () => {
    return items.sort((a, b) => {
      const aChecked = checkedItems[a.id] || false;
      const bChecked = checkedItems[b.id] || false;
  
      if (!aChecked && bChecked) {
        return -1;
      } else if (aChecked && !bChecked) {
        return 1; 
      } else {
        return 0; 
      }
    });
  };

  const clearList = () => {
    swal({
      title: "Are you sure?",
      text: "you will not be able to recover this list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          setItems((prevItems) => {
            setCheckedItems([]);
            const newItems = [];
            updateItemsStorage(newItems); // Update localStorage with the new empty list
            return newItems;
          });
          swal("Your Whole List has been deleted", {
          icon: "success",
          });
      } else {
          swal("Your list is safe!");
      }
    });
  }

  const removeUncheckedItems = () => {
    const validIds = new Set(items.map(item => item.id));
    setCheckedItems(initialCheckedItems);
    const newCheckedItems = Object.fromEntries(
      Object.entries(checkedItems).filter(([id, isChecked]) => isChecked && validIds.has(id))
    );

    setCheckedItems(newCheckedItems);
    updateCheckedItemsStorage(newCheckedItems);
  }

  return <>
    <Header />
    <Inputs singleItem={singleItem} addProduct={addProduct} handleChange={handleChangeOfItem} />
    <CreateItems data                = {items} 
                 deleteFunc          = {deleteItem}
                 clearList           = {clearList}
                 mySort              = {mySort}
                 checkedItems        = {checkedItems}
                 setCheckedItems     = {setCheckedItems}
    />
    
    <Footer>
        <p>
          {          
              items.length > 0 ? 
              `💼 You have ${items.length} items in your list. You already packed ${Object.values(checkedItems).filter(isChecked => isChecked).length} items (${((Object.values(checkedItems).filter(isChecked => isChecked).length / items.length) * 100).toFixed(2)}%).` 
              :
              "Start adding some items to your packing list 🚀"
          }
        </p>
    </Footer>
    
  </>
    
}

export default App;