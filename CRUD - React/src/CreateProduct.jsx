import { useState, useEffect } from "react"

//Continue 2:02:20

export default function CreateProduct({
    product,
    handleSubmit,
    handleChange,
    children,
    ClearForm,
}){
    
    return <>
        <div>
            <div className="position-relative w-75 mx-auto py-5 px-3 rounded-3 shadow-lg mt-5">
                <h1>CRUD Project</h1>
                <form id="product-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product_name" className="form-label">Proudct Name</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="product_name" 
                        placeholder="Amazing Chair"
                        name="name"
                        value={product.name}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_category" className="form-label">Proudct Category</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="product_category" 
                        placeholder="Category1"
                        name="cat"
                        value={product.cat}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product_price" className="form-label">Proudct Price</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="product_price" 
                        placeholder="500 LE"
                        name="price"
                        value={product.price}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prodct_desc" className="form-label">Product Desc</label>
                        <textarea 
                        className="form-control" 
                        id="prodct_desc" 
                        rows={3} 
                        name="description"
                        value={product.description}
                        onChange={handleChange} />
                    </div>
                    
                    {/* <button id="create-btn" className="btn btn-primary">{productToUpdate ? "Update Product" : "Add Product"}</button> */}
                    {children}
                    <button id="clear-btn" className="btn btn-primary" type="button" onClick={ClearForm}>Clear</button>
                </form>
            </div>
        </div>
    </>
} 