import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Product from './component/Product';
import Page1 from './component/Page1';
import { Route, Routes } from 'react-router-dom';
import Cartpage from './component/Cartpage';
function App() {
  return (
    
      <>
          <Header></Header>
         
          {/* <Page1 ></Page1> */}

          <Routes>
              <Route path="/" element={ <Product/> }></Route>
              <Route path="/detail/:id" element={ <Page1/> }></Route>
              <Route path="/cart" element={ <Cartpage/> }></Route>
          </Routes>
      </>
    
  );
}

export default App;
