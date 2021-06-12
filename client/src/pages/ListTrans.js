import {useState, useEffect, useContext} from "react"
import { Container,  NavItem,  Row, Table } from "react-bootstrap";

import DropDownTrans from "../components/listtrans/DropDown";
import {API} from "../config/api";
import TableList from "../components/listtrans/Table";

function ListTrans(){

    // LOAD/READ DATA
       const [transaction, setTransaction] = useState([])
    const loadTransaction = async () => {

       try {
           
           const response = await API.get("/transaction");
           setTransaction(response.data.data.transaction);
           console.log(response.data.data.transaction)
          
       } catch (error) {
           console.log(error);
       }
   }
   
   useEffect(() => {
    loadTransaction();
}, []);

const toNumber = (num) =>{
    let d = "";
    let j = "hallo world"
    for(let i = 1;i <= num;i++){
         d += i
    }
  
}

    return (
        <>
            <Container className="ml-5 mt-4">
                <Row className="mb-5">
                    <h1 className="titleTrans">Incoming Transaction</h1>
              
                </Row>
                <Row className="mb-5">
                    <TableList/>
                </Row>
            </Container>
        </>
    )
}

export default ListTrans;