import axios from "axios"
import { useState } from "react"
import { BASE_URl } from "../config"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import Card from "./Card"

const EditProfile = ({ profile }) => {

    const [user, setUser] = useState(profile)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }

    const saveProfile = async () => {
        try {
            let res = await axios.patch(BASE_URl+'/profile', {
                firstName: user?.firstName,
                lastName: user?.lastName,
                age: user?.age,
                gender: user?.gender,
                about: user?.about,
                profilePhoto: user?.profilePhoto
            }, {
                withCredentials: true
            })

            dispatch(addUser(res?.data?.data))
            setShowToast(true)

            setTimeout(() => {
                setShowToast(false)
            }, 3000)
            
        }catch(error) {
            console.error(error)
            setError(error.response.data)
        }
    }

    return (
        <div className="flex items-center">
        <div className="card card-dash bg-base-300 w-96 mx-auto mt-10">
        <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <p>First Name</p>
            <input type="text" name="firstName" onChange={handleChange} value={user?.firstName} placeholder="First Name" className="input" />
            <p>Last Name</p>
            <input type="text" name="lastName" onChange={handleChange} value={user?.lastName} placeholder="Last Name" className="input" />
            <p>Age</p>
            <input type="text" name="age" onChange={handleChange} value={user?.age} placeholder="Age" className="input" />
            <p>Gender</p>
            <input type="text" name="gender" onChange={handleChange} value={user?.gender} placeholder="Gender" className="input" />
            <p>Photo</p>
            <input type="text" name="profilePhoto" onChange={handleChange} value={user?.profilePhoto} placeholder="Photo" className="input" />
            <p>About</p>
            <textarea className="textarea" name="about" onChange={handleChange} value={user?.about}  placeholder="About"></textarea>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary mt-4" onClick={saveProfile} >Save Profile</button>
            </div>
        </div>
        </div>
        {
                user && <Card user={user} />
            }

            {showToast && <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile