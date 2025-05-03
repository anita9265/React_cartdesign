import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { IoIosStar } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addcart } from '../slice/productslice';

function Product() {

    const [product,setproduct]=useState([]);
    const [category,setcategory]=useState([]);
    const [valsearch,setvalsearch]=useState([]);
  const dispatch=useDispatch();

    useEffect(()=>{
      axios.get('https://dummyjson.com/products')
      .then(function (response) {
        // handle success
        // console.log(response.data.products);
        setproduct(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    },[])

    useEffect(()=>{
      axios.get('https://dummyjson.com/products/categories')
      .then(function (response) {
        // handle success
        // console.log( response.data);
        setcategory(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    },[])

    // caterory

    function change_c (val){
       var  n = '';
       if (val === 'all'){
          n='https://dummyjson.com/products';

      }else{
        n='https://dummyjson.com/products/category/'+val;
      }
      axios.get(n)
      .then(function (response) {
    
        setproduct(response.data.products);
      })
      .catch(function (error) {
      
        console.log(error);
      })
      .finally(function () {
        
      });

    }

    function search(e) {
     var tar = e.target.value
      setvalsearch(tar);
          axios.get('https://dummyjson.com/products/search?q='+tar)
              .then(function (response) {
                  setproduct(response.data.products);
              })
              .catch(function (error) {
                  console.log(error);
              });
      
  }
    


  return (
    <>
    
    {/************************ main container *********************/}
      <Container fluid>
     
            <Row>
                    <Col lg={3} md={3} sm={3} xs={12}  className='bg-light category'>
                    <aside className="m-0 p-3 aside_con py-7 sticky-sidebar">
                            <h4 className='bg-dark text-white'>Categories</h4>
                            <ul className="list-group my-4">
                           <strong><li onClick={()=>{change_c('all')}} className='list-group-item'>show all</li></strong>
                                  {
                                       category && category.map((v,i)=>{
                                          return(
                                            
                                              <div key={i}>
                                               
                                                  <li className='list-group-item' onClick={()=>{change_c(v.name)}}>{v.name}</li>
                                              </div>
                                          )
                                        })
                                      }
                  
                                   
                            </ul>
                  </aside>
                    </Col>
               
                    <Col lg={9} md={9} sm={9} xs={12}>
                    <input type="text"  placeholder='search product' className='border rounded-4 shadow text-capitalize text-left w-100 fs-5 my-3 ps-4 py-2'  value={valsearch} onChange={search} />
                        <Row className=''>
                            {
                                  product.map((v,i)=>{
                                    return(
                                        <Col key={i} lg={4} md={4} sm={4} xs={12} className='p-2 mb-md-5 mb-sm-5 mb-xs-5'>
                                           <div className='bg-white product_box'>
                                              <img src={v.thumbnail} alt=""  width={'100%'}/>
                                                <div className='p_content'>
                                                    <h4 className="text-capitalize pt-1">{v.title}</h4>
                                                    {/* <h5>{v.category}</h5> */}
                                                    <div className='fs-5'><b>{v.price}</b>  $ -{v.discountPercentage}%</div>
                                                    <IoIosStar className='bg-silver'/>
                                                    <IoIosStar className='bg-silver' />
                                                    <IoIosStar className='bg-silver'/>
                                                    <IoIosStar className='bg-silver'/>
                                                     
                                                 
                                                   
                                                    <div className='d-flex justify-content-between c_btn mt-3'>
                                                        <Link className='bg-dark rounded-3 text-capitalize text-decoration-none text-white px-4 py-1' onClick={()=>{dispatch(addcart(v)); alert(`${v.title} has been added to the cart!`)}}>add to cart</Link>
                                                        <Link to={`/detail/${v.id}`}className='bg-danger rounded-3 text-capitalize text-decoration-none text-white px-4 py-1'>view detail</Link>
                                                    </div>
                                                </div>
                                            
                                           </div>
                                        </Col>
                                    )
                                  })
                            }
                        </Row>
                    
                    </Col>
            </Row>

      </Container>
    
    
    </>
  )
}

export default Product