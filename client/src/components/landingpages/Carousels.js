import {useContext, useEffect, useState} from "react"
import "./carousel.css";

import {
    Carousel,
    Button,
    Row,
    Image
} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import { API } from "../../config/api";
import {idr} from "../../utils";
import { UserContext } from "../../contexts/userContext";



const Carousels = () =>{
    const [state,dispatch] = useContext(UserContext);
    const [film, setFilm] = useState([]);
    let router = useHistory();
    const loadFilm = async ()=>{
        try {
            const response = await API.get("/films");
            setFilm(response.data.data.film)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loadFilm();
    },[])

    const handleRoute=(id)=>{
        return router.push("/detailfilm/"+id)
    }

    const handleModalPopUp = () =>{
        dispatch({
            type : "MODAL_POPUP_OPEN"
        })
    }

    return (
        <>
        
         <Carousel id="carousel">
         {film?.slice(0 , 3).map((films)=>{
  return (
    <Carousel.Item>
        
    <Image
      className="d-block imageCarousel"
      src={films.thumbnail}
      alt="First slide"
    />
    
    <Carousel.Caption style={{background : "rgb(0, 0, 0, 0.3)", textAlign:"start"}}>
        <div className="mb-2">
            <h1 className={"titleCarousel"}>{films.title}</h1>
        </div>
        <div className="mb-2">
            <span className={"price"}>{idr(films.price)}</span>
        </div>
        <div className="mb-2">
             <span className={"category"}>{films.categories[0].name}</span>
        </div>
        <div className="mb-2">
            <span>{films.description}</span>
        </div>
        <div>
            <Button className={"buttonBuy"} style={{background : "#CD2E71"}}
            onClick={
                ()=>{
                    {state.isLogin ? 
                    handleRoute(films.id) : handleModalPopUp()
                    }
            }}
            >
                Buy
            </Button>
        </div>
    </Carousel.Caption>
     </Carousel.Item>




  )
})}
</Carousel>

        </>
    )
}
        
       



export default Carousels;