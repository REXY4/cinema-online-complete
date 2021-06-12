import React, {
    useContext,
    useState,
    useEffect
} from "react";


import {useRouteMatch} from "react-router-dom";

import { UserContext } from "../../contexts/userContext";
import {API} from "../../config/api";
import ModalDetail from "./ModalBuy";
import ModalBuy from "./ModalBuy";

function DisplayFilm({idFilm, price}){
    const [stateUserLogin,] = useContext(UserContext);
    const [transaction, setTransaction] = useState([]);
    
    const loadTransaction = async ()=>{
        try {
            const response = await API.get(
                `/transaction/
                ${stateUserLogin?.user?.id}/
                ${idFilm}`
                );
            setTransaction(response.data.data.transaction[0]);
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{
        loadTransaction();
    },[])

    if(!transaction){
        return null
    }else{
        return <ModalBuy filmid={idFilm} price={price} />
    } 

}
export default DisplayFilm;



