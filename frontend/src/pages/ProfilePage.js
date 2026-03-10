import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfilePage(){

const navigate = useNavigate();

return(

<div style={styles.page}>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
style={styles.card}
>

<h2 style={styles.title}>Welcome</h2>

<button style={styles.btn} onClick={()=>navigate("/chat")}>
Start New Assessment
</button>

<button style={styles.btn} onClick={()=>navigate("/report")}>
View Previous Report
</button>

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
background:"radial-gradient(circle at 20% 20%, #16213e 0%, #020617 70%)"
},
card:{
width:"400px",
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
textAlign:"center"
},
btn:{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
color:"white",
cursor:"pointer"
}
};

export default ProfilePage;