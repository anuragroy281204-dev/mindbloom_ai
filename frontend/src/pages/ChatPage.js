import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import botIcon from "../assets/bot.png";

const questions = [
"I struggle to focus on details.",
"I make careless mistakes in tasks.",
"I find it hard to sustain attention.",
"I don't seem to listen when spoken to directly.",
"I fail to finish tasks.",
"I avoid tasks requiring sustained mental effort.",
"I lose necessary items frequently.",
"I am easily distracted.",
"I forget daily activities.",
"I fidget often.",
"I leave my seat when staying seated is expected.",
"I feel restless.",
"I struggle to engage in quiet activities.",
"I feel constantly on the go.",
"I talk excessively.",
"I blurt out answers before questions are completed.",
"I have difficulty waiting my turn.",
"I interrupt others."
];

function ChatPage(){

const navigate = useNavigate();

const [messages,setMessages]=useState([
{sender:"bot",text:"Hello! I'm MindBloom AI. Say anything to begin your ADHD assessment."}
]);

const [input,setInput]=useState("");
const [started,setStarted]=useState(false);
const [currentQuestion,setCurrentQuestion]=useState(0);
const [typing,setTyping]=useState(false);
const [answers,setAnswers]=useState([]);

const messagesEndRef = useRef(null);

/* AUTO SCROLL */

useEffect(()=>{
messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);

/* TWINKLING STARS */

const [stars]=useState(
Array.from({length:70},()=>({
top:Math.random()*100,
left:Math.random()*100,
size:Math.random()*3+1
}))
);

/* PROGRESS */

const progress=(currentQuestion/questions.length)*100;

/* ANSWER SCORING FUNCTION */

function scoreAnswer(text){

const t = text.toLowerCase();

/* strong negative */

if(
t.includes("never") ||
t.includes("not at all") ||
t.includes("no") ||
t.includes("not really") ||
t.includes("none")
) return 0;

/* mild */

if(
t.includes("rarely") ||
t.includes("seldom") ||
t.includes("once in a while")
) return 1;

/* moderate */

if(
t.includes("sometimes") ||
t.includes("occasionally") ||
t.includes("maybe")
) return 2;

/* strong */

if(
t.includes("often") ||
t.includes("very often") ||
t.includes("always") ||
t.includes("yes") ||
t.includes("frequently")
) return 3;

/* fallback scoring if no keyword */

if(t.length < 10) return 1;
if(t.length < 30) return 2;
return 3;

}

/* SEND MESSAGE */

const sendMessage=()=>{

if(!input.trim()) return;

const userMsg={sender:"user",text:input};
setMessages(prev=>[...prev,userMsg]);

setInput("");

/* START ASSESSMENT */

if(!started){

setStarted(true);
setTyping(true);

setTimeout(()=>{

setTyping(false);

setMessages(prev=>[
...prev,
{sender:"bot",text:"Great. Let's begin the assessment."},
{sender:"bot",text:questions[0]}
]);

},1200);

return;
}

/* PROCESS ANSWERS */

if(currentQuestion < questions.length){

const updated=[...answers,input];
setAnswers(updated);

const next=currentQuestion+1;
setCurrentQuestion(next);

setTyping(true);

setTimeout(()=>{

setTyping(false);

if(next < questions.length){

setMessages(prev=>[
...prev,
{sender:"bot",text:questions[next]}
]);

}

else{

setMessages(prev=>[
...prev,
{sender:"bot",text:"Assessment complete. Generating your ADHD report..."}
]);

/* REAL SCORING */

let inattentive_score=0;
let hyperactive_score=0;

updated.forEach((answer,index)=>{

const score=scoreAnswer(answer);

if(index < 9){
inattentive_score+=score;
}else{
hyperactive_score+=score;
}

});

const adhd_score=Math.round(
((inattentive_score+hyperactive_score)/(questions.length*3))*100
);

const happiness_score=Math.max(0,100-adhd_score);
const confidence_score=Math.max(0,100-(hyperactive_score*3));

/* SAVE REPORT */

fetch("https://mindbloom-backend-xsm3.onrender.com/save-report",{
     method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    user_id: localStorage.getItem("user_id"),
    adhd_score: adhd_score,
    inattentive_score: inattentive_score,
    hyperactive_score: hyperactive_score,
    happiness_score: happiness_score,
    confidence_score: confidence_score
  })
})
.then(res => res.json())
.then(data => {
  navigate("/report");   // ← THIS is the important line
})
.catch(err => {
  console.error(err);
});



}

},1200);

}

};

