import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice'; 
import { Card, Col, Row, Spin, Alert, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;

function Shop() {
    const dispatch = useDispatch();
    const { products = [], loading, error } = useSelector((state) => state.products || {})
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/Login'); 
        }  }, [navigate]);


    useEffect(() => {
        dispatch(getAllProduct());
        
    }, []);
    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); 
      };
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
        </div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Alert message="Error" description={error} type="error" />
        </div>;
    }


    return (
        (
            <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col span={8} key={product.id}>
                  <Card
                    hoverable
                    style={{ height: '400px' }} 
                  >
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        alt={product.title}
                        src={product.image}
                        style={{
                          width: '100%',   
                          height: '100%',  
                          objectFit: 'contain'  
                        }}
                      />
                    </div>
                    <Meta
                      title={product.title}
                      description={`$${product.price}`}
                      style={{ marginTop: '10px' }} 
                    />
                     <Button 
                  type="danger" 
                  style={{ marginBottom: '10px' }} 
                  onClick={() => handleAddToCart(product)}
                >
                  Buy
                </Button>

                
             
              
                
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

        ))
}

export default Shop