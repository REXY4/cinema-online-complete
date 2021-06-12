import {useState} from "react";

import { 
    useParams,
    useHistory
 } from "react-router-dom";

import {
    Button,
    Modal,
    Row,
    Col
} from "react-bootstrap";

import { API } from "../../config/api";

function DeleteModal() {
    const [show, setShow] = useState(false);
    const [film, setFilm] = useState([]);
    const param = useParams();
    const route = useHistory()
    
    const handleDelete = async () =>{
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const response = await API.delete(
                 `/film/${param.id}`,
                 
                 config
               );
               
              route.push("/listfilm") 
            } catch (error) {
                console.log(error)
            }
        }
      
        return (
          <>
            <Button   onClick={() => setShow(true)}
            style={{
                backgroundColor : "#CD2E71",
                width : "100px",
                borderRadius : "10px" 
            }}>
              Delete
            </Button>
      
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              
              <Modal.Body>
                <Row className="p-4">
                    <h1>Are you sure to delete it?</h1>
                </Row>
                <Row className="d-flex justify-content-end p-3">
                    <Col className="col-sm-5">
                    <Button
                          style={{
                            backgroundColor : "#CD2E71",
                            width : "100px",
                            borderRadius : "10px" 
                        }}
                        onClick={() => setShow(false)}
                        >Cancel</Button>
                    </Col>
                    <Col>
                         <Button
                          style={{
                            backgroundColor : "#CD2E71",
                            width : "100px",
                            borderRadius : "10px" 
                        }}
                        onClick={() =>{ 
                            handleDelete();
                            setShow(false)}}
                        >Yes</Button>
                    </Col>
                        
                </Row>
              </Modal.Body>
            </Modal>
          </>
        );
      }
      
      export default DeleteModal;
        
              
           
        
              