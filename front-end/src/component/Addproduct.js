import React from "react";
import { useNavigate } from "react-router-dom";

const Addproduct = ()=>{
    const [name,setName]= React.useState('');
    const [price,setPrice]= React.useState('');
    const [category,setCategory]= React.useState('');
    const [company,setCompany]= React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    const productadd = async ()=>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch("http://localhost:5000/addproduct",{
            method:"POST",
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/products');

    }
    return(
        <div className="product-box">
            <h2>Add Product</h2>
            <input type="text" className="pro-in" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Product Name"></input>
            {error && !name && <span className="i-v">Enter Valid name</span>}
            <input type="text" className="pro-in" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Price"></input>
            {error && !price && <span className="i-v">Enter Valid price</span>}
            <input type="text" className="pro-in" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Category"></input>
            {error && !category && <span className="i-v">Enter Valid category</span>}
            <input type="text" className="pro-in" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Company"></input>
            {error && !company && <span className="i-v">Enter Valid company</span>}
            <button type="submit" onClick={productadd} className="pro-btn">Add Product</button>

        </div>
    )
}

export default Addproduct;