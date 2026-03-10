import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AuthPage(){

const navigate = useNavigate();

return(

<div style={styles.page}>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
style={styles.card}
>

<h2 style={styles.title}>Create Account</h2>

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>navigate("/signup")}
style={styles.btn}
>
Sign Up
</motion.button>

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:0.95}}
onClick={()=>navigate("/login")}
style={styles.btn}
>
Login
</motion.button>

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
width:"380px",
padding:"40px",
borderRadius:"18px",
background:"rgba(255,255,255,0.06)",
backdropFilter:"blur(18px)",
border:"1px solid rgba(255,255,255,0.1)",
display:"flex",
flexDirection:"column",
gap:"20px"
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

export default AuthPage;