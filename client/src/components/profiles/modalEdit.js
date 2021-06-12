import React, {
    useContext,
    useState,
} from "react";

import {
    Form,
    Modal,
    Button
} from "react-bootstrap";

import {useHistory} from "react-router-dom"; 

import { UserContext } from "../../contexts/userContext";
import {API} from "../../config/api";


export const EditNames = ()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          edit name
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              edit name
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export const EditEmail =()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit Email
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              edit name
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export const EditPassword =()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit Email
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              edit name
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export const EditPhone =({button})=> {
    const [show, setShow] = useState(false);
    const [, dispatch] = useContext(UserContext);
    const [stateUserLogin, dispatchUserLogin] = useContext(UserContext);
    const [idForUpdate, setIdForUpdate] = useState(null);
    
    let route = useHistory();
  
    const [form, setForm] = useState({
      email : stateUserLogin?.user?.email,
      fullName : stateUserLogin?.user?.fullName,
      phone : "",
      image : null,
    });
  
     
  
    const getTodoById = async () => {
        const id = stateUserLogin?.user?.id;
      try {
          
          const response = await API.get(`/user/`+id);
          const user = response.data.data.users[0];
          setIdForUpdate(user.id);
  
          setForm({
              email: user.email ? user.email : "",
          
              image : user.image ? user.image : "",
              fulName : user.fullName ? user.fullName : "",
              phone : user.phone ? user.phone : "",
          })
  
      } catch (error) {
          console.log(error)
      }
  }
  
  
    const onChange = (e) => {
        console.log(form)
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    };
  
    const handleSubmit = async () => {
      const id = stateUserLogin?.user?.id;
  
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
  
            const formData = new FormData();
            formData.set("email", form.email);
            formData.append("imageFile", form.image[0], form.image[0].name);
            formData.set("fullName", form.fullName);
            formData.set("phone", form.phone);
            
        
            const response = await API.patch(`/user/${id}`, formData, config);
            
            console.log(response);
  
            setIdForUpdate("");
  
           
        } catch (error) {
            console.log(error);
        }
    }
  
    const handleRoute = () =>{
      return route.push("/profile")
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}
        >
           {button === null ? <span>Add Phone Number</span> : <span>Edit Phone NUmber</span>}
        </Button>
  
        <Modal
         size="sm"
         aria-labelledby="contained-modal-title-vcenter"
         centered
         show={show} onHide={handleClose}>

          <Modal.Body>
              <Form onSubmit={(e)=> {
              e.preventDefault()
              handleSubmit(e);
            }
              
            }>
                  <Form.Group>
                  <Form.Control type="text" placeholder="0812xxxxx" name="phone" value={form.phone}
                  onChange={(e) => onChange(e)} />
                  </Form.Group>
                  <button type="submit" onClick={handleSubmit}>
                      {button === null ? <span>Add Phone Number</span> : <span>Edit Phone NUmber</span>}
                  </button>
              </Form>
          </Modal.Body>
          
        </Modal>
      </>
    );
  }

