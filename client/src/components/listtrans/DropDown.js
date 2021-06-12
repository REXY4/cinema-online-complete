import React, {
    useState,
    useContext
}from "react";

import { 
    Dropdown,
 } from "react-bootstrap";



import "./segitiga.css";

import {API} from "../../config/api";
import { Link} from "react-router-dom";
import {UserContext} from "../../contexts/userContext";
import ModalPopUp from "../ModalPopUp";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        onClick(e);
       e.preventDefault(e)
      }}
      id="tombol"
    >
      {children}
      {/* &#x25bc; */}
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
          id="dropdown-toggle"  
        >
        <span className="segitigaTrans"></span>
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  
  function DropDownTrans({transId, stat}){
    const [,dispatch] = useContext(UserContext)


    const approvedTransaction = async (message) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const body = JSON.stringify({
          status: "Approved",
        });
          
  
       const response = await API.patch(
          `/transaction/${transId}`,
          body,
          config
        );
        

       dispatch({
         type : "MODAL_POPUP_OPEN"
       })
       
      } catch (error) {
        console.log(error);
      }
    };

    const cancelTransaction = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const body = JSON.stringify({
          status: "Cancel",
        });
          
  
       const response = await API.patch(
          `/transaction/${transId}`,
          body,
          config
        );
        
     
     
      } catch (error) {
        console.log(error);
      }
    };

    const deleteTransaction = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        
     
  
       const response = await API.delete(
          `/transaction/${transId}`,
          
          config
        );
        
     
     
      } catch (error) {
        console.log(error);
      }
    };

    
 
   return (
   <Dropdown>
     <ModalPopUp status="success"/>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
       
      </Dropdown.Toggle>
      
      <Dropdown.Menu as={CustomMenu} align="right" className="mt-3">
        <Dropdown.Item eventKey="1" onClick={(e)=>{
          approvedTransaction(e)
        }}>
  
            <Link to="/transaction" className="approveToggle">Approved</Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" to="/profile" onClick={(e)=>{
        
          cancelTransaction(e)
         }}>
            <Link to="/transaction" className="cancelToggle">Cancel</Link>
        </Dropdown.Item>
        {stat === "Cancel" ? 
        (
          <Dropdown.Item eventKey="2" onClick={()=>deleteTransaction()}>
          <Link to="/transaction" className="cancelToggle">delete</Link>
          </Dropdown.Item>
        )  : ""
      }
      </Dropdown.Menu>
    </Dropdown>
   )

  }

  export default DropDownTrans;