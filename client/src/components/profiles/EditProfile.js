import { 
  useContext, 
  useState
} from "react";

import {  useHistory } from "react-router-dom";

import {UserContext} from "../../contexts/userContext";

import "./editprofile.css"

import {
Form, 
Modal, 
Button,
Image
} from "react-bootstrap";

import {API} from "../../config/api"
import ModalPopUp from "../ModalPopUp";





const FormProfile = () =>{

const [stateUserLogin, dispatch] = useContext(UserContext);

let router = useHistory()  

   
    const [form, setForm] = useState({
      fullName: stateUserLogin?.user?.fullName,
      phone: stateUserLogin?.user?.phone,
    });
    
  
    const { fullName , email, phone } = form;
  
    const onChange = (e) => {
    
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const onSubmit = async (e) => {
      
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await API.patch(
          `/user/${stateUserLogin?.user?.id}`,
          JSON.stringify(form),
          config
        );
        
       setForm(response.data.data.user[0])
      window.location.reload();
} catch (error) {
    console.log(error);
  }
}

const handlePopUp = () =>{
  dispatch({
    type :"MODAL_POPUP_OPEN"
  })
} 


return (
<>
  <ModalPopUp status="edit data success"/>
    <Form onSubmit={(e)=> {
      e.preventDefault();
      onSubmit(e);
      handlePopUp();
    }
  }>
  
      
                    
     
    <Form.Group controlId="formBasicPassword">
        <Form.Control  
        type="text"
        placeholder={stateUserLogin?.user?.fullName}
        className="input-login" 
        value={fullName}
        onChange={(e) => onChange(e)} name="fullName"
        />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
        <Form.Control  
        type="email"
        placeholder={stateUserLogin?.user?.email}
        className="input-login" 
        value={email}
        onChange={(e) => onChange(e)} name="email"
        readOnly/>
    </Form.Group>

   

    <Form.Group controlId="formBasicPassword">
        <Form.Control  
        type="text"
        placeholder="0812xxxxxx"
        className="input-login" 
        value={phone}
        onChange={(e) => onChange(e)} name="phone"
        />
    </Form.Group>

        <Button  
        className="mt-4" 
        type="submit"
        style={{ backgroundColor : "#CD2E71", border : "1px solid white", width : "100% "}} 
        >
            EDIT
        </Button>
        
     </Form>
     
   
    </>
);
};

       
       
    
            



const Edit = () => {

const [show, setShow] = useState(false);

return (
<>
<a className="nav-logins" type="button"  onClick={() => setShow(true)}>
      <Image src="/img/pengaturan.png" id="pengaturan"/>
    </a>

<Modal
  show={show}
  onHide={() => setShow(false)}
  contentClassName="custom-modal"
  dialogClassName="modal-90w"
  aria-labelledby="example-custom-modal-styling-title"
  style={{background : "rgba(255, 255, 255, 0.042)"}}
>
  
     
  
  <Modal.Body>
    <div className="pt-4 ">
      <h1 className="editProfileTitle">Edit Profile</h1>
    </div>
    <FormProfile/>
  </Modal.Body>
</Modal>
</>
);
}

export default Edit;