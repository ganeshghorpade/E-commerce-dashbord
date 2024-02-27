import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    const[error,setError] = React.useState(false);

    
    

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[]);

    const startLogin = async()=>{

        if(!email || !password){
            setError(true);
            return false;
        }

        let result = await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        }); 
        result = await result.json(); // here we used await because result in Readable streams (it are used in operations where data is read, such as reading data from a file or streaming video.)
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert("invalid email or Password")
        }
    } 
    return(
        <>
        <div className="l-main">
            <h2>Login</h2>
           
            <input className="in-box" type="email" value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
            {error && !email &&<span className="lp">Enter the Valid Email</span>}
            <input className="in-box" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
            {error && !password &&<span className="lp">Enter Valid Password</span>}
            <button className="b-box" type="submit" onClick={startLogin}>Login</button>
    
        </div>

        </>
    )
}

export default Login;