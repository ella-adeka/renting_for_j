import React, { useEffect, useState } from "react";
import  ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import MyRoutes from "./Routes";
// AuthContext
import AuthProvider from "./utils/context/authContext";
import { WishlistProvider } from "./utils/context/wishlistContext";
// Themes
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Mode/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Mode/Theme";
import { useDarkMode } from "./components/Mode/UseDarkMode";
import Preloader from "./components/Preloader";

const App = () => {
    const [ loading, setLoading ] = useState(true);
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
        let preLoadTimer = setTimeout(() => {
            setLoading((false))
        }, 3000);

        return () => clearTimeout(preLoadTimer)
    })

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
            // <AuthProvider>
                <WishlistProvider>
                    <ThemeProvider theme={themeMode}>
                        <GlobalStyles />
                        <MyRoutes themeToggler={themeToggler} ></MyRoutes>
                    </ThemeProvider>
                </WishlistProvider>
            // </AuthProvider>
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