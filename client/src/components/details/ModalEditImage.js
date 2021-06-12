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


  const FormFilm = ({idFilm, image}) =>{
    console.log(image)
    const [modalShow, setModalShow] = React.useState(false);
    const [picture, setPicture] = useState();
    const [imgData, setImgData] = useState(null);
    const [stateUserLogin, ] = useContext(UserContext);
    let route = useHistory()
    const [form, setForm] = useState({

      thumbnail : null,
    });
  
 
  
    const onChange = (e) => {
      
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
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

    const onSubmit = async () => {
        try {
            
            const  headers = {
                    "Content-type": "multipart/form-data"
                }
            

            const formData = new FormData();
            formData.append("imageFile", form.thumbnail[0], form.thumbnail[0].name);
                
            const response = await API.patch(`/thumbnail/${idFilm}`, formData, headers);

            setForm(response)


        } catch (error) {
            console.log(error);
        }
    }
    return (
  <>
      <Form onSubmit={(e)=>{
   
        onSubmit(e);
   
      }}>
                   <Form.Group controlId="formBasicUpload" className="colGroub" >
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
               >Attach Thumbnail <Image src={"/img/addThumbnail.svg"} alt="thumbnail"/></span></label>  
                <input id="files" style={{visibility:"hidden"}} type="file"
                name="thumbnail"
                onChangeCapture={(e) => onChange(e)} 
              
                />
               
            </div>                            
            </Form.Group>
            <Form.Group>

            <div className="ml-3">
              <Image src={
                imgData === null ? image : imgData
               } style={{
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
              Change picture
          </Button>
          
       </Form>
       
     
      </>
  );
  };
        
                      
  
         
         
      
              
  
  
  
  const ModalEditImage = ({filmId}) => {
  
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
        <h1 className="editProfileTitle">Change Picture</h1>
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