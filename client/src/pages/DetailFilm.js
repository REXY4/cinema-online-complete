import{
    useState,
    useEffect,
    useContext
} from "react";

import {
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap"

import {
    useRouteMatch,
    useHistory,
    useParams
} from "react-router-dom";


import {API} from "../config/api";
import {idr} from "../utils"
import Card from "../components/Card";
import { UserContext } from "../contexts/userContext";


import RenderButton from "../components/details/RenderButton";
import ModalEditFilm from "../components/details/ModalEdit";
import ModalEditImage from "../components/details/ModalEditImage";

import BuyPopUp from "../components/BuyPopUp";
import ModalDelete from "../components/details/ModalDelete";
import DisplayFilm from "../components/details/DisplayFilm";

import ReactPlayer from "react-player/youtube";

function DetailFilm(){
    const [stateUserLogin,] = useContext(UserContext);
    let match = useParams();
    let route = useHistory();

    const [film, setFilm] = useState([])
    const [transaction, setTransaction] = useState([])
 
    // LOAD/READ DATA
    const loadFilm = async (id) => {
            
        try {
            const response = await API.get(`/film/${match.id}`);
            setFilm(response.data.data.film[0]);
            setTransaction(response.data.data.film[0].transactions);
            
        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        loadFilm();
    }, []);

    const handleRoute = () =>{
        return route.push("/editfilm/"+film?.id)
    }

    
   

    return (
        <>
            <Row className="mt-5">
                <Col className="col-sm-3">
                    <Card image={film?.thumbnail}/>
                    <div style={{position :"relative", bottom : "300px"}}>
                        {stateUserLogin?.user?.id === 1 ? 
                        <ModalEditImage filmId={match.id} image={film?.thumbnail}/>
                        :  "" }
                    </div>
                </Col>
                <Col>
                    <Row>
                        <Col className="col-sm-10">
                            <h1 className="titleDetail mb-1">{film?.title}</h1>
                            {stateUserLogin?.user?.id === 1 ?
                            (
                            <div style={{position : "relative", left : "600px", bottom : "100px"}} >
                            {[film]?.map((item, index)=>
                                <ModalEditFilm key={index} filmId={item.id}
                                filmCategory={"Category"} 
                                title={item.title} price={film?.price} 
                                filmUrl={item.filmUrl} 
                                description={item.description}
                                />
                            )}
                            </div>
                            ) : "" }
                        </Col>
                        <Col>   
                        {stateUserLogin?.user?.id === 1 ? 
                        (
                            <ModalDelete/>
                        ) : (
                         <RenderButton idFilm={match.id} price={film.price}/>
                        )
                        }
                        
                              
                        </Col>
                    </Row>
                    <Row className="mb-3">
                       {stateUserLogin.user.id === 1 ? 
                        <ReactPlayer 
                        url={film.filmUrl}
                        controls
                        width={"800px"}
                        height={"400px"}/>   
                        :

                       <DisplayFilm image={film.thumbnail} idFilm={match.id} urlFilm={film.filmUrl}/>
                       }
                        </Row>
                    <Row>
                        <h1 className="detailCategory">
                            {film?.categories?.[0].name}</h1>
                    </Row>
                    <Row className="mb-3">
                        <span className="detailPrice">{idr(film?.price)}</span>
                    </Row>
                    <Row className="mb-5">
                        <p className="detailDescription">
                            {film?.description}
                        </p>
                    </Row>
                      
                                <BuyPopUp/>
                </Col>    
            </Row>
        </>
    )
}

export default DetailFilm;