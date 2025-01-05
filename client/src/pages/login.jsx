import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleLogin = async () => {
        if(email != "" && password!= "")
        {
            try
            {
                const response = await axios.post("http://localhost:3000/user/login", {email, password})
                if(response.status === 200)
                {
                    console.log(response.data.message)
                    if(email === "ahmed@gmail.com")
                    {
                        navigate('/Admin')
                    }
                    else
                    {
                        navigate('/Home', { state: email })
                    }
                    
                }
            }
            catch(error){
                if(error.response.status === 401)
                {
                    setError(error.response.data.message)
                }
                else if(error.response.status === 404)
                {
                    setError(error.response.data.message)
                }
                

            }
            
        }
        else
        {
            setError("Fill All Fields")
        }
        
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <div className="flex flex-col space-y-4">
                    <label className="text-sm font-medium text-gray-600 text-start">
                        Email
                    </label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                    <label className="text-sm font-medium text-gray-600 text-start">
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
                        onClick={handleLogin}>
                        Login
                    </button>
                    <div className=" flex flex-col justify-center items-center">
                        <h1 className="text-slate-600 text-center">Don't have an account</h1>
                        <Link to="/signup" className=" text-blue-500 hover:text-blue-800 text-lg font-medium">SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;