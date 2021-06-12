import React, {
    useContext,
    useState,
    useEffect,
    useRef
} from "react";

import ReactPlayer from "react-player/youtube";
import {Image} from "react-bootstrap";

import "./display.css";
import { UserContext } from "../../contexts/userContext";
import {API} from "../../config/api";
import ModalPopUp from "../ModalPopUp";




function DisplayFilm({idFilm, image, urlFilm}){
    const [stateUserLogin, dispatch] = useContext(UserContext);
    const [transaction, setTransaction] = useState([]);
    const vidRef = useRef(null);
   
    const loadTransaction = async ()=>{
        try {
            const response = await API.get(
                `/transaction/
                ${stateUserLogin?.user?.id}/
                ${idFilm}`
                );
            setTransaction(response.data.data.transaction);
         
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loadTransaction();
    },[])
 
    const handlePlayVideo = () => {
        dispatch({
            type : "MODAL_POPUP_OPEN"
        });
    }
       

        if( !transaction 
            ){
           
            return(
                <>
                <Image
                src={image}
                style={{
                    width :"800px",
                    height : "350px",
                }} 
                />
               
                <div onClick={()=>handlePlayVideo()}>
                    <Image src={"/img/play.svg"} className={"buttonPlay"}/>
                </div>
             <ModalPopUp status="please buy this film if you want to watch"/>
             </>
            )
        }else if(
            stateUserLogin.user.id === 1 
            ){
  
            return <ReactPlayer
            width={"800px"}
            height={"400px"}
            url={urlFilm}
            controls
            />
        }else if( 
            transaction.status === "Approved" ||
            transaction.status === "Finished"){
            return <ReactPlayer
                    url={urlFilm}
                    width={"800px"}
                    height={"400px"} 
                    controls
                    />    
        }else{
            return(
                 
              <>
                <Image
                src={image}
                style={{
                    width :"800px",
                    height : "350px",
                }} 
                />
                <div onClick={()=>handlePlayVideo()}>
                    <Image src={"/img/play.svg"} className={"buttonPlay"}/>
                </div>
             <ModalPopUp status="you cant watch movie before its appoved"/>
             </>
         
             
            )
        }
            

        
    }  

export default DisplayFilm;



