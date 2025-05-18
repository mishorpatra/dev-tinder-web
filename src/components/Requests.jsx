import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URl } from "../config"
import axios from "axios"
import { addRequests, removeRequest } from "../redux/requestSlice"

const Requests = () => {

    const dispatch = useDispatch()

    const requests = useSelector(store => store.request)
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                let res = await axios.get(BASE_URl+"/requests/received", {
                    withCredentials: true
                })
                dispatch(addRequests(res?.data?.data))
            }catch(error) {
                console.error(error)

            }
           
        }

        fetchRequests()
        
    }, [])

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URl+"/review/"+status+"/"+_id, {}, {
                withCredentials: true
            })
            dispatch(removeRequest(_id))
        }catch(error) {
            console.error(error)
        }
    }

    if(requests?.length === 0) return (
        <h1 className="flex justify-center mt-20 opacity-50">No connection requests found</h1>
    )
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
  
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Connection Requests</li>
            {
                requests?.map(elm => (
                    <li key={elm._id} className="list-row">
                        <div><img className="size-10 rounded-box" src={elm?.fromUserId?.profilePhoto}/></div>
                        <div>
                        <div>{elm?.fromUserId?.firstName + " " + elm?.fromUserId?.lastName}</div>
                        </div>
                        <button className="btn bg-red-400" onClick={() => reviewRequest("rejected", elm._id)}>
                            Reject
                        </button>
                        <button className="btn bg-blue-700" onClick={() => reviewRequest("accepted", elm._id)}>
                            Accept
                        </button>
                    </li>
                ))
            }
            
            
            
            
            </ul>
        </div>
    )
}

export default Requests