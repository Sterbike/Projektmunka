import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userRole = userData ? userData.role : null;
  
    const navigate = useNavigate();
  
    async function Signout() {
      navigate("/signoutconfirm")
    }

  return (
    <div className='navbar-container'>
        <Link to={"/"}>Home</Link>
    </div>
  )
}

export default Navbar