import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Button, Grid, Input, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/Shop');
            })
            .catch(() => {
                message.error(error?.message || 'Giriş mümkün olmadı!');
            });
    };

    return (
        <div style={{ width: '100%', display: 'grid', placeItems: 'center', height: '100vh', }}>
            <div style={{ padding: '20px', width: '400px' }}>
                <h2>Login</h2>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Name"
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Year"
                    style={{ marginBottom: '10px' }}
                />
                <Button
                    type="primary"
                    onClick={handleLogin}
                    loading={loading}
                    style={{ width: '100%' }}
                >
                    Login
                </Button>


                {error && <p style={{ color: 'red' }}>{error?.message || 'Bir xəta baş verdi'}</p>}
            </div>
        </div>
    );
};

export default Login;