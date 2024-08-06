import swal from 'sweetalert';

export default function ProductsTable({data , deletefunc , handleUpdatedProduct}) {
       
    function clickedDelete(delteID) {

        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            deletefunc(delteID);
            swal("Poof! Your product has been deleted!", {
            icon: "success",
            });
        } else {
            swal("Your product is safe!");
        }
        });


    }
    
    return <div id="product-tabel-container" className="w-75 mx-auto my-5">
                <table className="table">
                    <thead>
                    <tr>
                        <th>index</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    
                    <tbody id="tabel-body">
                    {data.map((product,index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.cat}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="btn btn-outline-success" onClick={() => handleUpdatedProduct(product)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={() => clickedDelete(product.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr> 
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>
}