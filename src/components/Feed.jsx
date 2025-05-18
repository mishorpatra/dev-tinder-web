import axios from "axios"
import { BASE_URl } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../redux/feedSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Card from "./Card"

const Feed = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const feed = useSelector(store => store.feed)

    const fetchData = async () => {
        if(feed?.length !== 0) return
        try {
            let res = await axios.get(BASE_URl+'/user/feed', {
                withCredentials: true
            })
            dispatch(addFeed(res.data.data))

            
        }catch(error) {
            console.error(error)
            if(error?.status === 403) navigate("/login")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(feed?.length === 0) return (
        <h1 className="flex justify-center mt-20 opacity-50">Feed is empty</h1>
    )
    return (
        feed && (
            <Card user={feed[0]} />
        )
    )
}

export default Feed