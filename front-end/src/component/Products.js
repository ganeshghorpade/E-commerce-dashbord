import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products =()=>{
    const[product,setProduct] = useState([]);

    useEffect(()=>{
        getProduct();
    }, [])

        const getProduct = async ()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProduct(result);
    }

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/delete/${id}`,{
            method:"DELETE"
        });
        result = await result.json();
        if(result){
            getProduct();
        }
    };
    const searchHandle= async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
            setProduct(result);
            }
        }else{
            getProduct();
        }
        
    }
    return(
        <div className="product-list"> 
        <h3>Product List</h3>
        <input type="text" placeholder="Search Product" className="pro-search" onChange={searchHandle}/>
        <ul>
            <li>Sr.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
            product.length > 0 ? product.map((item,index)=>
            <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
                <button onClick={()=> deleteProduct(item._id)}>Delete</button>
                <button className="btn-p"><Link to={"/update/"+item._id} >update</Link></button>
            </li>
            </ul>
            )
            : <h3>Result Not Found</h3>
        }


        </div>
    )
}

export default Products;