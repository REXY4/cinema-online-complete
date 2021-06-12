import {useContext} from "react";

import {Route, Redirect} from "react-router-dom";

import {UserContext} from "../contexts/userContext";

const PrivateRoute = ({component : Component, path, ...rest }) =>{
  const [state] = useContext(UserContext);
  const {isLogin} = state;
  
   
    return <Route 
                
                {...rest}  
                render={
                    (props)=> isLogin ? <Component {...props}/> : <Redirect to={{
                      pathname : "/",
                      state : {
                        isLogin : state.isLogin
                      }
                    }}/>
                     
                }
                /> 
}

export default PrivateRoute;