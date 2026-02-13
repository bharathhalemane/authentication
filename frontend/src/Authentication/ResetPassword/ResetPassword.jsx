import './ResetPassword.css'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'

const ApiUrl = import.meta.env.VITE_AUTH_API_URL;

const ResetPassword = () => {

    const token = useParams().token
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const onSubmitSuccess = () => {
        navigate('/login', { replace: true })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const passwordDetails = { password: password, confirmPassword: confirmPassword }
            const url = `${ApiUrl}/reset-password/${token}`
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(passwordDetails)
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                setError(false)
                setErrorMsg('')
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

    return (
        <div className="reset-password-body">
            <form className='reset-password-form' onSubmit={onSubmitForm}>
                <h2 className='reset-password-header'>Enter new Password</h2>
                <input type="password" placeholder='Password' onChange={onChangePassword} value={password} />
                <input type="password" placeholder='Confirm Password' onChange={onChangeConfirmPassword} value={confirmPassword} />
                {error && <p className='reset-password-error-message'>{errorMsg}</p>}
                <button className='reset-password-button' type="submit">set password</button>
            </form>
        </div>
    )
}

export default ResetPassword