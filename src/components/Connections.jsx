import axios from "axios"
import { useEffect } from "react"
import { BASE_URl } from "../config"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../redux/connectionSlice"

const Connections = () => {

    const dispatch = useDispatch()

    const connections = useSelector(store => store.connection)
    
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                let res = await axios.get(BASE_URl+"/user/connections", {
                    withCredentials: true
                })
                dispatch(addConnections(res?.data?.data))
            }catch(error) {
                console.error(error)

            }
           
        }

        fetchConnections()
        
    }, [])
    if(connections?.length === 0) return <h1 className="flex justify-center mt-20 opacity-50">No connections found</h1>
    return (
        <div>
        <ul className="list bg-base-100 rounded-box shadow-md">

        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Connection</li>
        {
            connections?.map(elm => (
                <li key={elm._id} className="list-row">
                    <div><img className="size-10 rounded-box" src={elm?.profilePhoto}/></div>
                    <div>
                    <div>{elm?.firstName + " " + elm?.lastName}</div>
                    </div>
                </li>
            ))
        }
        
        
        
        
        </ul>
    </div>
    )
}

export default Connections