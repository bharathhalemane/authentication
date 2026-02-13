import './App.css'
import Signup from './Authentication/Signup/Signup.jsx'
import Login from './Authentication/Login/Login.jsx'
import ResetPassword from './Authentication/ResetPassword/ResetPassword.jsx'
import Home from './Home/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
