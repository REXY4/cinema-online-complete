import{useContext} from "react";
import {Modal, Button, Row, Col} from "react-bootstrap";
import { UserContext } from "../contexts/userContext";

function ModalNotLogin({status}){
    const [state, dispatch] = useContext(UserContext);
   
   
    const handleLogin = () =>{
        dispatch({
            type : "LOGIN_OPEN"
        })
    };

 

    const handleClose = () =>{
        dispatch({
            type : "MODAL_POPUP_CLOSE"
        })
        window.location.reload();
    };
    return (
        <>
      

      <Modal show={state.modalPopUp} onHide={handleClose}>
        <Modal.Body style={{
            background : "#ffff",
            borderRadius  : "50px", 
            color : "#469F74", 
            fontWeight : "bold",
            letterSpacing : "3px",
            textAlign : "center"}}>{status}
     
        </Modal.Body>
      </Modal>
    </>
    )
}

export default ModalNotLogin;