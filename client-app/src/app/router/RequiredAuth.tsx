import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequiredAuth(){
    const {userStore} = useStore();
    const {isLoggedIn} = userStore;

    const location = useLocation();

    if(!isLoggedIn){
        return <Navigate to='/' state={{from: location}}/>
    }

    return <Outlet/>
}