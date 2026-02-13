import { useState, useEffect } from 'react';
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const ApiUrl = import.meta.env.VITE_AUTH_API_URL;

const Signup = () => { 
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }   

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmitSuccess = ()  => {
        navigate('/login', {replace: true})
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const userDetails = {name:name, email:email, password:password, confirmPassword:confirmPassword}
            const url = `${ApiUrl}/signup`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                console.log("User registered successfully:", data)
                setError(false)
                setErrorMsg('')
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                onSubmitSuccess()
            } else {
                setErrorMsg(data.message)
                setError(true)
            }
        } catch (err) {
            console.error(err.message)
        }
        
    }

    const googleCallback = () => {
        window.location.href = `${ApiUrl}/google`;
    }



    return (
        <div className="signup-body">
            <form className='signup-form' onSubmit={onSubmitForm}>
                <h2 className='signup-header'>Signup</h2>
                <div className="oauth-container">
                    <div className="google-auth-container" onClick={googleCallback}>
                        <FcGoogle size="30" /><p>Google</p>
                    </div>
                    <div className="google-auth-container" onClick={googleCallback}>
                        <FaGithub size="30" /><p>Github</p>
                    </div>
                </div>
                <p className='or'>or</p>
                <input type="text" placeholder='Name' onChange={onChangeName} value={name}  />
                <input type="email" placeholder='Email' onChange={onChangeEmail} value={email}  />
                <input type="password" placeholder='Password' onChange={onChangePassword} value={password}  />
                <input type="password" placeholder='Confirm Password' onChange={onChangeConfirmPassword} value={confirmPassword} />
                {error && <p className="error-msg">*{errorMsg}</p>}
                <button className='register-button' type="submit">Register</button>
                <p className='login-option'>Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    )
}

export default Signup