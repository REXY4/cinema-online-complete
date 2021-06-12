import React, {
    useState
} from "react";

import "./imagedropdown.css"

import {
    Dropdown,
    Image
} from "react-bootstrap";

import ModalImage from "./ModalImage";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
     
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
        >
           
     
             <ModalImage/>  
          
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
  
 const ImageDropDown = () =>{

 return (
     <>
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
        <Image src="/img/camera.svg" className="camera"/>
       
      </Dropdown.Toggle>
  
      <Dropdown.Menu as={CustomMenu}>
     
      
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}


export default ImageDropDown;