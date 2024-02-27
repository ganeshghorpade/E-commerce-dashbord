import React from 'react';
import {Link, useNavigate} from  'react-router-dom';
import image from './logo.png';

const Nav =()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/Signup');

    }
    return(  
        <div>
            <img className='logo' alt='logo' src={image}></img>
            {
            auth ?
            <ul className='nav-ul'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} className='l-i' to='/Signup'>Logout</Link></li>          
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to='/Signup'>Sign up</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
            }
        </div>
    )
}

export default Nav;

//({ JSON.parse(auth).name})