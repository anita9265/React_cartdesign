import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Card, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { IoStar } from "react-icons/io5";

function Page1() {
  const { id } = useParams();
  const [dproduct, setdproduct] = useState('');
  const [img, setimg] = useState('');
  

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setdproduct(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Container fluid className="py-5">
      <Row className="g-4">

        <Col  xs={12} md={5} lg={5}   className="align-items-center" style={{ position: 'sticky', top: '20px',  zIndex: '100' }}
        >
            <img  src= { img || dproduct.thumbnail} alt={dproduct.title}      
            className="rounded shadow-lg img-fluid"
            style={{ width: '100%', objectFit: 'cover' }}
          />
         <div className='d-flex justify-content-center'>
         {
            dproduct && dproduct.images.map((v,i)=>{
              return(
                   <div>
                        <img src={v} alt=""  width={'100'} onClick={()=>setimg(v)} className='border p-2 shadow-sm me-4 mt-3'/>
                   </div>
              )
            })
          }
        
         </div>
          <div className="d-flex justify-content-between w-100 mt-4">
            <Button variant="danger" className="d-flex align-items-center bg-dark justify-content-center rounded w-100 mb-3 me-4 py-2" style={{ backgroundColor: "#FF5733", border: "none" }} >
              <FaShoppingCart className="me-2" />
              Add to Cart
            </Button>
      
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center rounded w-100 mb-3 py-2"
              style={{ backgroundColor: "#28A745", border: "none" }}
            >
              <ImPower className="me-2" />
              Buy Now
            </Button>
          </div>
        </Col>

   
        <Col
          xs={12} md={7} lg={7} 
          style={{
            overflowY: 'auto',
            maxHeight: '80vh',  
           
          }}
        >
          <div className="border-0 p-4 shadow-sm mb-3">
            <h2 className="text-dark fw-bold">{dproduct.title}</h2>
            <p className="text-muted">{dproduct.description}</p>

            <div className="d-flex align-items-center mb-3">
              <Button
                variant="success"
                className="d-flex align-items-center fw-bold px-2 py-1"
                style={{ backgroundColor: "#28A745", border: "none", fontSize: "15px" }}
              >
                <IoStar className="text-warning me-2" />
                {dproduct.rating}
              </Button>
            </div>

            <div className="mb-4">
              <h3 className="text-success fw-bold">${dproduct.price}</h3>
            </div>

            <div className="mb-3">
              <div><strong>Category:</strong> {dproduct.category}</div>
              <div><strong>Brand:</strong> {dproduct.brand}</div>
              <div><strong>Stock:</strong> {dproduct.stock}</div>
              <div><strong>Weight:</strong> {dproduct.weight}</div>
              <div><strong>Warranty:</strong> {dproduct.warrantyInformation}</div>
            </div>

            <div className="mt-4">
              <h5 className="fw-bold">Customer Reviews</h5>
              {
                  dproduct.reviews && dproduct.reviews.map((v, i) => (
                    <div key={i} className="border p-3 rounded mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold">Rating: {v.rating}</span>
                        <IoStar className="text-warning" />
                      </div>
                      <p className="text-muted">{v.comment}</p>
                      <small className="text-muted">By {v.reviewerName} on {v.date}</small>
                    </div>
                  ))
                }

            </div>

            <div className="mt-4">
              <div><strong>Return Policy:</strong> {dproduct.returnPolicy}</div>
              <div><strong>Minimum Order Quantity:</strong> {dproduct.minimumOrderQuantity}</div>
              <div><strong>Created At:</strong> {dproduct.meta?.createdAt}</div>
              <div><strong>Updated At:</strong> {dproduct.meta?.updatedAt}</div>
              <div><strong>Barcode:</strong> {dproduct.meta?.barcode}</div>
             
              <img src={dproduct.meta?.qrCode} alt=""  width={'100'} className='border p-2 shadow-sm me-4 mt-3'/>
                 
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Page1;
