import React,{
    useContext,
    useState,

} from "react";

import {
    useHistory
} from "react-router-dom";

import {UserContext} from "../contexts/userContext";
import {API} from "../config/api";

import {
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";



function AddFilm(){
    const [, dispatch] = useContext(UserContext);
    const [stateUserLogin, dispatchUserLogin] = useContext(UserContext);
    const [form, setForm] = useState({
      userId: stateUserLogin?.user?.id,
      title: "",
      category: "",
      price: null,
      filmUrl: "",
      description: "",
      thumbnail: null,
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
            formData.set("title", form.title);
            formData.append("imageFile", form.thumbnail[0], form.thumbnail[0].name);
            formData.set("category", form.category);
            formData.set("price", form.price);
            formData.set("filmUrl", form.filmUrl);
            formData.set("description", form.description);
        
            const response = await API.post("/film", formData, config);

            console.log(response);
          

        } catch (error) {
            console.log(error);
        }
    }

    const handleRoute = () =>{
        return route.push("/listfilm");
    } 
    return (
        <>
        <Container className="container-add mt-3">
          
            <Row className="mb-4">
                <h1 className="addFilmTitle">Add Film</h1>
            </Row>
            <Row className="mb-5" >
            <Form onSubmit={(e)=>{
                e.preventDefault(e)
                 handleSubmit(e);
                 handleRoute(e)
               
            }}>
                <Row>
                    <Col className="col-sm-8">
                    <Form.Control placeholder="Title"
                    className="addTitle"
                    name="title"
                    value={form.title}
                    onChange={(e) => onChange(e)}/>
                    </Col>
                    <Col>
                    <Form.Group controlId="formBasicUpload" className="colGroub mt-2" >
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
               >Attach Thumbnail <img src={"/img/addThumbnail.svg"}
                /></span> </label>  
                <input  name="proofAttachment" id="files" style={{visibility:"hidden"}} type="file"
                name="thumbnail"
                onChangeCapture={(e) => onChange(e)} 
              
                />
               
            </div>                            
            </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="exampleForm">
                        
                            <Form.Control type="text"
                            placeholder="Category"
                            className="exampleForm"       
                            custom 
                             name="category"
                             value={form.category}
                             onChange={(e) => onChange(e)}>
                              
                            </Form.Control>
                </Form.Group>

                        <Form.Group controlId="exampleForm">
                               
                                <Form.Control type="number"
                                className="exampleForm"
                                name="price" 
                                placeholder="Price" 
                                name="price"
                                value={form.price}
                                onChange={(e) => onChange(e)}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm">
                               
                               <Form.Control type="text"
                               className="exampleForm"
                               name="filmUrl" 
                               placeholder="Link Film"
                               
                                value={form.filmUrl}
                                onChange={(e) => onChange(e)}/>
                       </Form.Group>          
                       <Form.Group controlId="exampleForm.ControlTextarea1" >
                            
                            <Form.Control as="textarea" rows={10} 
                            placeholder="description"
                            className="exampleForm" 
                            name="description"
                               value={form.description}
                             onChange={(e) => onChange(e)}/>
                        </Form.Group> 
                        <div className="d-flex justify-content-end ">
                        <Button className="buttonAdd btn-light mt-4" type="submit">
                            Add Film</Button>                   

                        </div>
                </Form>
            </Row>
            </Container>
        </>
    )
}

export default AddFilm;