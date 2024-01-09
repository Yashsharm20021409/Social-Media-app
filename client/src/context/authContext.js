import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // using state we store user either logged in or not
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // creating object of details of user in currentUser of useState
    const login = async (formData) => {
        //TO DO
        // console.log("AuthPage",formData);
        const res = await axios.post("http://localhost:5000/api/auth/login",formData,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        setCurrentUser(res.data)
    };

    // setting currentUser in localStorage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};