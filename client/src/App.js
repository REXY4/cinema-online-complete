import React,{
  useContext,
  useEffect,
  useState
} from "react";
  
import {
  BrowserRouter as Router, 
  Switch,
   Route } from "react-router-dom";



import {UserContext} from "./contexts/userContext";
import PrivateRoute from "./components/PrivateRoute";
import { API, setAuthToken } from './config/api';


//component
import Navbar from "./components/navbars/Navbar";
import {Container, Image} from "react-bootstrap";
//pages
import Index from "./pages/Index";
import MyListFilm from "./pages/ListFilm";
import Profile from "./pages/Profile";
import DetailFilm from "./pages/DetailFilm";
import AddFilm from "./pages/AddFilm";
import ListTrans from "./pages/ListTrans";
import EditFilm from "./pages/EditFilm";
import ScaleLoader from "react-spinners/ScaleLoader";
import PuffLoader from "react-spinners/PuffLoader";
import BuyFilm from "./pages/BuyFilm";
import BuyPopUp from "./components/BuyPopUp";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  const [, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR"
        })
      };

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "AUTH_SUCCESS",
        payload
      })

    } catch (error) {
      dispatch({
        type: "AUTH_ERROR"
      })
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    }, 2000)
  }, [])

  return (
      <>
      {
        loading ?
       <div   className="loading mt-5">
         <div className="d-flex justify-content-end">
         <div>
          <Image src={"/img/logo.svg"} style={{width : "500px"}}/>
         </div>
        <div style={{ 
          position : "relative", top : "60px" , 
          left : "10px"
        }}>
          <ScaleLoader 
          color={color} 
          loading={loading} 
          size={150}
          />
         
        </div>
          <div style={{
            position : "relative",
            right : "505px",
            bottom : "5px",
          }}>
          <PuffLoader 
          color={color} 
          loading={loading} 
          size={150}
          />
          </div>
        </div>
       </div>
           
           
           
        
        :


      <Router>
           <Navbar/>
          <Container>
          <Switch>
           
            <PrivateRoute exact path="/listfilm" component={MyListFilm}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/detailfilm/:id" component={DetailFilm}/>
                
            
              
            <PrivateRoute exact path="/addfilm" component={AddFilm}/>
            <PrivateRoute exact path="/editfilm/:id" component={EditFilm} />
            <PrivateRoute exact path="/buyfilm" component={BuyFilm}/>
            <PrivateRoute exact path="/transaction" component={ListTrans}/>
              


            <Route exact path="/" component={Index}/>
          </Switch>
          </Container>
      </Router>
      }

      </>
  );
}


export default App;
