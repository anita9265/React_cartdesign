import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { IoIosStar, IoIosStarHalf, IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addcart } from '../slice/productslice';

function Product() {

  const [product, setproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [valsearch, setvalsearch] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(function (response) {
        setproduct(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(function (response) {
        setcategory(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  // caterory
  function change_c(val) {
    setActiveCategory(val);
    var n = '';
    if (val === 'all') {
      n = 'https://dummyjson.com/products';

    } else {
      n = 'https://dummyjson.com/products/category/' + val;
    }
    axios.get(n)
      .then(function (response) {
        setproduct(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function search(e) {
    var tar = e.target.value
    setvalsearch(tar);
    axios.get('https://dummyjson.com/products/search?q=' + tar)
      .then(function (response) {
        setproduct(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Container fluid className="px-md-5 px-3">
        <Row>
          {/* SIdebar */}
          <Col lg={2} md={3} className="d-none d-md-block">
            <div className="glass rounded-4 p-3 sticky-top shadow-lg" style={{ top: '100px' }}>
              <h6 className='fw-bold mb-3 px-2 text-dark'>Categories</h6>
              <div className="d-flex flex-column gap-1" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div
                  onClick={() => { change_c('all') }}
                  className={`px-3 py-2 rounded-3 cursor-pointer transition-all fs-7 ${activeCategory === 'all' ? 'bg-primary-custom text-white shadow-md' : 'text-muted hover-bg-light'}`}
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                >
                  All Products
                </div>
                {category && category.slice(0, 15).map((v, i) => (
                  <div key={i}
                    onClick={() => { change_c(v.name || v) }} // dummyjson categories can be objects or strings depending on version
                    className={`px-3 py-2 rounded-3 cursor-pointer transition-all fs-7 ${activeCategory === (v.name || v) ? 'bg-primary-custom text-white shadow-md' : 'text-muted'}`}
                    style={{ cursor: 'pointer', fontSize: '14px' }}
                  >
                    <span className="text-capitalize">{v.name || v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={10} md={9}>
            {/* Search Bar */}
            <div className="mb-4 position-relative">
              <IoIosSearch className="position-absolute text-muted" style={{ top: '50%', left: '20px', transform: 'translateY(-50%)', fontSize: '1.2rem' }} />
              <input
                type="text"
                placeholder='Search for products...'
                className='form-control border-0 shadow-sm rounded-pill py-2 ps-5 bg-white fs-6'
                value={valsearch}
                onChange={search}
                style={{ paddingLeft: '50px' }}
              />
            </div>

            <Row>
              {product.map((v, i) => {
                return (
                  <Col key={i} lg={3} md={6} sm={6} xs={12} className='mb-4'>
                    <div className='bg-white rounded-4 p-3 h-100 d-flex flex-column shadow-md border-0 card-hover'>
                      <div className="position-relative mb-3 rounded-4 overflow-hidden" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
                        <img src={v.thumbnail} alt="" className="w-100 h-100 object-fit-contain mix-blend-multiply transition-transform hover-scale" />
                        <div className="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 fs-7 fw-bold shadow-sm text-danger" style={{ fontSize: '12px' }}>
                          -{v.discountPercentage}%
                        </div>
                      </div>

                      <div className='flex-grow-1 d-flex flex-column'>
                        <div className="text-muted text-uppercase fw-bold mb-1 letter-spacing-1" style={{ fontSize: '10px' }}>{v.category}</div>
                        <h6 className="text-dark fw-bold text-capitalize text-truncate mb-2" title={v.title} style={{ lineHeight: '1.4', fontSize: '15px' }}>{v.title}</h6>

                        <div className="d-flex align-items-center mb-3 text-warning" style={{ fontSize: '12px' }}>
                          <IoIosStar />
                          <IoIosStar />
                          <IoIosStar />
                          <IoIosStar />
                          <span className="text-muted ms-1 text-dark fw-medium">({v.rating})</span>
                        </div>

                        <div className='mt-auto d-flex align-items-end justify-content-between'>
                          <div>
                            <div className="text-decoration-line-through text-muted" style={{ fontSize: '12px' }}>${(v.price / (1 - v.discountPercentage / 100)).toFixed(2)}</div>
                            <div className='fw-bold text-dark' style={{ fontSize: '18px' }}>${v.price}</div>
                          </div>
                          <Button
                            onClick={() => { dispatch(addcart(v)); alert(`${v.title} added!`) }}
                            className="rounded-circle p-0 d-flex align-items-center justify-content-center btn-primary-custom shadow-lg hover-scale"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <span className="fs-5 mb-1">+</span>
                          </Button>
                        </div>

                        <Link to={`/detail/${v.id}`} className='btn btn-outline-light text-dark w-100 mt-3 rounded-pill fw-bold border-muted hover-bg-dark hover-text-white transition-all' style={{ fontSize: '13px' }}>View Details</Link>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Product
