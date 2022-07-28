import React from 'react';

import MainNavigation from "../components/MainNavigation";

const Layout = (props) => {
    return (
        <main>
            {location.pathname !== '/' && <MainNavigation />}
            <div>
                {props.children}
            </div>
        </main>
    );
}

export default Layout;