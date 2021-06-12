import {
     useContext,
     useState
} from "react";
import {
    Container,
    Row,
    Button
} from "react-bootstrap";
import { useHistory } from "react-router";
import AdminListFilm from "../components/myListFIlm/AdminListFilm";
import UserListFilm from "../components/myListFIlm/UserListFilm";
import {UserContext} from "../contexts/userContext";

function MyListFilm(){
    const [stateUserLogin,] = useContext(UserContext);
    const [searching, setSearching] = useState({
        search : null,
    });

    const {search} = searching;

    const route = useHistory();
    const handleRoute = () =>{
        return route.push("/buyfilm")
    }

    const onChange = (e) =>{
        setSearching({
            [e.target.name] : e.target.value
        })
    }
    

 

    return (
        <>
            <Container className="ml-5 mt-5">
                <Row style={{
                    position : "relative",
                    bottom : "50px",
                    left : "450px"
                }}>
                    <input type="search" placeholder="search" name="search" value={search} onChange={(e)=>onChange(e)}
                    style={{
                        width :"200px",
                        borderRadius : "10px",
                        background : "rgb(77, 75, 75)",
                        color : "white",
                        fontWeight : "bold",
                        letterSpacing : "2px",
                        border : "3px solid #CD2E71",
                        cursor : "ponter",
                        
                    }}/>
                    
                </Row>
                <Row className="ml-5">
                    <h1 className="titleListFilm">
                        My List Film
                    </h1>
                    {stateUserLogin?.user?.id === 1 ? "" :
                    <Button className="ml-5"
                    style={{
                        background : "#CD2E71",
                        width : "150px",
                        height :"40px",
                        borderRadius : "10px",
                        fontWeight : "bold",
                        letterSpacing : "3px"
                    }}
                    onClick={()=>handleRoute()} 
                    >Buy Film</Button>
                }
                </Row>
                <Row className="mt-5">
                    {stateUserLogin?.user?.id === 1 ? 
                    (
                        <AdminListFilm  search={search}/>
                    ) : 
                    <UserListFilm list={search}/>
                    }
                </Row>
            </Container>
        </> 
    )
}

export default MyListFilm;
                  
                    
                    




    


