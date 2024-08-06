export default function SearchBar({filterProducts, searchInputValue, setSearchInputValue}){

    const handleInputChange = (e) => {
        setSearchInputValue(e.target.value);
        filterProducts(e);
    }

    return <div className="my-5 w-75 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                    placeholder="Search by product name.."
                    value = {searchInputValue}
                />
           </div>
}