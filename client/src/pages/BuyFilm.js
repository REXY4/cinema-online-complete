import {useState} from "react";
import {
   Container,
   Row,
} from "react-bootstrap";
import AdminListFilm from "../components/myListFIlm/AdminListFilm";



function BuyFilm(){
    const [searching, setSearching] = useState({
        search : null,
    });

    const {search} = searching;


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
                       List Film
                   </h1>
                 
               </Row>

                  
               <Row className="mt-5 mb-5">
                       <AdminListFilm search={search}/>
               </Row>
                  
           </Container>
       </> 
   )
}

export default BuyFilm;
                 
                   
                   

