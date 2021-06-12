import React, {
  useContext,
  useState,

} from "react";

import {
  useHistory
}from "react-router-dom"

import "./login.css";

import {
    Modal,
    Button,
    Form
} from "react-bootstrap";

//userCONTEXT
import { UserContext} from "../../contexts/userContext";
import {API, setAuthToken} from "../../config/api";


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
                <span className="text-title">Login</span>
            </Modal.Title>
            <Form 
            onSubmit={props.onSubmit}
            >
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="email"
                    name="email" 
                    placeholder="Email" 
                    value={props.valueEmail}
                    onChange={props.onChangeEmail}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="password"
                    name="password" 
                    className="password-login"
                    placeholder="Password" 
                    value={props.valuePassword}
                    onChange={props.onChangePassword}/>
                </Form.Group>
                <Button id="buttonLogin" type="submit">
                    Login
                </Button>
                <span className="text-link">
                    Don't have an account ? Klik <a href="#" onClick={props.link}>Here</a>
                </span>
            </Form>
        </Modal.Body>
        
      </Modal>
    );
  }
            
            
  
  function Login(e) {
      const [state, dispatch] = useContext(UserContext)
      const router = useHistory();


  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
      email: "",
      password: "",
  });

  const { email, password } = form;

  const onChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  };

  const onSubmit = async () => {
      try {
          const config = {
              headers: {
                  "Content-Type": "application/json"
              }
          }
          const body = JSON.stringify({
              email,
              password
          });

          const response = await API.post("/login", body, config);
            
              setMessage(response.data.message);
          
            setAuthToken(response.data.data.user.token); 
         
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data.user
            });
            window.location.reload()
      } catch (error) {
          console.log(error);
      }
  }

      const handleOpen = () =>{
        dispatch({
          type : "LOGIN_OPEN"
        })
      }
      
      const handleClose = () =>{
        dispatch({
          type : "LOGIN_CLOSE"
        })
      }

      const handleLink = () =>{
        dispatch({
          type : "LOGIN_CLOSE"
        })
        dispatch({
          type : "REGISTER_OPEN"
        })
      }

      const handleRoute = () =>{
        return router.push("/")
      }

    return (
      <>
        <Button variant="link"
        style={{
            color : "#E8E8E8"
        }} 
        onClick={() => handleOpen()}>
          Login
        </Button>
  
        <MyVerticallyCenteredModal
          onSubmit={(e)=>{
            e.preventDefault();
            handleRoute()
            onSubmit();
          }}
           
          valueEmail={email}
          onChangeEmail={(e) => onChange(e)}
          valuePassword={password}
          onChangePassword={(e)=>onChange(e)}
          show={state.loginModal}
          onHide={()=>handleClose()}
          link={()=>handleLink()}
        />
      </>
    );
  }
  
export default Login;

