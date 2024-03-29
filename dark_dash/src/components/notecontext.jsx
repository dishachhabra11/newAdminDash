import {  createContext } from "react";
import { useState } from "react";
const notecontext =createContext()

const DataProvider =({children})=>{
const [clicked, setClicked] = useState(null); 
const [islogin, setislogin] = useState(false);

const Auth ={islogin, setislogin};
const temp ={clicked, setClicked};
    return (
     <notecontext.Provider value={{temp,Auth}}>
        {children}
     </notecontext.Provider>
    )  
}
export  {notecontext,DataProvider};

