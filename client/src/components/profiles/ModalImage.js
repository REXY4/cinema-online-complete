import React, {
  useState,
  useContext
} from "react";

import {
  Modal,
  Button,
  Form,
  Image
} from "react-bootstrap"

import {
useHistory
} from "react-router-dom";

import { UserContext } from "../../contexts/userContext";
import {API} from "../../config/api"; 
import ModalPopUp from "../ModalPopUp";

const FormFilm = ({idFilm}) =>{
  const [picture, setPicture] = useState();
  const [imgData, setImgData] = useState(null);
  const [stateUserLogin, dispatch] = useContext(UserContext);
  
  const [form, setForm] = useState({

    avatar : null,
  });

  const onChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ?
          e.target.files : e.target.value
      });
      if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    
       

  };

  const onSubmit = async (event) => {
      try {
          
          const  headers = {
                  "Content-type": "multipart/form-data"
              }
          

          const formData = new FormData();
          formData.append("imageFile", form.avatar[0], form.avatar[0].name);
          
              const response = await API.patch(`/avatar/${stateUserLogin?.user?.id}`, formData, headers);
              setForm(response);
              console.log(response)
      } catch (error) {
          console.log(error);
      }
  }

  const handlePopUp=()=>{
    dispatch({
      type : "MODAL_POPUP_OPEN"
    })
  }
  return (
<>
<ModalPopUp status="add image success"/>
    <Form onSubmit={(e)=>{
      e.preventDefault(e)
      onSubmit(e);
      handlePopUp();
    }}>
                 <Form.Group controlId="formBasicUpload" className="colGroub ml-3" >
          <div>

              <label for="files" class="btn"
                style={{
                  backgroundColor : "rgba(210, 210, 210, 0.25)",
                  width :"159px",
                  height : "45px",
                  borderRadius : "5px",
                  color : "white",
                  fontSize : "14px"
              }}
              ><span className="textUpload"
             >Attach Avatar <Image src={"/img/addThumbnail.svg"} alt="AVATAR"/></span></label>  
              <input id="files" style={{visibility:"hidden"}} type="file"
              name="avatar"
              onChangeCapture={(e) => onChange(e)} 
            
              />
             
          </div>                            
          </Form.Group>
          <Form.Group>

          <div className="ml-3">
            <Image src={
              imgData === null ? stateUserLogin?.user?.avatar : imgData} style={{
              width : "350px",
              height :"200px"
            }}/>
          </div>
          </Form.Group>
        <Button  
        className="mt-4" 
        type="submit"
        style={{ backgroundColor : "#CD2E71", border : "1px solid white", width : "350px", marginLeft : "15px" , fontWeight : "bold",
        letterSpacing : "8px"}} 
        >
           {stateUserLogin?.user?.id === null ? "Add Avatar" : "Change Avatar"}
        </Button>
        
     </Form>
     
   
    </>
);
};
      
                    

       
       
    
            



const ModalEditImage = ({filmId}) => {
const [stateUserLogin, ] = useContext(UserContext);
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
      <h1 className="editProfileTitle">
        {stateUserLogin?.user?.avatar === null ? "Add Avatar" : "Change Avatar"}
        </h1>
    </div>
    <FormFilm
      idFilm={filmId}
      />
  </Modal.Body>
</Modal>
</>
);
}

export default ModalEditImage;