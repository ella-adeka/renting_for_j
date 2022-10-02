import React, { useEffect, useState } from "react";
import  ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import MyRoutes from "./Routes";
// AuthContext
import {AuthProvider} from "./utils/context/authContext";
import { WishlistProvider } from "./utils/context/wishlistContext";
// Themes
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Mode/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Mode/Theme";
import { useDarkMode } from "./components/Mode/UseDarkMode";
import Preloader from "./components/Preloader";
import { GoogleOAuthProvider } from '@react-oauth/google';



const App = (props) => {
    const [ loading, setLoading ] = useState(true);
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    // function handleCallbackResponse (response) {
    //     console.log("ENcoded JWT ID Token: " + response.credential)
    // }

    useEffect(() => {
        /* global google */
        // google.accounts.id.initialize({
        //     client_id: "",
        //     callback: handleCallbackResponse
        // });

        // google.accounts.id.renderButton(
        //     document.getElementById("signInDiv"),
        //     {theme: "outline", size: "large"}
        // );

        

        let preLoadTimer = setTimeout(() => {
            setLoading((false))
        }, 300);

        return () => clearTimeout(preLoadTimer)
    });

    if (!mountedComponent) return <div /> 
    
    if (loading) {
        return (
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Preloader></Preloader>
            </ThemeProvider>
        )
    } else{
        return (
            <AuthProvider>
                <WishlistProvider>
                    <GoogleOAuthProvider clientId="951816046297-04phdpp116665uh7ha9je61v2nuge31p.apps.googleusercontent.com">
                        <ThemeProvider theme={themeMode}>
                            <GlobalStyles />
                            <MyRoutes themeToggler={themeToggler} ></MyRoutes>
                            
                            <div id="signInDiv"></div>
                        </ThemeProvider>
                    </GoogleOAuthProvider>
                </WishlistProvider>
            </AuthProvider>
        );  
    }
}

export default App;


const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(
    <React.StrictMode>
         <App/>
    </React.StrictMode>
);
reportWebVitals();