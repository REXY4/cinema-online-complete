import React,{
    useContext
} from "react";

import {
    Container,
    Navbar,
    Image,
    Nav
} from "react-bootstrap";

import { useHistory } from "react-router-dom";
//CSS
import "./navbar.css"
//component
import Login from "./Login";
import Register from "./Register";
import DropDown from "./Dropdown";
import { UserContext } from "../../contexts/userContext";


function NavigationBar(){
    const [state, disptach] = useContext(UserContext);
    const [stateUserLogin, dispatchUserLogin] = useContext(UserContext);
    let route = useHistory();
    const handleRouteHome=()=>{
        return route.push("/")
      }
  
    return(
        <>
        <Container fluid className="navHeader">
            <Container>
                <Navbar>
                    <Navbar.Brand href="/" onClick={()=>handleRouteHome()}>
                        <Image src={"/img/logo.svg"}/>
                    </Navbar.Brand>
                 
                   
                        <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                {!state.isLogin ? 
                                (
                                    <div>
                                <Navbar.Text>
                                    <Login/>
                                </Navbar.Text>
                                <Navbar.Text className="ml-3">
                                    <Register/>
                                </Navbar.Text>
                                </div>
                                ) :
                                (
                                 <div>
                                     {stateUserLogin?.user?.id === 1 ?
                                     ( 
                                      <Navbar.Text className="mr-5" >   
                                        <Nav.Link href="/transaction" 
                                       >
                                         <span className="textLink">Transaction</span>
                                        </Nav.Link>  
                                        </Navbar.Text> 
                                     )
                                        :
                                        (
                                            <>
                                          
                                            <Navbar.Text className="mr-5" >   
                                            <Nav.Link href="/buyfilm" 
                                           >
                                            <span className="textLink">
                                               Buy Film
                                             </span>
                                            </Nav.Link>  
                                            </Navbar.Text>    
                                            </> 
                                        )
                                            
                                    }
                                  
                                <Navbar.Text >   
                                <Nav.Link href="/profile" >
                          `             <span className="textLinkName">{
                                            stateUserLogin?.user?.fullName}
                                        </span> 
                                </Nav.Link>
                                </Navbar.Text> 

                                <Navbar.Text className="ml-4">
                                    <DropDown/>
                                    </Navbar.Text>
                                
                                </div>
                               )
                                }
                                        
                                        
                                          
                        </Navbar.Collapse>
                </Navbar>
            </Container>
        </Container>    
        </>
    )
}

export default NavigationBar;