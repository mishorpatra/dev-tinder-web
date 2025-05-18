import { useState } from "react"
import axios from "axios"
import { BASE_URl } from "../config"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"

const initialValues = {
    email: "",
    password: ""
}

const Login = () => {

    const [creds, setCreds] = useState(initialValues)
    const dispatch = useDispatch()

    const [isLoginForm, setIsLoginForm] = useState(true)

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        try {
            let res = await axios.post(BASE_URl+"/signin", creds, {
                withCredentials: true
            })
            dispatch(addUser(res.data))
            navigate("/")

        }catch(error) {
            console.log(error)
            setError(error?.response?.data)
        }
       
    }

    const handleSignup = async () => {
        try {
            let res = await axios.post(BASE_URl+"/signup", creds, {
                withCredentials: true
            })
            dispatch(addUser(res.data.data))
            navigate("/profile")
        }catch(error) {
            console.log(error)
            setError(error?.response?.data)
        }
    }

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm)
    }

    return (
        <div className="card card-dash bg-base-300 w-96 mx-auto mt-30">
        <div className="card-body">
            <h2 className="card-title">Login</h2>
            <p className="mt-4" >Email</p>
            <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
            </svg>
            <input onChange={handleChange} name="email" type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">Enter valid email address</div>
           {!isLoginForm && <>
                <p>First Name</p>
                <input type="text" name="firstName" onChange={handleChange} value={creds?.firstName} placeholder="First Name" className="input" />
                <p>Last Name</p>
                <input type="text" name="lastName" onChange={handleChange} value={creds?.lastName} placeholder="Last Name" className="input" />

            </>}
            
            <p className="mt-4">Password</p>
            <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
            </svg>
            <input
                type="password"
                required
                name="password"
                onChange={handleChange}
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            </label>
            <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-primary mt-4" onClick={isLoginForm?  handleLogin : handleSignup} >{isLoginForm ? "Login":"Signup"}</button>
            
            </div>
            <p className="cursor-pointer flex justify-center mt-4" onClick={toggleForm}>
                {
                    isLoginForm ? "New User? Sign up" : "Existing user? Login"
                }
            </p>
        </div>
    </div>
    )
}

export default Login