import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import { Button, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function CartComponent() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart);  // Cart məlumatları redux-dan alırıq
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/Login'); 
        }  }, [navigate]);



  return (
    <div>
      <Title level={2}>Səbət</Title>

      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        locale={{emptyText:"sepetiniz boşdur",}}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>,
              <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>,
              <Button danger onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={`Price: $${item.price * item.quantity} | Quantity: ${item.quantity}`}
            />
          </List.Item>
        )}
      />

      

      <div>
        <Title level={3}>Ümumi Qiymət: ${calculateTotal().toFixed(2)}</Title>
      </div>

      <Button type="danger" onClick={() => dispatch(clearCart())}>
        Səbəti Boşalt
      </Button>
    </div>
  );
}

export default CartComponent;