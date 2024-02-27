import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Signup from './component/Signup';
import Home from './component/Home';
import Login from './component/Login';
import Addproduct from './component/Addproduct';
import Products from './component/Products';
import UpdateProduct from './component/Updateprodcut';
import PrivateComponent from './component/Privatecomponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App(){
  return(
    
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        
        <Route element={<PrivateComponent/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/add' element={<Addproduct/>}/>
              <Route path='/products' element={<Products/>}></Route>
              <Route path='/update/:id' element={<UpdateProduct/>}/>
              <Route path='/logout' element={<h1>logout content</h1>}/> 
              <Route path='/profile' element={<h1>profile content</h1>}/>
        </Route>

        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
