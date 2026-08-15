import axious from "azios";
import { useState } from "react";
import{useNavigate, Link} from "react-router-dom";


function register(){
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const submitData = async(e)=>{
        e.preventDefault();

        setError("");
        setLoading(true);
   
        try{
            await axious.post("",{ name:name, email:email, password:password})

            alert("Registration Successfull");
            Navigate("/login");
        }catch(error){
            setError(error.respond?.data?.message || "registeration failed");
        }finally{
            setLoading(false);
        }
    };
    return (
        <div>
            <div>
                <h1> Create Account</h1>
                <form on Submit={submitData}>
                    <input type="text" placeholder="Enter your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {error && (
                        <p className="error">{error}</p>
                    )}
                    <button type="submit">{loading ? "registering" : "register"}</button>
                </form>
                <p>Already have an account ? {""} <Link to= "/login"> login </Link></p>
            </div>
        </div>
    )
}
export default Register;