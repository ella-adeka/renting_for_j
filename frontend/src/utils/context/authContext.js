import  React,{ createContext, useEffect, useState } from "react";

const AuthContext = createContext({user: {}});

export function AuthProvider({children}){
    const [ loading, setLoading ] = useState(true);

    const [token, setToken ] = useState(() => {
        localStorage.getItem('token') ? localStorage.getItem('token') : null
        // localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    });
    
    const [ user, setUser ] = useState({});

    // const [ auth, setAuth ] = useState(() => {
    //     localStorage.getItem('token') ? localStorage.getItem('token') : null
        // localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    // });

    const deactivateUser = () => {
        fetch('http://127.0.0.1:8000/api/v1/users/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ is_active : false })
        })
        .then(() => {
            localStorage.removeItem("token");
            window.location.replace('http://127.0.0.1:8000/');
        })
        .catch((err) => console.log(err))
    }


    const loginUser = (email, password) => {
        fetch('http://127.0.0.1:8000/api/v1/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                // setAuth(JSON.parse(res.token))
                // setAuth(res.token)
                setToken(res.token)
                localStorage.removeItem("token");
                localStorage.setItem('token', res.token);
                window.location.replace('http://127.0.0.1:8000/');
                // window.location.replace('http://127.0.0.1:8000/user/account');
            } else {
                alert("Something is wrong")
            }
        })
        .catch((err) => console.log(err))
    }


    const registerUser = (email, first_name, last_name, password, password2) => {
        fetch('http://127.0.0.1:8000/api/v1/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                first_name,
                last_name,
                password,
                password2
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res) {
                window.location.replace('http://127.0.0.1:8000/login');
            } else {
                alert("Something is wrong")
            }
        })
        .catch((err) => console.log(err))
    }

    // const updateUser = (email, first_name, last_name, address, date_of_birth, gender, phone_number, emergency_number) => {
    const updateUser = () => {
        fetch('http://127.0.0.1:8000/api/v1/users/user', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar,
                email,
                first_name,
                last_name,
                address,
                date_of_birth,
                gender,
                phone_number,
                emergency_number
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res) {
                window.location.replace('http://127.0.0.1:8000/user/account');
            } else {
                alert("Something is wrong")
            }
        })
        .catch((err) => console.log(err))
    }

    const logoutUser = () => {
        setToken(null);
        fetch('http://127.0.0.1:8000/api/v1/users/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
            })
            .then(() => {
                localStorage.removeItem("token");
                window.location.replace('http://127.0.0.1:8000/login');
            });
       
        // setAuth(null)
        // localStorage.removeItem("token")
        // window.location.replace('http://127.0.0.1:8000/login');
    }
    

    const contextData = {
        user,
        setUser,
        token,
        setToken,
        deactivateUser,
        loginUser,
        logoutUser,
        registerUser,
        // updateUser,
        loading,
        setLoading
    }

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            fetch('http://127.0.0.1:8000/api/v1/users/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setLoading(false);
            })
            .catch((err) => console.log(err))
        }
    }, [loading]);
   
    return(
        // <AuthContext.Provider value={contextData}>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;