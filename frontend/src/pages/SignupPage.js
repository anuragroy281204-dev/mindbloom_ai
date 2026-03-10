import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SignupPage(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [age,setAge] = useState("");
const [gender,setGender] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const createAccount = async () => {

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

const passwordRegex =
/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

if(!passwordRegex.test(password)){
alert(
"Password must contain:\n\n• 8 characters\n• 1 uppercase\n• 1 number\n• 1 special character"
);
return;
}

try{

const response = await fetch("http://127.0.0.1:8000/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
age:parseInt(age),
gender,
email,
password
})
});

const data = await response.json();

if(data.error){
alert(data.error);
return;
}

alert("Account created successfully");

navigate("/login");

}catch(error){

console.error(error);
alert("Server connection failed");

}

};

return(

<div style={styles.page}>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
style={styles.card}
>

<h2 style={styles.title}>Create Account</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
style={styles.input}
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
style={styles.select}
>

<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>

</select>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<input
type={showPassword ? "text" : "password"}
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
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
onClick={createAccount}
style={styles.button}
>

Create Account

</motion.button>

</motion.div>

</div>

);

}

const styles = {

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

select:{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"white",
color:"black"
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
}

};

export default SignupPage;