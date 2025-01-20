import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice';


function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());  
    localStorage.removeItem('token');  
    navigate('/Login');  
  };
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4" aria-label="Second navbar example">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Always expand</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Shop">Shop</NavLink>
          </li>
          {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/CartComponent">Sebet</NavLink>
              </li>
            )}
         <li className="nav-item">
              <NavLink className="nav-link" to="/Login" onClick={user ? handleLogout : null}>
                {user ? 'Exit' : 'Login'}
              </NavLink>
            </li>
        </ul>
     
      </div>
    </div>
  </nav>
  )
}

export default Nav