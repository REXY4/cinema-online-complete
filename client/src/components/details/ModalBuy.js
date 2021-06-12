import React, {
  useContext,
  useState,

} from "react";

import "./modal.css";

import {
  useHistory, useParams
} from "react-router-dom"

import {
    Modal,
    Button,
    Row,
    Form
} from "react-bootstrap";

import {UserContext} from "../../contexts/userContext";
import {API} from "../../config/api";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        className="modalHeader"
        aria-labelledby="contained-modal-title-vcenter"
        contentClassName="modal-buy"
        centered
      >
       
        
        <Modal.Body>
            <Row className="justify-content-center mt-4 mb-4">
                <h1 className="titleBuy">
                     Cinema<span className="titleOnline">Online</span> : 0981312323
                </h1>
            </Row>
            <Row id="rowInput">
                <h1 className="titleFilm">
                    props.title
                </h1>
            </Row>
            <Row id="rowInput">
               
                <h1 className="totalPrice">
                    Total : <span className="priceModal">Rp.{props.price} </span>
                </h1>
              
            </Row>
            <Form onSubmit={props.submit}>
            <Row id="rowInput">
              
                <Form.Group controlId="formInputText">
                    <Form.Control type="text"
                    name="accountNumber" 
                    className="password-login "
                    placeholder="Account Number"
                    value={props.valueNumber}
                    onChange={props.onChangeNumber}/>
                </Form.Group>
            </Row>
            <Row id="rowInput">
            <Form.Group controlId="formBasicUpload" className="colGroub" >
            <div>

                <label for="files" class="btn"
                  style={{
                    backgroundColor : "#CD2E71",
                    width :"159px",
                    height : "45px",
                    borderRadius : "10px",
                    color : "white",
                    fontSize : "14px"
                }}
                ><span className="textUpload"
               >Attach Payment <img src="/img/payment.svg"
                /></span> </label>  <span style={{
                    color : "#616161",
                    fontSize : "12px",
                }}>transfers can be made to film accounts</span>
                <input  name="transferProof" id="files" style={{visibility:"hidden"}} type="file" onChange={props.onChangeImage}
              
                />
               
            </div>                            

            </Form.Group>
           
            </Row>
            <Row className="justify-content-center">
                <button className="buttonPay">Pay</button>
            </Row>
            </Form>
        </Modal.Body>
       
      </Modal>
    );
  }
  
  function ModalBuy({price , filmid}) {
    const [stateUserLogin, dispatch] = useContext(UserContext);
    const [modalShow, setModalShow] = React.useState(false);
    const param = useParams()
    
    const [form, setForm] = useState({
      userId: stateUserLogin?.user?.id,
      filmId: parseInt(param.id),
      accountNumber: null,
      transferProof: null,
    });
      

  
    let route = useHistory();
 
    const onChange = (e) => {
        console.log(form)
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    };

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("userId", form.userId);
            formData.set("filmId", form.filmId);
            formData.append("imageFile", form.transferProof[0], form.transferProof[0].name);
            formData.set("accountNumber", form.accountNumber);
        
        
            const response = await API.post(`/transaction/${stateUserLogin?.user?.id}/${parseInt(param.id)}`, formData, config);

            console.log(response);
          

        } catch (error) {
            console.log(error);
        }
    }

    const handleRoute = () =>{
        return route.push("/detailfilm/"+param.id);
    } 
    const handleOpen =()=>{
      setModalShow(true)
    }

    const handleClose =()=>{
      setModalShow(false)
    }

    const openPopup =()=>{
      dispatch({
        type : "POPUP_BUY_OPEN"
      })
    }
    return (
      <>
        <Button className="detailBuy btn-light" 
        onClick={() => handleOpen()}>
            Buy Now
        </Button>
  
        <MyVerticallyCenteredModal
          submit={(e)=>{
            e.preventDefault(e)
             handleSubmit(e);
             handleRoute(e)
             handleClose()
             openPopup(e)
            }}
           
          onChangeNumber={(e)=>onChange(e)}
          onChangeImage={(e)=>onChange(e)}
          valueNumber={form.accountNumber}
          price={price}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default ModalBuy