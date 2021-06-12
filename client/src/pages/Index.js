import React, {
    useState,
    useContext,
    useEffect,
} from "react";

import {
    useHistory,
    useParams
} from "react-router-dom";
 
import {UserContext} from "../contexts/userContext";
import {API} from "../config/api";

import { 
    Row, 
} from "react-bootstrap";

import Carousels from "../components/landingpages/Carousels";
import CardIndex from "../components/Card";
import ModalPopUp from "../components/ModalPopUp";

function Index(){
    const [state,dispatch] = useContext(UserContext);
    const [stateUserLogin, ] = useContext(UserContext);
    let history = useHistory();
    
    let {id} = useParams();
     id = stateUserLogin?.user?.id;
    
    const [film, setFilm ] = useState([]);
    
   
     const loadRaiseFund = async () => {
       try {
        const response = await API.get(`/films`);
         setFilm(response.data.data.film);
         console.log(response.data.data.film[0]); 
         
       } catch (error) {
         console.log(error);
       }
     };
     useEffect(() => {
       loadRaiseFund();
     }, []);

     const handleHistory = (filmId) =>{
        return history.push("/detailfilm/"+ filmId)
    }

    const handleModalNotLogin = () =>{
      
        dispatch({
            type : "MODAL_POPUP_OPEN"
        })
    }
    return (
        <> 
            <Row>
                
                    <Carousels/> 
                

            </Row>
            <Row className="rowIndexListFilm">
                <h1 className="listFilm">List Film</h1>     
            </Row>
            <Row className="mt-3 mb-5">
                 {film?.slice(0, 5).map((item)=>
                    <CardIndex image={item.thumbnail} onClick={
                        state.isLogin ? 
                        ()=>handleHistory(item?.id)
                        : ()=>handleModalNotLogin()
                    }/>
                    )} 
     
            </Row>  
              
            <ModalPopUp status={"you have to Login!!!"}/>
                        
        </>

    )
}

export default Index;