import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { IoStar } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { addcart } from '../slice/productslice';

function Page1() {
  const { id } = useParams();
  const [dproduct, setdproduct] = useState('');
  const [img, setimg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setdproduct(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!dproduct) return <div className="text-center py-5">Loading...</div>;

  return (
    <Container className="py-5">
      <Row className="g-5">
        {/* Left Column: Images */}
        <Col xs={12} md={6} lg={5} className="position-relative">
          <div className="sticky-top" style={{ top: '100px', zIndex: '10' }}>
            <div className="bg-white rounded-4 p-4 shadow-md mb-4 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              <img
                src={img || dproduct.thumbnail}
                alt={dproduct.title}
                className="img-fluid rounded-3 object-fit-contain"
                style={{ maxHeight: '400px', width: 'auto' }}
              />
            </div>

            <div className='d-flex gap-3 overflow-auto pb-2'>
              {dproduct.images && dproduct.images.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setimg(v)}
                  className={`bg-white rounded-3 p-1 shadow-sm border cursor-pointer ${img === v ? 'border-primary' : ''}`}
                  style={{ minWidth: '80px', width: '80px', height: '80px' }}
                >
                  <img src={v} alt="" className="w-100 h-100 object-fit-cover rounded-2" />
                </div>
              ))}
            </div>

            <div className="d-flex gap-3 mt-4">
              <Button
                onClick={() => { dispatch(addcart(dproduct)); alert(`${dproduct.title} added!`) }}
                className="btn-primary-custom flex-grow-1 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              >
                <FaShoppingCart /> Add to Cart
              </Button>

              <Button
                variant="dark"
                className="flex-grow-1 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              >
                <ImPower /> Buy Now
              </Button>
            </div>
          </div>
        </Col>

        {/* Right Column: Details */}
        <Col xs={12} md={6} lg={7}>
          <div className="glass rounded-4 p-5 shadow-sm border-0 h-100">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-primary-custom fw-bold text-uppercase letter-spacing-1 fs-7">{dproduct.category}</span>
              <div className="d-flex align-items-center text-warning fs-6">
                <IoStar className="me-1" />
                <span className="fw-bold text-dark">{dproduct.rating}</span>
                <span className="text-muted ms-1 fs-7">({dproduct.reviews?.length} reviews)</span>
              </div>
            </div>

            <h1 className="fw-bold text-dark mb-3 display-5">{dproduct.title}</h1>
            <p className="text-muted fs-5 lh-base mb-4">{dproduct.description}</p>

            <div className="d-flex align-items-center gap-3 mb-5">
              <h2 className="display-6 fw-bold text-dark mb-0">${dproduct.price}</h2>
              {dproduct.discountPercentage > 0 && (
                <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fs-7">
                  SAVE {dproduct.discountPercentage}%
                </span>
              )}
            </div>

            <hr className="opacity-10 my-4" />

            <div className="row g-4 mb-5">
              <div className="col-6">
                <small className="text-muted d-block mb-1 text-uppercase fw-bold fs-7">Brand</small>
                <span className="fs-5 fw-medium text-dark">{dproduct.brand || 'Generic'}</span>
              </div>
              <div className="col-6">
                <small className="text-muted d-block mb-1 text-uppercase fw-bold fs-7">Availability</small>
                <span className={`fs-5 fw-medium ${dproduct.stock > 0 ? 'text-success' : 'text-danger'}`}>
                  {dproduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="col-6">
                <small className="text-muted d-block mb-1 text-uppercase fw-bold fs-7">Warranty</small>
                <span className="fs-5 fw-medium text-dark">{dproduct.warrantyInformation || 'Standard'}</span>
              </div>
              <div className="col-6">
                <small className="text-muted d-block mb-1 text-uppercase fw-bold fs-7">Return Policy</small>
                <span className="fs-5 fw-medium text-dark">{dproduct.returnPolicy || '30 Days'}</span>
              </div>
            </div>

            {/* QR Code Section */}
            {dproduct.meta?.qrCode && (
              <div className="bg-white p-3 rounded-3 shadow-sm d-inline-block border">
                <img src={dproduct.meta.qrCode} alt="QR Code" width="80" height="80" />
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-5">
              <h4 className="fw-bold mb-4">Customer Reviews</h4>
              <div className="d-flex flex-column gap-3">
                {dproduct.reviews && dproduct.reviews.map((v, i) => (
                  <div key={i} className="bg-white p-3 rounded-3 shadow-sm border-start border-4 border-primary">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary" style={{ width: 32, height: 32 }}>
                          {v.reviewerName.charAt(0)}
                        </div>
                        <span className="fw-bold text-dark">{v.reviewerName}</span>
                      </div>
                      <div className="text-warning fs-7">
                        {[...Array(5)].map((_, idx) => (
                          <IoStar key={idx} className={idx < v.rating ? "text-warning" : "text-muted opacity-25"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted mb-0 fs-6 fst-italic">"{v.comment}"</p>
                    <small className="text-muted opacity-50 mt-2 d-block fs-7">{new Date(v.date).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Page1;
