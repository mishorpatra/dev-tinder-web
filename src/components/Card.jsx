import axios from "axios"
import { BASE_URl } from "../config"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../redux/feedSlice"


const Card = ({ user }) => {

    const dispatch = useDispatch()

    const sendRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URl+"/connection/"+status+"/"+userId, {}, {
                withCredentials: true
            })

            dispatch(removeUserFromFeed(userId))

        }catch(error) {
            console.error(error)
        }
    }
    return (
        <div className="card bg-base-200 w-96 shadow-sm mx-auto mt-30">
        <figure>
            <img className="h-100"
            src={user?.profilePhoto}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user?.firstName+ " " +user?.lastName}</h2>
            {user?.age && user?.gender && <p>{user?.age + ", " + user?.gender}</p>}
            <p>{user?.about}</p>
            <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={() => sendRequest("ignored", user?._id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => sendRequest("interested", user?._id)}>Interested</button>

            </div>
        </div>
        </div>
    )
}

export default Card