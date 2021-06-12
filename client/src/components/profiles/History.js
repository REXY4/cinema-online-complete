import React,{
  useContext,
  useState,
  useEffect
} from "react";

import "./history.css";

import {
    Card,
    Row,
    Button
} from "react-bootstrap";

import { UserContext } from "../../contexts/userContext";
import {API} from "../../config/api";
import {idr} from "../../utils"; 

function History(){
    const [stateUserLogin, ] = useContext(UserContext);
    const [transaction, setTransaction] = useState([]);

    const loadTransaction = async ()=>{
        try {
            const response = await API.get(
                "/transaction/"+stateUserLogin?.user?.id
                );
            setTransaction(response.data.data.transaction);
        } catch (error) {
            console.log(error);            
        }
    }

    useEffect(()=>{
        loadTransaction();
    },[]);

    const finishedTransaction = async (id) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const body = JSON.stringify({
            status: "Finished",
          });
            
    
         const response = await API.patch(
            `/transaction/${id}`,
            body,
            config
          );
          
            window.location.reload();
         
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <> 
        { transaction?.filter(item => item.status === "Approved").map((items)=>{

            return (
        <Row className="mb-3">
            <Card style={{
                width : "419px",
                height : "101px",
                backgroundColor : "rgba(205, 46, 113, 0.44)",
            }}>
                    <Card.Body className="cardBody">
                       <Card.Text className="nameHistory">
                           {items.films.title}
                       </Card.Text>
                       <Card.Text className="timeHistory">
                           <span className="dateHistory pr-1">Saturday,</span>
                           <span >12 april 2021</span>
                       </Card.Text> 
                      
                        <Card.Text className="d-flex" >
                          <div className="totalHistory">
                           Total : {idr(items.films.price)}
                           </div>
                        
                        </Card.Text>
                        
                            <div style={{
                                position : "relative",
                                left : "260px",
                                bottom : "50px"
                            }}>

                               <Button onClick={()=>finishedTransaction(items.id)} 
                               style={{
                                   color : "#00FF47",
                                   width : "112px",
                                   height : "19px",
                                   background : "rgb(0, 255, 72, 0.3)",
                                   border : "2px solid rgb(0, 255, 72, 0.1)",
                               }}><span style={{ position :"relative", bottom : "10px"}}>Finished</span></Button>
                            </div>
                           
                       
                        
                       

                    </Card.Body>
            </Card>
        </Row>
            )
    })}
        </>
    )
  
}

export default History;