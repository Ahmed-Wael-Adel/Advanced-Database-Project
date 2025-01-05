import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import LoadingBar from "../components/loadingBar";

const AddProduct= () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState();
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    const [successesMsg, setSuccessesMsg] = useState(false)
    const [loading, isLoading] = useState(false)


    const handleBack = () =>{
        navigate("/admin");
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImage(file);
    
          // Create a preview of the image
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = reader.result;
            setImage(img)
          };
          reader.readAsDataURL(file);
        }
      };

    const handleAdd = async() => {

        isLoading(true)
        
        if ( name != "" && description != "" && category != "" && price != "")
            {
                try{
                    const response = await axios.post("http://localhost:3000/product/add", {
                        name,
                        description,
                        category,
                        price,
                        image
                    });
            
                    if (response.status === 201)
                    {
                        setSuccessesMsg(true)
                        setTimeout(() => {
                            navigate("/Admin"); // Navigate after 2 seconds
                        }, 2000);
                    }
                }
                catch(error){
                    console.log(error.response)
                } 
            }
            else
            {
                setError("Fill All Fields")
            }
                
        
    }

    if(loading)
    {
        return(
            <LoadingBar/>
        )
    }

    return(

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add Product</h2>
                <div className="flex flex-col space-y-4 text-left">
                    <input 
                        type="file"
                        onChange={handleImageChange}/>
                    <label className="text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className="text-sm font-medium text-gray-600">
                        Category
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={category}
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label className="text-sm font-medium text-gray-600">
                        Price
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={price}
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                    />
                    <h1 className="text-red-700">{error}</h1>
                    <button 
                        className="w-full px-4 py-2 font-semibold text-white bg-sky-500 rounded-lg shadow hover:bg-sky-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onClick={handleAdd}>
                        ADD
                    </button>
                    <button 
                        className="w-full px-4 py-2 font-semibold text-white bg-sky-500 rounded-lg shadow hover:bg-sky-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onClick={handleBack}>
                        Back
                    </button>
                </div>
            </div>
            {successesMsg && (
                <LoadingBar/>
            )}
        </div>
    )

}

export default AddProduct;