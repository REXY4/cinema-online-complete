import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
    isLogin: false,
    User: null,
    loginModal : false,
    registerModal : false,
    buyOpen : false,
    modalTransaction : false,
    modalPopUp : false,
};
 
    

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "AUTH_SUCCESS":
       
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isLogin: true,
                user: payload,
            };
        case"REGISTER_SUCCESS":
            return {
                ...state,
                isLogin : false,
                user : payload
            }; 

            case "AUTH_ERROR":
            case "LOGOUT":
                localStorage.removeItem("token");
                return {
                    ...state,
                    isLogin: false,
                };

            case "LOGIN_OPEN" : 
                return {
                    ...state,
                    loginModal : true
                } 
            case "LOGIN_CLOSE" :
                return {
                    ...state,
                    loginModal: false,
                }
            case "REGISTER_OPEN" : 
                return {
                    ...state,
                    registerModal : true
                } 
            case "REGISTER_CLOSE" :
                return {
                    ...state,
                    registerModal: false,
                }         
            case "POPUP_BUY_OPEN" : 
                return {
                    ...state,
                    buyOpen : true,
                }
            case "POPUP_BUY_CLOSE" : 
                return {
                    ...state,
                    buyOpen : false,
                }
            case "TRANSACTION_OPEN" : 
                return {
                    ...state,
                    modalTransaction : true,    
                }
            case "TRANSACTION_CLOSE" : 
                return {
                    ...state,
                    modalTransaction : false,    
                }
            case "MODAL_POPUP_OPEN" :
                return {
                ...state,
                modalPopUp : true,
            }
            case "MODAL_POPUP_CLOSE" : 
                return {
                    ...state,
                    modalPopUp : false,
                }              
            default:
                throw new Error();
        }
    };
               
                    
               
          

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
