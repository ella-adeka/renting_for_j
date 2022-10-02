import React from 'react';
import MainNavigation from "../components/Navigation/MainNavigation";



const Layout = (props) => {
    // const cursor = document.querySelector("#cursor");

    // document.addEventListener("mousemove", (e) => {
    //     cursor.setAttribute("style","top: "+(e.clientY - scrollY)+"px; left: "+(e.clientX)+"px");
    // });

    // useEffect(() => {
    //     document.addEventListener("mousemove", (e) => {
    //         cursor.setAttribute("style","top: "+(e.clientY - scrollY)+"px; left: "+(e.clientX)+"px");
    //     });
    // });

    // document.addEventListener("click", () => {
    //     cursor.classList.add("expand");
    
    //     setTimeout(() => {
    //         cursor.classList.remove("expand");
    //     }, 500);
    // });

    return (
        <main>
            {/* {location.pathname !== '/' && <MainNavigation themeToggler={props.themeToggler} />} */}
                {/* <div id="cursor"></div> */}
            <div>
                {props.children}
            </div>
        </main>
    );
}

export default Layout;