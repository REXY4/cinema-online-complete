import React,{
  useContext,

  useState, 
} from "react";

import {
  useHistory
} from "react-router-dom";

import "./register.css";

import {
    Modal,
    Button,
    Form,
    Alert
} from "react-bootstrap";


import { UserContext } from "../../contexts/userContext";
import {API, setAuthToken } from "../../config/api"
import ModalPopUp from "../ModalPopUp";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        className="modalLogin"
        contentClassName="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       
    
        <Modal.Body className="modal-body">
            <Modal.Title 
            id="contained-modal-title-vcenter"          
            className="loginTitle">
                <span className="text-title">Register</span>
            </Modal.Title>
            <Form 
            onSubmit={props.onSubmit}>
              <div>
                {props.message}
              </div>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="email"
                    name="email"
                    placeholder="Email"
                    value={props.valueEmail}
                    onChange={props.onChangeEmail} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="password" 
                    className="password-login"
                    placeholder="Password" 
                    name="password"
                    value={props.valuePassword}
                    onChange={props.onChangePassword} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="text" 
                    className="password-login"
                    placeholder="Full Name" 
                    name="fullName"
                    value={props.valueFullName}
                    onChange={props.onChangeFullName}/>
                </Form.Group>
                <Button id="buttonLogin" type="submit">
                    Register
                </Button>
                <span className="text-link">
                Already have an account ? Klik <a href="#" onClick={props.link}>Here</a>
                </span>
            </Form>
        </Modal.Body>
        
      </Modal>
    );
  }
            
            
  
  function Register() {
    
    const [state, dispatch] = useContext(UserContext);
  
    const [message, setMessage] = useState("");

    let route = useHistory();


    const [form, setForm] = useState({
      fullName: "",
      email: "",
      password: "",
    });
  
    const { fullName , email, password } = form;
  
    const onChange = (e) => {
      e.preventDefault(e)
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await API.post(
          "/register",
          JSON.stringify(form),
          config
        );
  
        setMessage(response.data.message);
  
        if(MessageChannel.length === 0) {
          setForm(response.data.message);
        }
         
         dispatch({
          type: "REGISTER_SUCCESS",
          payload: response.data.data.user,
        });
 

   
        setAuthToken(response.data.data.user.token);

       window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  
   
    const handleOpen = () =>{
      dispatch({
        type : "REGISTER_OPEN"
      })
    }

    const handleClose = () =>{
      dispatch({
        type : "REGISTER_CLOSE"
      })
    }

    const handleLink=()=>{
      dispatch({
        type : "REGISTER_CLOSE"
      })
      dispatch({
        type : "LOGIN_OPEN"
      })
    }
    

    return (
      <>
        <Button
        style={{
            backgroundColor : "#CD2E71"
        }} 
        onClick={() => handleOpen()}>
          Register
        </Button>
        <ModalPopUp status="Register success"/>
        <MyVerticallyCenteredModal
          onSubmit={(e)=>{
            e.preventDefault(e)
            onSubmit(e)}}
            message={message && (
              <Alert className='text-center' variant={"danger"}>
                {message}
              </Alert>
             
            )}
            valueEmail={email}
            valuePassword={password}
            valueFullName={fullName}
            onChangeEmail={(e) => onChange(e)}
            onChangePassword={(e) => onChange(e)}
            onChangeFullName={(e) => onChange(e)}
          show={state.registerModal}
          onHide={() => handleClose()}
          link={()=>handleLink()}
        />
      </>
    );
  }
  
export default Register;