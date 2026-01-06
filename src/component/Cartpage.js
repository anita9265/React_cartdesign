import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IoIosTrash } from "react-icons/io";

function Cartpage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const data = useSelector((state) => state.cart.cartdata);


  useEffect(() => {
    setCart(data);
    if (data) calculation(data);
  }, [data]);

  function calculation(cart) {
    let subtotal = 0;
    var discount = 0;

    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price;
      discount += (cart[i].price * cart[i].discountPercentage) / 100;
    }

    setSubtotal(subtotal);
    setDiscount(discount);

    const total = subtotal - discount;
    setTotalBill(total);
  }

  function removeitem(id) {
    // Note: This only removes from local state, not Redux store as per original implementation
    const update = cart.filter(i => i.id !== id);
    setCart(update);
    calculation(update);
    alert("Removed from view (Update Redux logic to make permanent)");
  }

  return (
    <>
      <Container className="py-5">
        <h2 className='fw-bold mb-4 text-dark'>Shopping Cart <span className="text-muted fs-4">({cart.length} items)</span></h2>

        <Row>
          <Col lg={8} md={12}>
            {cart && cart.length > 0 ? (
              cart.map((v, i) => {
                return (
                  <div key={i} className='glass rounded-4 p-3 mb-4 d-flex align-items-center gap-4 card-hover shadow-sm border-0'>
                    <div className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                      <img src={v.thumbnail} alt="" className="w-100 h-100 object-fit-contain" />
                    </div>

                    <div className='flex-grow-1'>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="fw-bold mb-1">{v.title}</h5>
                          <p className="text-muted mb-1 fs-7">{v.category}</p>
                          <div className='fw-bold text-dark fs-5'>${v.price} <span className="text-success fs-7 ms-2">-{v.discountPercentage}% Off</span></div>
                        </div>
                        <Button variant="light" className="text-danger rounded-circle p-2" onClick={() => removeitem(v.id)}>
                          <IoIosTrash size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-5 glass rounded-4">
                <p className="text-muted fs-5">Your cart is empty.</p>
              </div>
            )}
          </Col>

          <Col lg={4} md={12}>
            <div className="glass rounded-4 p-4 sticky-top border-0" style={{ top: '100px' }}>
              <h4 className="fw-bold mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3 text-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 text-success">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>

              <hr className="my-4 opacity-10" />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5">${totalBill.toFixed(2)}</span>
              </div>

              <Button className="w-100 py-3 rounded-3 btn-primary-custom fw-bold shadow-sm">
                Checkout Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Cartpage

