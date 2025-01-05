import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/loadingBar";


const Admin = () => {
    const [loading, isLoading] = useState(true)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const handleclick = () => {
        navigate("/addProduct")
    }

    const fetchProducts = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/product/`)
            console.log(response.data.products)
            setProducts(response.data.products)
            isLoading(false)
        }
        catch(error)
        {
            console.log(error.message)
            isLoading(false)
        }
    }

    const handleUpdate = (product) => {
        navigate("/updateProduct", {state: {product}})
    }

    const handleDelete = async (id) => {
        try
        {
            const response = await axios.delete(`http://localhost:3000/product/delete/${id}`)

        if(response.status === 204)
        {
            await fetchProducts();
        }
        }
        catch(error)
        {
            console.log(error.message)
        }
        
    }

    useEffect(() => {
        
        fetchProducts();
    },[])

    if(loading)
    {
        return (
            <LoadingBar/>
        )
    }

    return(
        <div className="flex flex-col h-screen">
            <div className="flex flex-row justify-center gap-40 p-5">
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                    Headset
                </button>
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                    Keyboard
                </button>
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                    Mouse
                </button>
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                    Mouse Pad
                </button>
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                    All
                </button>
            </div>
            <div className=" flex flex-col items-center">
                {products.length > 0 ? (
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div className="bg-white  drop-shadow-xl p-4 flex flex-col rounded-lg hover:shadow-xl items-center "
                            key={product._id}>
                            <strong>{product.name}</strong>
                            <h1 className="">Description: {product.description}</h1>
                            <h1>Category: {product.category}</h1>
                            <h1>Price: {product.price}$</h1>
                            <div className="flex flex-row justify-between gap-5 mt-auto p-3">
                                <button className="py-2 bg-sky-500 w-32 rounded-xl font-bold text-white hover:bg-sky-600 hover:text-white"
                                        onClick={() => handleUpdate(product)}>
                                    Update
                                </button>
                                <button className="py-2 bg-sky-500 w-32 rounded-xl font-bold text-white hover:bg-sky-600 hover:text-white"
                                        onClick={() => handleDelete(product._id)}>
                                    Delete
                                </button>
                            </div>
                        </div> // Adjust as per your product structure
                    ))}
                </div>
                ) : (
                    <h2>No products available</h2>
                )}
                <div>
                    <button className="py-4 bg-sky-500 w-64 rounded-xl mt-10 text-white font-bold hover:bg-sky-600 hover:text-black"
                    onClick={handleclick}>
                        Add Product
                    </button>
                </div>
            </div>
            
        </div>
    )

}

export default Admin;