/* ENTER KEY */

const handleKey=(e)=>{
if(e.key==="Enter") sendMessage();
};

/* UI */

return(

<div style={styles.page}>

{/* STARS */}

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
scale:[1,1.6,1]
}}
transition={{
duration:2+Math.random()*3,
repeat:Infinity
}}
/>

))}

{/* CHAT BOX */}

<div style={styles.chatBox}>

{/* PROGRESS */}

<div style={styles.progressWrapper}>

<div style={styles.progressText}>
Question {Math.min(currentQuestion+1,18)} / 18
</div>

<div style={styles.progressBar}>

<motion.div
style={styles.progressFill}
animate={{width:`${progress}%`}}
transition={{duration:0.5}}
/>

</div>

</div>

{/* MESSAGES */}

<div style={styles.messages}>

{messages.map((msg,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{duration:0.25}}
style={{
display:"flex",
justifyContent:msg.sender==="user"?"flex-end":"flex-start",
marginBottom:12
}}
>

{msg.sender==="bot" && (
<img src={botIcon} alt="bot" style={styles.avatar}/>
)}

<div style={{
...styles.bubble,
background:msg.sender==="user"
? "linear-gradient(90deg,#7c6cff,#39d98a)"
: "rgba(255,255,255,0.08)"
}}>
{msg.text}
</div>

</motion.div>

))}

{/* TYPING */}

{typing && (

<div style={{display:"flex",alignItems:"center",gap:10}}>

<img src={botIcon} alt="bot" style={styles.avatar}/>

<div style={styles.typing}>

<motion.span animate={{y:[0,-4,0]}} transition={{repeat:Infinity,duration:0.6}}>•</motion.span>
<motion.span animate={{y:[0,-4,0]}} transition={{repeat:Infinity,duration:0.6,delay:0.2}}>•</motion.span>
<motion.span animate={{y:[0,-4,0]}} transition={{repeat:Infinity,duration:0.6,delay:0.4}}>•</motion.span>

</div>

</div>

)}

<div ref={messagesEndRef}></div>

</div>

{/* INPUT */}

<div style={styles.inputRow}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={handleKey}
placeholder="Type your response..."
style={styles.input}
/>

<button onClick={sendMessage} style={styles.send}>
Send
</button>

</div>

</div>

</div>

);

}

/* STYLES */

const styles={

page:{
height:"100vh",
background:"radial-gradient(circle at 20% 20%, #16213e 0%, #020617 70%)",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
overflow:"hidden",
fontFamily:"Inter, sans-serif"
},

star:{
position:"absolute",
background:"white",
borderRadius:"50%",
opacity:0.7
},

chatBox:{
width:"850px",
height:"620px",
padding:"30px",
borderRadius:"20px",
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(18px)",
border:"1px solid rgba(255,255,255,0.1)",
display:"flex",
flexDirection:"column"
},

progressWrapper:{
marginBottom:15
},

progressText:{
color:"#aaa",
fontSize:13,
marginBottom:5
},

progressBar:{
height:6,
background:"rgba(255,255,255,0.1)",
borderRadius:6,
overflow:"hidden"
},

progressFill:{
height:"100%",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
width:"0%"
},

messages:{
flex:1,
overflowY:"auto",
paddingRight:10
},

bubble:{
padding:"12px 16px",
borderRadius:"14px",
maxWidth:"70%",
color:"white",
fontSize:"14px"
},

avatar:{
width:32,
height:32,
marginRight:8
},

typing:{
background:"rgba(255,255,255,0.08)",
padding:"8px 12px",
borderRadius:12,
color:"white",
display:"flex",
gap:4,
fontSize:18
},

inputRow:{
display:"flex",
marginTop:10,
gap:10
},

input:{
flex:1,
padding:"12px",
borderRadius:"10px",
border:"none",
outline:"none",
background:"rgba(255,255,255,0.08)",
color:"white"
},

send:{
padding:"12px 20px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
color:"white",
cursor:"pointer"
}

};

export default ChatPage;