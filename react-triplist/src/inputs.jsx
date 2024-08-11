
export default function Inputs({singleItem ,addProduct, handleChange}){
    return <>
        <div className="d-flex bg- align-items-center justify-content-center second-div">
            <p className="mt-3 me-3">What do you need for your 😍 trip?</p>
            <input 
                type = "number"
                min = "1" max = "50"
                placeholder = "1"
                name = "quantity"
                value = {singleItem.quantity}
                onChange = {handleChange}
                onClick = {handleChange}
            /> 
            <input 
                type = "text"
                placeholder = "Item..."
                name = "name"
                value = {singleItem.name}
                onChange = {handleChange}
            />
            <button className="add-btn" onClick={addProduct}>Add</button>
        </div>
    </>
}