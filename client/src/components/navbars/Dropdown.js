import React, {
  useContext,
    useState
} from "react";

import "./dropdown.css";

import {
    Dropdown,
    Image
} from "react-bootstrap";

import {
  useHistory
} from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

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
      const [stateUserLogin , ] = useContext(UserContext);
      return (
        <div
          ref={ref}
          style={style, {height : stateUserLogin?.user?.id === 1 ? "250px" : "210px",}}
          className={className}
          aria-labelledby={labeledBy}
          id="dropdown-toggle"
          >
          
               
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
  
  function DropDowns(){
    const [state, dispatch] = useContext(UserContext)


    
    let route = useHistory();

    const handleLogout=()=>{
      dispatch({
        type :"LOGOUT"
      })
      route.push("/")
    }

    const handleRouteListFilm=()=>{
      return route.push("/listfilm")
    }
    const handleRouteProfile=()=>{
      return route.push("/profile")
    }
    const handleRouteAddFilm = () =>{
      return route.push("/addfilm")
    }
   
    

   return (
       <>
   <Dropdown >
      <Dropdown.Toggle as={CustomToggle} id={"dropdown-custom-components"}
    
      >
           <Image src={state?.user?.avatar === null ? "/img/iconProfile.jpeg" :  state?.user?.avatar } id="fotoProfile"  roundedCircle />
      </Dropdown.Toggle>
     
      <Dropdown.Menu as={CustomMenu} align={"right"} className="mt-3"  >
      <div className="segitiga"></div>
        <Dropdown.Item eventKey="1" className="pt-2 pb-2 item"
        onClick={()=>handleRouteProfile()}
        >
            <Image className={"imageDrop"} src={"/img/iconUser.svg"}/>
            <span className="textIcon">Profile</span>
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" className="pt-3 pb-3 item" 
        onClick={()=>handleRouteListFilm()}>
            <Image className={"imageDrop"} src={"/img/iconList.svg"}/>
            <span className="textIcon">My List Film</span>
        </Dropdown.Item>
        {state?.user?.id === 1 ?  
        <Dropdown.Item eventKey="2" className="pt-1 pb-3 item"  
        onClick={()=>handleRouteAddFilm()}>
            <Image className={"imageDrop"} src="/img/addFilm.svg"/> <span className="textIcon">Add Film</span>
        </Dropdown.Item> : ""
  }
        <div className="strip"></div>
        
        <Dropdown.Item eventKey="3" className="pt-3 pb-1 item"
         onClick={()=>handleLogout()} 
        >
            <Image className={"imageDrop"} src={"/img/logout.svg"}/>
            <span className="textIcon">Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
   
  
   </Dropdown>
    </>
   )
  }


  export default DropDowns;