
import {
    Col,
    Card
} from "react-bootstrap";
function CardFilm(props){
    return (
        <>
            <Col className="col-sm-2 mr-3 mb-4">
            <Card id="cardHover" style={{ width: '183px', borderRadius: "5px" }}
            onClick={props.onClick}>
                <Card.Img src={props.image} 
                style={{
                    width : "auto",
                    height : "250px",
                    borderRadius : "5px",
                    objectFit : "inherit",
                    filter : "contrast(110%)"
                }}
                />
            </ Card>    
            </Col>
            
        </>
    )
}
                   

export default CardFilm;