import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import './Login.css'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const ApiUrl = import.meta.env.VITE_AUTH_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }   

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        navigate('/home', {replace: true})
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const userDetails = {email:email, password:password,}
            const url = `${ApiUrl}/login`
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
                setEmail('')
                setPassword('')
                onSubmitSuccess(data.jwtToken)
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

    const githubCallback = () => {
        window.location.href = `${ApiUrl}/github`;
    }

    const onForgetPassword = async() => {
        try {
            const url = `${ApiUrl}/forgot-password`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                alert(data.message);
            } else {
                setErrorMsg(data.message)
                setError(true)  
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="login-body">
            <form className='login-form' onSubmit={onSubmitForm}>
                <h2 className='login-header'>Login</h2>
                <div className="oauth-container">
                    <div className="google-auth-container" onClick={googleCallback}>
                        <FcGoogle size="30" /><p>Google</p>
                    </div>
                    <div className="google-auth-container" onClick={githubCallback}>
                        <FaGithub size="30" /><p>Github </p>
                    </div>
                </div>
                <p className='or'>or</p>
                <input type="email" placeholder='Email' onChange={onChangeEmail} value={email}  />
                <input type="password" placeholder='Password' onChange={onChangePassword} value={password}  />                
                {error && <p className="error-msg">*{errorMsg}</p>}
                <p className="forget-password-link" onClick={onForgetPassword}>forget password</p>
                <button className='login-button' type="submit">Login</button>
                <p className='login-option'>Don't have an account? <a href="/">Signup</a></p>
            </form>
        </div>
    )
}

export default Login