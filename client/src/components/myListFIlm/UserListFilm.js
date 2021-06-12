import { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {Button} from "react-bootstrap";
import { API } from "../../config/api";
import { UserContext } from "../../contexts/userContext";
import CardList from "../Card";

function UserListFilm({list}){
    const [stateUserLogin,] = useContext(UserContext);
    const [film, setFilm] = useState([])
    const route = useHistory();
    console.log(list)
    const LoadFilm = async ()=>{
        try {
            const response = await API.get("/transaction/"+stateUserLogin?.user?.id);
            setFilm(response.data.data.transaction);
            console.log(response.data.data.transaction)
        } catch (error) {
            console.log(error);            
        }
    }

    useEffect(()=>{
        LoadFilm();
    },[]);
    
   
    const handleRouteDetail = (filmId) =>{
        return route.push("/detailfilm/"+ filmId)
    }
    if(list){
        return(
            <> 
         
         {film?.filter(items=>items?.films?.title.slice(0, list.length).toLowerCase() === list.toLowerCase()).map((item)=>{
            if(
                item.status === "Approved" || 
                item.status === "Finished"
            ){
                return <CardList image={item.films.thumbnail}  onClick={()=>handleRouteDetail(item.films.id)}/>
            }
            
            
        })}
        </> 
        )    

    }else{
        return(
            <> 
            {film?.map((item)=>{
            if(
                item.status === "Approved" || 
                item.status === "Finished"
            ){
                return <CardList image={item.films.thumbnail}  onClick={()=>handleRouteDetail(item.films.id)}/>
            }
            
            
        })}
           
        </> 
        )    
    }
}

export default UserListFilm;