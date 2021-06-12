import { 

    useState
  } from "react";
  
  import {
  Form, 
  Modal, 
  Button,
  Image,
  
  } from "react-bootstrap";
  
  import {API} from "../../config/api"
  
  
  
  
  
  
  const FormFilm = ({idFilm,titleFilm,filmPrice, filmLink, filmCategory, filmDescription}) =>{
console.log(filmCategory)
    const [form, setForm] = useState({
      title : titleFilm ,
      price : filmPrice,
      category : filmCategory,
      filmUrl : filmLink,
      description : filmDescription,
    })
    const {
      title,
      price,
      category,
      filmUrl,
      description,
    } = form;

    const onChange = (e) =>{
      console.log(form)
      setForm({
        ...form,
        [e.target.name] : e.target.value,
      })
    }

    const onSubmit = async (e) =>{
      try { 
     
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await API.patch(
          `/film/`+ idFilm,
          JSON.stringify(form),
          config
          )
          
        setForm(response)
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    }

    return (
  <>
      <Form onSubmit={(e)=>{
     
        onSubmit(e);
      }}>
     <Form.Group controlId="formBasicPassword">
          <Form.Control name="title" 
          type="text"
          className="input-login"
          placeholder={titleFilm}
          value={title}
          onChange={(e)=>onChange(e)} 
          />    
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
          <Form.Control  name="category"
          type="text"
          className="input-login"
          placeholder={"category"}
          value={category}
          onChange={(e)=>onChange(e)} 
          />    
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
          <Form.Control  name="filmUrl"
          type="text"
          className="input-login"
          placeholder={filmLink}
          value={filmUrl}
          onChange={(e)=>onChange(e)} 
          />    
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
          <Form.Control  name="price"
          type="text"
          className="input-login"
          placeholder={filmPrice}
          value={price} 
          onChange={(e)=>onChange(e)}
          />    
       </Form.Group>
        <Form.Group>
         <Form.Control name="description"
          as="textarea"
          placeholder={filmDescription}
          value={description}
          onChange={(e)=>onChange(e)}
          style={{ height: '100px', width : "350px", margin : "15px" }}
          />
       </Form.Group>
          <Button  
          className="mt-4" 
          type="submit"
          style={{ backgroundColor : "#CD2E71", border : "1px solid white", width : "350px", marginLeft : "15px" , fontWeight : "bold",
          letterSpacing : "8px"}} 
          >
              Edit
          </Button>
          
       </Form>
       
     
      </>
  );
  };
        
                      
  
         
         
      
              
  
  
  
  const ModalEditFilm = ({filmId, title, price, category, description, filmUrl}) => {
  
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
        <h1 className="editProfileTitle">Edit Film</h1>
      </div>
      <FormFilm
      filmLink={filmUrl}
      idFilm={filmId}
      titleFilm={title}
      filmPrice={price}
      filmDescription={description}
      filmCategory={category}/>
    </Modal.Body>
  </Modal>
  </>
  );
  }
  
  export default ModalEditFilm;