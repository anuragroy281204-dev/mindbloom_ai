import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function UserInfoPage(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [age,setAge] = useState("");
const [email,setEmail] = useState("");
const [gender,setGender] = useState("");

/* ---------- STABLE STARS ---------- */

const [stars] = useState(
Array.from({length:70},()=>({
top:Math.random()*100,
left:Math.random()*100,
size:Math.random()*3+1
}))
);

/* ---------- START ASSESSMENT ---------- */

const startAssessment = () => {

if(!name || !age || !email || !gender){
alert("Please fill all fields.");
return;
}

navigate("/chat");

};

/* ---------- VIEW REPORT ---------- */

const viewReport = () => {

navigate("/login");

};

/* ---------- CREATE ACCOUNT ---------- */

const createAccount = () => {

navigate("/auth");

};

return(

<div style={styles.page}>

{/* ---------- TWINKLING STARS ---------- */}

{stars.map((star,i)=>(

<motion.div
key={i}
style={{
...styles.star,
top:`${star.top}%`,
left:`${star.left}%`,
width:star.size,
height:star.size
}}
animate={{
opacity:[0.2,1,0.2],
scale:[1,1.5,1]
}}
transition={{
duration:2+Math.random()*3,
repeat:Infinity
}}
/>

))}

{/* ---------- GLASS CARD ---------- */}

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
style={styles.card}
>

<h2 style={styles.title}>User Information</h2>

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

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
style={styles.input}
>

<option value="" style={{color:"black"}}>Select Gender</option>
<option value="Male" style={{color:"black"}}>Male</option>
<option value="Female" style={{color:"black"}}>Female</option>
<option value="Other" style={{color:"black"}}>Other</option>

</select>

{/* ---------- START BUTTON ---------- */}

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={startAssessment}
style={styles.startBtn}
>

Start Assessment

</motion.button>

{/* ---------- VIEW REPORT BUTTON ---------- */}

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={viewReport}
style={styles.reportBtn}
>

View Previous Report

</motion.button>

</motion.div>

{/* ---------- CREATE ACCOUNT LINK ---------- */}

<motion.div
whileHover={{scale:1.05}}
onClick={createAccount}
style={styles.createAccount}
>

Create Account

</motion.div>

</div>

);

}

/* ---------- STYLES ---------- */

const styles={

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at 20% 20%, #16213e 0%, #020617 70%)",
position:"relative",
overflow:"hidden",
fontFamily:"Inter, sans-serif"
},

star:{
position:"absolute",
background:"white",
borderRadius:"50%"
},

card:{
width:"420px",
padding:"35px",
borderRadius:"18px",
background:"rgba(255,255,255,0.06)",
backdropFilter:"blur(18px)",
border:"1px solid rgba(255,255,255,0.1)",
display:"flex",
flexDirection:"column",
gap:"14px"
},

title:{
color:"white",
textAlign:"center",
marginBottom:"10px"
},

input:{
padding:"12px",
borderRadius:"10px",
border:"none",
outline:"none",
background:"rgba(255,255,255,0.08)",
color:"white",
appearance:"none"
},

startBtn:{
marginTop:"10px",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
color:"white",
cursor:"pointer"
},

reportBtn:{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"rgba(255,255,255,0.1)",
color:"white",
cursor:"pointer"
},

createAccount:{
position:"absolute",
bottom:"40px",
color:"#9ad1ff",
cursor:"pointer",
fontSize:"14px",
fontWeight:"500"
}

};

export default UserInfoPage;