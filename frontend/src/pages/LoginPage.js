import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LoginPage(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const login = async () => {

if(!email || !password){
alert("Please enter email and password");
return;
}

try{

const res = await fetch("http://127.0.0.1:8000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await res.json();

if(data.error){

const choice = window.confirm(
data.error + "\n\nPress OK to Sign Up\nPress Cancel to Continue as Guest"
);

if(choice){
navigate("/signup");
}else{
navigate("/userinfo");
}

return;

}

localStorage.setItem("user_id", data.user_id);
localStorage.setItem("name", data.name);

navigate("/profile");

}catch(error){

console.error(error);

alert("Unable to connect to server");

}

};

return(

<div style={styles.page}>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
style={styles.card}
>

<h2 style={styles.title}>Login</h2>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type={showPassword ? "text":"password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<label style={styles.showPassword}>

<input
type="checkbox"
onChange={()=>setShowPassword(!showPassword)}
/>

Show Password

</label>

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={login}
style={styles.button}
>

Login

</motion.button>

<p
style={styles.link}
onClick={()=>alert("Password reset will be connected to backend email service later.")}
>

Forgot Password?

</p>

</motion.div>

</div>

);

}

const styles={

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at 20% 20%, #16213e 0%, #020617 70%)",
fontFamily:"Inter, sans-serif"
},

card:{
width:"420px",
padding:"35px",
borderRadius:"20px",
background:"rgba(255,255,255,0.06)",
backdropFilter:"blur(18px)",
border:"1px solid rgba(255,255,255,0.1)",
display:"flex",
flexDirection:"column",
gap:"14px"
},

title:{
color:"white",
textAlign:"center"
},

input:{
padding:"12px",
borderRadius:"10px",
border:"none",
outline:"none",
background:"rgba(255,255,255,0.08)",
color:"white"
},

button:{
marginTop:"10px",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
color:"white",
cursor:"pointer"
},

showPassword:{
color:"white",
fontSize:"13px",
display:"flex",
alignItems:"center",
gap:"6px"
},

link:{
color:"#9ad1ff",
cursor:"pointer",
fontSize:"13px",
textAlign:"center",
marginTop:"5px"
}

};

export default LoginPage;