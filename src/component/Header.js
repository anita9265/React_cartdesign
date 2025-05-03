import React, { useEffect, useState } from "react";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const data = useSelector((state) => state.cart.cartdata);

      const [store,setstore]=useState(0);
  console.log('storedata',data)

    //  localStorage.setItem('Cart total',JSON.stringify(data));
    //  var g = localStorage.getItem('Cart total');
   
      // localStorage.clear();
  useEffect(() => {
         var g = localStorage.getItem('Carttotal');
          // setstore(g.length);
        console.log(g);
        
    }, [data]);

  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg" className="py-4">
        <Container>
          <Row className="w-100 justify-content-between  align-items-center ">
            <Col md={3} className="text-center text-md-start">
                   <Link to={'/'} ><img src={require('../logo.webp')} alt=""  width={'100px'}/>
                    </Link>
            </Col>
            <Col md={9} className="navigation">
              <Nav className="justify-content-end">
                <Link to="#home" className="text-decoration-none ms-5"> Home  </Link>
                <Link to="#features"className="text-decoration-none ms-5" > Features</Link>
                <Link to="#pricing"className="text-decoration-none ms-5" > Pricing </Link>
              
                 <Link to={'/cart'} className="text-decoration-none ms-5 position-relative " ><FaShoppingCart /> 
                  <div className="position-absolute  text-center d-flex justify-content-center align-items-center" style={{width:'15px',fontSize:'12px', backgroundColor:'red', height:'15px', borderRadius:'50%', position:'absolute', top:'0%',right:'-70%' }}>{store}</div>

                 </Link>
              </Nav>
            </Col>
         
          </Row>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;
