import "./welcome.css";

function welcome() {
    const logOut = ()=>{
        
    }
    return (
        <>
            <div className="navbar">
                <img src="./assets/react.svg" alt="" />
                <div id="username"></div>
                <button onClick={logOut()}></button>
            </div>
            <h1>Welcome to the application</h1>
        </>
    )
}

export default welcome