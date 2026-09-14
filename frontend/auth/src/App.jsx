import "./App.css"

function App() {
  const loginHandler = async () => {
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userdetails = {
      name,
      email,
      password
    };
    const response = await fetch("http://localhost:5174/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify(userdetails)
    })
    const data = await response.json();
    console.log(data);
  }
  return (
    <>
      <div className='login-form'>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
          <button onClick={loginHandler}>Login</button>
      </div>
    </>
  )
}

export default App