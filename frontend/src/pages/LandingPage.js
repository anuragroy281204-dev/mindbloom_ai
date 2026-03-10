import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {

const navigate = useNavigate()

return (

<div style={styles.page}>

{/* Aurora background blobs */}

<motion.div
style={styles.orb1}
animate={{x:[0,60,0],y:[0,-60,0]}}
transition={{duration:18,repeat:Infinity,ease:"easeInOut"}}
/>

<motion.div
style={styles.orb2}
animate={{x:[0,-80,0],y:[0,60,0]}}
transition={{duration:22,repeat:Infinity,ease:"easeInOut"}}
/>

<motion.div
style={styles.orb3}
animate={{x:[0,50,0],y:[0,70,0]}}
transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}
/>

{/* Stars */}

{[...Array(80)].map((_,i)=>(
<motion.div
key={i}
style={{
...styles.star,
top:`${Math.random()*100}%`,
left:`${Math.random()*100}%`
}}
animate={{
opacity:[0.2,1,0.2],
scale:[1,1.8,1]
}}
transition={{
duration:2+Math.random()*4,
repeat:Infinity,
ease:"easeInOut"
}}
/>
))}

{/* Glass container */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
style={styles.container}

>

<h1 className="gradientText">
MindBloom
</h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
style={styles.subtitle}

>

AI Powered ADHD Intelligence Platform
</motion.p>

<motion.button
whileHover={{scale:1.1}}
whileTap={{scale:0.95}}
transition={{type:"spring",stiffness:200}}
style={styles.button}
onClick={()=>navigate("/disclaimer")}

>

Start Assessment
</motion.button>

</motion.div>


<div
  style={{
    position: "fixed",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    color: "#8fb9ff",
    opacity: "0.85",
    textAlign: "center"
  }}
>
  Made by Anurag, Ishaan, Advika, Hargun
</div>

</div>


)

}

const styles = {

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#020617",
fontFamily:"sans-serif",
overflow:"hidden",
position:"relative"
},

container:{
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:"20px",
padding:"60px 80px",
borderRadius:"20px",

background:"rgba(255,255,255,0.06)",

backdropFilter:"blur(18px)",
WebkitBackdropFilter:"blur(18px)",

border:"1px solid rgba(255,255,255,0.15)",

boxShadow:"0 10px 50px rgba(0,0,0,0.6)",

zIndex:10
},

subtitle:{
color:"rgba(255,255,255,0.85)",
fontSize:"18px",
textAlign:"center"
},

button:{
marginTop:"10px",
padding:"14px 40px",
borderRadius:"30px",
border:"none",
fontSize:"16px",
cursor:"pointer",

background:"linear-gradient(90deg,#6366f1,#22c55e)",

color:"white",
fontWeight:"bold",

boxShadow:"0 10px 30px rgba(0,0,0,0.4)"
},

star:{
position:"absolute",
width:"3px",
height:"3px",
background:"white",
borderRadius:"50%",
pointerEvents:"none"
},

orb1:{
position:"absolute",
width:"500px",
height:"500px",
background:"radial-gradient(circle,#6366f1,transparent 70%)",
filter:"blur(120px)",
top:"-100px",
left:"-100px",
opacity:0.6
},

orb2:{
position:"absolute",
width:"500px",
height:"500px",
background:"radial-gradient(circle,#22c55e,transparent 70%)",
filter:"blur(120px)",
bottom:"-100px",
right:"-100px",
opacity:0.6
},

orb3:{
position:"absolute",
width:"400px",
height:"400px",
background:"radial-gradient(circle,#38bdf8,transparent 70%)",
filter:"blur(120px)",
top:"40%",
left:"60%",
opacity:0.4
}

}

export default LandingPage
