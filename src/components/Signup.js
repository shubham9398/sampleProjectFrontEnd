import React, { useState } from "react";
// import { useSignup } from "../hooks/useSignup";
import { Button } from '@mui/material';

function Signup() {
  // const { signup, error, isLoading, successuser } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validateEmail, setvalidateEmail]= useState("")
  const [validatePassword, setvalidatePassword]= useState("")

  const[accAlreadyExists, setAccAlreadyExists]=useState("")



  // function ValidateEmail(inputText)
  // {
  //   var mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  //   if(inputText.match(mailformat))
  //   {
  //     alert("This is not a valid email address");
  //     return false;
  //     }
  // }

  const data={
    "username":email,
    "password":password
  }
  console.log("LENGGGGG"+data.password.length)
  const validate=()=>{
    console.log("Inside Validate")
    const reg= /.+@.+\.[A-Za-z]+$/.test(data.username)
    if(!data.username){setvalidateEmail("Enter email");
  return false}
    if(!reg){setvalidateEmail("Enter valid email"); return false};

    if(!data.password){setvalidatePassword("Enter Password"); return false}
  if(data.password.length<4 || data.password.length>10 ){
    setvalidatePassword("Password length must be more than 3 and less than 10")
  return false}
    
  return true}
  


  const onSignup=async()=>{
    if(validate()){
    try{
    await fetch("http://localhost:5001/signup",{
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
}).then((response) => {
  response.json().then((resp) => {
    if(resp.loginstatus=="Already exists"){
      setAccAlreadyExists("Account Already Exists")
      return
    }
    // alert(resp)
    //console.log(resp)
    alert("Sign up sucesssful")
      //dispatch(addTodo(responseTodo)); 
  }
  );
})
}
catch(err){
  
}
}
}

  async function handleSubmit(e) {
    e.preventDefault();
    // await signup(email, password);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="signup">
        <h3>Sign up</h3>
        <label style={{
          fontFamily: 'Alegreya',
          fontSize: '24px'
        }}>Email:</label>
        <input
          type="email"
          onChange={(e) => {setEmail(e.target.value); setvalidateEmail('')}}
          value={email}
        />
        <p style={{color:"red"}}>{validateEmail}</p>
        <label style={{
          fontFamily: 'Alegreya',
          fontSize: '24px'
        }}>Password:</label>
        <input
          type="password"
          onChange={(e) =>{ setPassword(e.target.value);setvalidatePassword('')}}
          value={password}
        />
        <p style={{color:"red"}}>{validatePassword}</p>
        {/* <button style={{ textTransform: "capitalize" }} >
          Sign up
        </button> */}
        <Button style={{
          borderRadius: 35,
          backgroundColor: '#FF2625',
          padding: "18px 36px",
          fontSize: "18px"
        }} variant="contained"
        onClick={onSignup}>
          Sign Up
        </Button>
        <p style={{color:"red"}} >{accAlreadyExists}</p>
        {/* {setEmail('')}{setPassword('')} */}  //infinite loop
      </form>
    </div>
  );
  }

export default Signup;
