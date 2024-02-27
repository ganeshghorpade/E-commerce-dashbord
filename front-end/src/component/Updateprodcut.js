import React,{useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = ()=>{
    const [name,setName]= React.useState("");
    const [price,setPrice]= React.useState("");
    const [category,setCategory]= React.useState("");
    const [company,setCompany]= React.useState(""); 
    const params = useParams();
    const navigate = useNavigate();
    

    useEffect(()=>{
        getProductDetail();
    },[ ]);

    const getProductDetail = async ()=>{
        //console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        }   

    const updateProduct= async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({name,price,category,company}),
        headers:{
        'Content-Type':'application/json'
        }
        });
        result = await result.json();
        console.log(result);
        if(result){
            navigate('/products');
        }
        }

    return(
        <div className="product-box">
        <h2>Update Product</h2>
        <input type="text" className="pro-in" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Product Name"></input>
        <input type="text" className="pro-in" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Price"></input>
        <input type="text" className="pro-in" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Category"></input>
        <input type="text" className="pro-in" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Company"></input>
        <button type="submit"  onClick={updateProduct} className="pro-btn">Update Product</button>

    </div>
    )
}

export default UpdateProduct;