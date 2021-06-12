import React,{
    useContext,
    useEffect,
    useState
} from "react";

import {
    UserContext
} from "../contexts/userContext";

import {API} from "../config/api";

import {
    Container,
    Row,
    Col,
    Image,
    Form
} from "react-bootstrap";

import History from "../components/profiles/History";
import EditProfile from "../components/profiles/EditProfile";
import ImageDropDown from "../components/profiles/ImageDropDown";
import ModalEditImage from "../components/profiles/ModalImage";

function Profile(){
    const [stateUserLogin, dispatchUserLogin] = useContext(UserContext);
    // LOAD/READ DATA
       const [user, setUser] = useState()
    const loadTodos = async () => {
        const id = stateUserLogin?.user?.id;
       try {
           console.log(id)
           const response = await API.get("/user/"+id);
           setUser(response.data.data.user);
           console.log(response.data.data.user)
       } catch (error) {
           console.log(error);
       }
   }
   const [form, setForm] = useState({
       avatar: stateUserLogin?.user?.avatar,
    });
    
    


  const onChange = (e) => {
      console.log(form)
      setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
      })
  };

  const handleSubmit = async () => {
      try {
          const config = {
              headers: {
                  "Content-type": "multipart/form-data"
              }
          }

          const formData = new FormData();
       
          formData.append("imageFile", form.avatar[0], form.avatar[0].name);
         
          
          const response = await API.patch(`/avatar/${stateUserLogin?.user?.avatar}`, formData, config);

          

      } catch (error) {
          console.log(error);
      }
  }
   //asdasd
   useEffect(() => {
       loadTodos();
   }, []);
    return (
        <>
             <Container className="ml-5 mt-5">
                <Row className="ml-5 mb-3">
                  
                    <Col className="mr-5">
                        <Row className="mb-3">
                            <Col>
                                <h1 className="titleProfile">
                                    My Profile
                                   
                                </h1>
                                
                            </Col>
                            <Col>
                                <EditProfile/>
                            </Col>
                        </Row>

                    <Row>
                    <Col className="col-sm-6">
                        
                        <Image src={stateUserLogin?.user?.avatar === null ? "/img/iconProfile.jpeg" : stateUserLogin?.user?.avatar} alt="profile image" style={{
                            width : "180px",
                            height : "221.79px",
                            border : "2px solid white"
                        }}/> 

                        <div style={{position : "relative", bottom :"40px", left : "160px"}}>
                           <ModalEditImage/>
                        </div>
                    </Col> 
                    <Col className="mt-3">
                        <div className="mb-4">
                            <h1 className="text-title">
                                Full Name
                            </h1>
                            <p className="textName">
                                {user?.fullName}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-title">
                                Email
                            </h1>
                            <p className="textName">
                                {user?.email}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-title">
                                Phone
                            </h1>
                            <p className="textName">
                                {user?.phone}
                            </p>
                        </div>
                    </Col> 
                    
                </Row>

                    </Col>

                    <Col className="ml-5">
                        <Row>
                        <h1 className="titleProfile">
                             History Transaction
                        </h1>
                        </Row>
                        <Row>
                            <History/>
                        </Row>
                    </Col>
                </Row>
               
                
                
            </Container>
        </>
    )
}

export default Profile;