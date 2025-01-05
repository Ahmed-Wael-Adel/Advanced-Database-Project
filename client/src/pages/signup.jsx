import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleSignup = async () => {
        if(email != "" && password!= "")
        {
            try
            {
                const response = await axios.post("http://localhost:3000/user/signup", {email, password})
                console.log(response.data.message)
                if(response.status === 201)
                {
                    navigate('/login')
                }
                else
                {
                    console.log(response.data.message)
                    setError(response.data.message)
                }
                
            }
            catch(error){
                setError(error.message)

            }
            
        }
        else
        {
            setError("Fill all Fields")
        }
        
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Signup</h2>
                <div className="flex flex-col space-y-4">
                    <label className="text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                    <label className="text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <h1 className="text-red-700">{error}</h1>
                    <button 
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onClick={handleSignup}>
                        Signup
                    </button>
                    <div className=" flex flex-col justify-center items-center">
                        <h1 className="text-slate-600 text-center">Have an account</h1>
                        <Link to="/login" className=" text-blue-500 hover:text-blue-800 text-lg font-medium">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;