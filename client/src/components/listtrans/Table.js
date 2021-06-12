 
import {useState, useEffect} from "react"
import {  Table } from "react-bootstrap";

import DropDownTrans from "./DropDown";
import {API} from "../../config/api";


function TableList(){

       const [transaction, setTransaction] = useState([])
     
    const loadTransaction = async () => {
       
       try {
           
           const response = await API.get("/transaction");
           setTransaction(response.data.data.transaction);
      
       } catch (error) {
           console.log(error);
       }
   }
   
   useEffect(() => {
    loadTransaction();
}, []);

const number = [];

    return (
        <>
           
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Bukti Transfer</th>
                        <th>Film</th>
                        <th>Number Account</th>
                        <th>Status Payment</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        
                    
                     { transaction?.map((trans, index)=>{
                       return ( <tr>
                            <td >
                                {number.push(index)}
                            </td>
                            <td>{trans.user.fullName}</td>
                            <td>{trans.transferProof.slice(43,)}</td>
                            <td>{trans.films.title}</td>
                            <td>{trans.accountNumber}</td>
                            {trans.status === "Pending" ? 
                              <td style={{
                                  color : "#F7941E",
                                  fontWeight : 500,
                                  lineHeight : "22px",
                                  fontStyle : "normal",
                                  fontSize : "14px",
                                }}>{trans.status}</td> :
                                ""
                                } 
                              {trans.status === "Approved" ? 
                              <td style={{
                                  color : "#0ACF83",
                                  fontWeight : 500,
                                  lineHeight : "22px",
                                  fontStyle : "normal",
                                  fontSize : "14px",
                                }}>{trans.status}</td> :
                                ""
                                } 
                                 {trans.status === "Cancel" ? 
                              <td style={{
                                  color : "#FF0742",
                                  fontWeight : 500,
                                  lineHeight : "22px",
                                  fontStyle : "normal",
                                  fontSize : "14px",
                                }}>{trans.status}</td> :
                                ""
                                }
                                  {trans.status === "Finished" ? 
                              <td style={{
                                  color : "#0ACF83",
                                  fontWeight : 500,
                                  lineHeight : "22px",
                                  fontStyle : "normal",
                                  fontSize : "14px",
                                }}>{"Approved"}</td> :
                                ""
                                }    
                               
                            <td><DropDownTrans transId={trans.id} stat={trans.status}/></td>

                         </tr>)
                     })}    

                    </tbody>
                </Table> 
        </>
    )
}

export default TableList;



