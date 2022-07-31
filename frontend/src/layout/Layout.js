import React from 'react';
import MainNavigation from "../components/Navigation/MainNavigation";



const Layout = (props) => {
    return (
        <main>
            {location.pathname !== '/' && <MainNavigation themeToggler={props.themeToggler} />}
            <div>
                {props.children}
            </div>
        </main>
    );
}

export default Layout;