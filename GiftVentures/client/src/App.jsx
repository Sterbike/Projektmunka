import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserProfile from './pages/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
              <Route path='/login' element={<Login />} /> 
              <Route path='/register' element={<Register />} />
              <Route path='/userprofile' element={<UserProfile />}/>
              <Route/>
              <Route/>
              <Route/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
