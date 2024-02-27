import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';


const Signup = ()=>{
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const[error,setError] = React.useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[]);
    const CollectData = async ()=>{
        //console.log(name,email,password);
        if(!name || !email || !password){
            setError(true);
            return false;
        }

        //this is API integrate code

        let result = await fetch("http://localhost:5000/register",{
            method:'POST',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json(); // here we used await because result in Readable streams (it are used in operations where data is read, such as reading data from a file or streaming video.)
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.result)); // it is used to store the data in local storage       
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/'); 
    }

    return(
        <>
         <div className="container">
        <div className="inner-con">
        <h1 id="h1s">Register</h1>
        <input type="text" className="in" placeholder="Enter Name" 
        value={name} onChange={(e)=>setName(e.target.value)}/><br/>
        {error && !name &&<span className="lp">Enter the Valid name</span>}<br/>

        <input type="text" className="in" placeholder="Enter Email"
        value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        {error && !email &&<span className="lp">Enter the Valid Email</span>}<br/>

        <input type="password" className="in" placeholder="Enter Password"
        value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
        {error && !password &&<span className="lp">Enter the Valid password</span>}<br/>

        </div>
        <div>
        <div className="Checkbox">
			<label className=""><input type="checkbox" required="required"/> I accept the <a href="/">Terms of Use</a> &amp; <a href="/">Privacy Policy</a></label>
		</div>
        <div className="register">
            <button type="button" className="btn-r" onClick={CollectData}>Sign Up</button>
        </div>
        </div>
    </div> 
        </>
    )
}

export default Signup;

/* <div className="container">
        <div className="inner-con">
        <h1 id="h1s">Register</h1>
        <input type="text" className="in" placeholder="Enter Name" 
        value={name} onChange={(e)=>setName(e.target.value)}/>

        <input type="text" className="in" placeholder="Enter Email"
        value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <input type="password" className="in" placeholder="Enter Password"
        value={password} onChange={(e)=>setPassword(e.target.value)}/>

        </div>
        <div>
        <div className="Checkbox">
			<label className=""><input type="checkbox" required="required"/> I accept the <a href="/">Terms of Use</a> &amp; <a href="/">Privacy Policy</a></label>
		</div>
        <div className="register">
            <button type="button" className="btn-r" onClick={CollectData}>Register Now</button>
        </div>
        </div>
    </div> */