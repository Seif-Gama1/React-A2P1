import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CreateItems({data,
                                     deleteFunc,
                                     clearList,
                                     mySort,
                                     checkedItems,
                                     setCheckedItems,
                                    }
                                ){
    
    const [selectedOption, setSelectedOption] = useState('Sort by input order');


    const handleSelect = (eventKey) => {
        switch (eventKey) {
            case '1':
                setSelectedOption('Sort by amount');
                mySort(1);
                break;
            case '2': 
                setSelectedOption('Sort by name');
                mySort(2);
                break;
            case '3':
                setSelectedOption('Sort by input order');
                mySort(3);
                break;
            case '4':
                setSelectedOption('Sort by packed status');
                mySort(4);
                break;
            default:
                setSelectedOption('Sort Option');   
                mySort(0);
        }
    }
   
    const handleCheckboxChange = (itemId) => {
        setCheckedItems(prevCheckedItems => ({
            ...prevCheckedItems,
            [itemId]: !prevCheckedItems[itemId]
        }))
    }

    function clickedDelete(deleteID){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                deleteFunc(deleteID);
                swal("Poof! Your item has been deleted!", {
                icon: "success",
                });
            } else {
                swal("Your item is safe!");
            }
        });
    }
    return <>
        <div className="pt-5 search-container">
            <div className="container-fluid scrollable-container">
                <div className="row">
                {data.map((item,index) => (
                        <div key={index} className="col-5 col-lg-2 item-styling mb-4"> 
                            <input type="checkbox" 
                                   checked={checkedItems[item.id] || false}
                                   onChange={() => handleCheckboxChange(item.id)} 
                            />
                            <p className={`mt-3 ${checkedItems[item.id] ? 'text-decoration-line-through' : ''}`}>                            
                                {item.quantity}x &nbsp; {item.name}
                            </p> 
                            <button onClick={() => clickedDelete(item.id)}>
                                <i className="fa-solid fa-x text-danger"></i>
                            </button>
                        </div>
                    ))
                }

                </div>
            </div>
            

            <div className="d-flex justify-content-center position-relative mt-3">
                <Dropdown className="me-4">
                    <Dropdown.Toggle className="btn-styling" id="dropdown-basic">
                        {selectedOption}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{backgroundColor: '#ffecb4'}}>
                        <Dropdown.Item onClick={() => handleSelect('1')}>
                            Sort by amount             
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('2')}>
                            Sort by name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('3')}>
                            Sort by input order
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('4')}>
                            Sort by packed status
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <button className="btn-styling" onClick={() => clearList()}>
                    Clear List
                </button>
            </div>

        </div>
    </>
}