import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URl } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../redux/userSlice"
import { useEffect } from "react"

const Body = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(store => store.user)

    const fetchData = async () => {
        if(user) return
        try{
            let res = await axios.get(BASE_URl+"/profile", {
                withCredentials: true
            })

            dispatch(addUser(res.data))

        }catch(error) {
            console.log(error)
            navigate("/login")
        }
    }
    
    useEffect(() => {
       
        fetchData()
    }, [])
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body