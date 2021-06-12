import {
  useContext,
} from "react";

import {
  Modal,
  Button
} from "react-bootstrap";
import { UserContext } from "../contexts/userContext";

function BuyPopUp() {
    const [state, dispatch] = useContext(UserContext);

  
    const handleClose = () =>{ 
      dispatch({
      type : "POPUP_BUY_CLOSE"
    });
    window.location.reload();
  };
    const handleShow = () => dispatch({
      type : "POPUP_BUY_OPEN"
    });

    return (
      <>
        <Modal size="lg" show={state.buyOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p style={{color : "#469F74"}}>
              thank you for buying this film, please wait 1x24 hours because your transaction is in process
              </p>
            </Modal.Title>
          </Modal.Header>
         
        </Modal>
      </>
    );
  }
  
  export default BuyPopUp;