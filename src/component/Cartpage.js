import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cartpage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const data = useSelector((state) => state.cart.cartdata);


  useEffect(() => {
    setCart(data);
    calculation(data);
  }, [data]);

  function calculation (cart) {

    let subtotal = 0;
    var discount=0;

   
    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price;
      discount += (cart[i].price * cart[i].discountPercentage) / 100;
    }

    setSubtotal(subtotal);
    setDiscount(discount);

   
    const total = subtotal - discount;
    setTotalBill(total);
  }

  function removeitem (id){

    const update = cart.filter(i => i.id !== id);
    setCart(update);
    calculation(update);
    alert("deleted successfully !!");

  }




  return (

    <>
       

    <Container fluid>
      
        <Row className='my-5 '>
        
          <Col md={8} className='bg-white'>
          <h3 className='text-capitalize'>shopping</h3>
          <hr />
            {
             cart && cart.map((v,i)=>{
                return(
                  <Row className=' my-4 border rounded-4 shadow-lg' >
                  <Col md={3}  className='d-flex justify-content-center align-items-center mt-6 ' >
                      <img src={v.thumbnail} alt="" width={'100%'} />
                  </Col>
                  <Col md={9} className='ps-5'>
                      
                      <div className="mb-4 p-3">
                        <h3>{v.title}</h3>
                        <p><strong>Status:</strong> In Stock</p>
                        <div className='mb-2'><strong>Category:</strong> {v.category}</div>
                        <div className='mb-2'><strong>Description:</strong> {v.description}</div>
                        <div>
                          <strong>Price:</strong> ${v.price} - <span className="text-danger">{v.discountPercentage}% off</span>
                        </div>
      
                   
                        <Button variant="danger" className="mt-2"  onClick={() => removeitem(v.id)}>Remove Item</Button>
                      </div>
                  
                    </Col>
                  </Row>
                )
              })

            }

          </Col>
          <Col md={4}>
          <div className="p-3   ">
            <h3 className="text-uppercase fs-5 text-dark">Price Details</h3>
            <hr />
            
         <div className='p-3  bg-white rounded-4 shadow-lg border mt-2'>
            <Row className="d-flex justify-content-between py-3">
                  <Col >Items Total:</Col>
                  <Col>{cart.length}</Col>
                </Row>
                
                <Row className="d-flex justify-content-between py-3 ">
                  <Col>Subtotal:</Col>
                  <Col>${subtotal.toFixed(2)}</Col> 
                    </Row>

                <Row className="d-flex justify-content-between py-3">
                  <Col>Discount:</Col>
                  <Col>${discount.toFixed(2)}</Col> {/* Display the discount */}
                
                </Row>

                <Row className="d-flex justify-content-between fw-bold border-top pt-2">
                  <Col>Total Bill:</Col>
                  <Col>${totalBill.toFixed(2)}</Col> {/* Display the total bill */}
                
                </Row>
         
            
            <button className="btn btn-dark w-100 mt-3">Proceed to Checkout</button>
            </div>
          </div>
          </Col>
           

        </Row>

    </Container>



        
    </>
  )
}

export default Cartpage
