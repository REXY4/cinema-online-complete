import React,{
    useContext,
    useState,
    useParams,
    useEffect
} from "react";

import {
  useHistory,
} from "react-router-dom";

import {
  Row,
  Pagination  
} from "react-bootstrap";

import {API} from "../../config/api";

import CardList from "../Card";






function AdminListFilm({search}){
  const [film, setFilm ] = useState([]);
  const [previous, setPrevious] = useState(0);
  const [current, setCurrent] = useState(10);

    let history = useHistory();
  
   

     const loadRaiseFund = async () => {
       try {
         const response = await API.get(`/films`);
         setFilm(response.data.data.film);

         
       } catch (error) {
         console.log(error);
       }
     };
     useEffect(() => {
       loadRaiseFund();
     }, []);
     
     const handleHistory = (filmId) =>{
         return history.push("/detailfilm/"+ filmId)
     }


     const filmPage = film.length / 10;
     const buttonPage = [];
     for(let number = 1; number <= Math.ceil(filmPage);number++){
        buttonPage.push(
          <Pagination.Item key={number}
          onClick={()=>handlePage(number)}>
            {number}
          </Pagination.Item>
        )
     }
    const handlePage=(num)=>{
        if(num === 1){
            setPrevious(0);
            setCurrent(10)
        }else{
          const prev = (num * 10) / num
          const cur = num * 10
          setPrevious(prev)
          setCurrent(cur)
        }
    }

  if(search){
       return film?.filter(film => film.title.slice(0, search.length).toLowerCase() === search.toLowerCase()).map((item, index)  =>{ 
         
              return ( 
                <>
                <CardList 
                image={item.thumbnail} 
                onClick={()=>handleHistory(item?.id)}/>
                </>
     ) 
               
   })   

     }else{
       return(
        <>
        <Row>

                {film?.slice(previous, current).map((item, index)  =>{ 
          return ( 
            <>
              <CardList 
              image={item.thumbnail} 
              onClick={()=>handleHistory(item?.id)}/>
        
            </>
              ) 
          })}
        </Row>
          <Row>
            <Pagination>
              {buttonPage}
            </Pagination>
          </Row>
        </>   
       ) 
      }
    }
  
     
     

export default AdminListFilm;

