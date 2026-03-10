import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell
} from "recharts";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import botIcon from "../assets/bot.png";

const COLORS = ["#7c6cff","#39d98a"];

function ReportPage(){

const navigate = useNavigate();
const reportRef = useRef();

const [report,setReport] = useState(null);
const [allReports,setAllReports] = useState([]);

/* FETCH REPORT */

useEffect(()=>{

const user_id = localStorage.getItem("user_id");

fetch(`http://127.0.0.1:8000/reports/${user_id}`)
.then(res=>res.json())
.then(data=>{

setAllReports(data);

if(data.length>0){
setReport(data[data.length-1]);
}

})
.catch(err=>{
console.log(err);
});

},[]);


/* LOADING */

if(!report){

return(
<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#020617",
color:"white"
}}>
Loading report...
</div>
);

}


/* USER INFO */

const name = report.user?.name || "User";
const age = report.user?.age || "-";
const gender = report.user?.gender || "-";
const date = new Date(report.created_at).toLocaleDateString();


/* SCORES */

const happiness = Math.round(report.happiness_score);
const focus = Math.round(report.confidence_score);
const adhd = Math.round(report.adhd_score);


/* ADHD RING */

const ringData = [
{value:adhd},
{value:100-adhd}
];


/* GRAPH DATA */

const happinessData=[{name:"Score",value:happiness}];
const focusData=[{name:"Score",value:focus}];


/* COMPARISON DATA */

const comparisonData = allReports.map((r,index)=>({

name:`Test ${index+1}`,
adhd:r.adhd_score

}));


/* ADHD LEVEL */

let adhdLevel="Low ADHD Indicators";

if(adhd>=70) adhdLevel="High ADHD Risk";
else if(adhd>=40) adhdLevel="Moderate ADHD Indicators";


/* SUGGESTIONS */

let suggestions=[];

if(adhd>=70){

suggestions=[
"Break large tasks into smaller structured steps.",
"Use Pomodoro focus cycles to maintain attention.",
"Minimize environmental distractions.",
"Maintain consistent sleep schedules.",
"Consider consulting a licensed psychologist."
];

}

else if(adhd>=40){

suggestions=[
"Use planners and reminders for tasks.",
"Take short movement breaks while working.",
"Prioritize tasks every morning.",
"Practice mindfulness exercises.",
"Track your focus patterns."
];

}

else{

suggestions=[
"Maintain healthy routines.",
"Exercise regularly.",
"Use structured work sessions.",
"Maintain sleep consistency.",
"Keep tracking productivity habits."
];

}


/* DOWNLOAD PDF */

const downloadPDF = ()=>{

const input = reportRef.current;

html2canvas(input).then(canvas=>{

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF("p","mm","a4");

const imgWidth=210;
const imgHeight = canvas.height * imgWidth / canvas.width;

pdf.addImage(imgData,"PNG",0,0,imgWidth,imgHeight);
pdf.save("MindBloom_Report.pdf");

});

};


/* TOOLTIP TEXT */

const tooltipStyle = {
background:"rgba(0,0,0,0.8)",
border:"none",
borderRadius:"8px",
color:"white"
};


/* PAGE */

return(

<div style={styles.page}>

<div ref={reportRef}>

<motion.h1
style={styles.title}
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
>
MindBloom Assessment Report
</motion.h1>


{/* USER INFO */}

<div style={styles.userInfo}>

<p><b>Name:</b> {name}</p>
<p><b>Age:</b> {age}</p>
<p><b>Gender:</b> {gender}</p>
<p><b>Date:</b> {date}</p>

</div>


{/* ADHD LEVEL */}

<div style={styles.levelCard}>
Detected Pattern: <b>{adhdLevel}</b>
</div>


{/* GRAPH CARDS */}

<div style={styles.cards}>


{/* HAPPINESS */}

<div style={styles.card}>

<h3 style={styles.cardTitle}>Happiness Score</h3>

<ResponsiveContainer width="100%" height={200}>

<LineChart data={happinessData}>

<XAxis dataKey="name" stroke="#aaa"/>
<YAxis domain={[0,100]} stroke="#aaa"/>

<Tooltip
contentStyle={tooltipStyle}
formatter={()=>["Represents emotional wellbeing","Happiness"]}
/>

<Line
type="monotone"
dataKey="value"
stroke="#7c6cff"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>


{/* FOCUS */}

<div style={styles.card}>

<h3 style={styles.cardTitle}>Focus Stability</h3>

<ResponsiveContainer width="100%" height={200}>

<LineChart data={focusData}>

<XAxis dataKey="name" stroke="#aaa"/>
<YAxis domain={[0,100]} stroke="#aaa"/>

<Tooltip
contentStyle={tooltipStyle}
formatter={()=>["Ability to maintain attention","Focus"]}
/>

<Line
type="monotone"
dataKey="value"
stroke="#39d98a"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>


{/* ADHD RING */}

<div style={styles.card}>

<h3 style={styles.cardTitle}>ADHD Risk</h3>

<div style={styles.ringContainer}>

<ResponsiveContainer width="100%" height={200}>

<PieChart>

<Pie
data={ringData}
dataKey="value"
innerRadius={65}
outerRadius={80}
startAngle={90}
endAngle={-270}
stroke="none"
>

<Cell fill="#7c6cff"/>
<Cell fill="rgba(255,255,255,0.08)"/>

</Pie>

</PieChart>

</ResponsiveContainer>

<div style={styles.ringCenter}>
{adhd}%
</div>

</div>

</div>

</div>


{/* AI SUGGESTIONS */}

<motion.div
style={styles.recommendationCard}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
>

<div style={styles.botHeader}>

<img src={botIcon} alt="bot" style={styles.botAvatar}/>

<h3>MindBloom AI Recommendations</h3>

</div>

<ul style={styles.botText}>

{suggestions.map((s,i)=>(
<li key={i}>{s}</li>
))}

</ul>

</motion.div>

</div>


{/* BUTTONS */}

<div style={styles.buttonRow}>

<button style={styles.button} onClick={downloadPDF}>
Download Report
</button>

<button style={styles.button} onClick={()=>navigate("/chat")}>
Retake Assessment
</button>

<button style={styles.button} onClick={()=>navigate("/")}>
Go Home
</button>

</div>


{/* COMPARISON GRAPH */}

{allReports.length>1 && (

<div style={styles.comparisonCard}>

<h3>Progress Across Assessments</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={comparisonData}>

<XAxis dataKey="name" stroke="#aaa"/>
<YAxis domain={[0,100]} stroke="#aaa"/>

<Tooltip contentStyle={tooltipStyle}/>

<Line
type="monotone"
dataKey="adhd"
stroke="#7c6cff"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

)}

</div>

);

}


/* STYLES */

const styles={

page:{
minHeight:"100vh",
background:"radial-gradient(circle at 20% 20%, #16213e 0%, #020617 70%)",
padding:"60px",
fontFamily:"Inter, sans-serif",
color:"white"
},

title:{
textAlign:"center",
marginBottom:"30px"
},

userInfo:{
textAlign:"center",
marginBottom:"20px",
color:"#ccc"
},

levelCard:{
textAlign:"center",
fontSize:"20px",
marginBottom:"40px",
color:"#7c6cff"
},

cards:{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:"30px"
},

card:{
background:"rgba(255,255,255,0.06)",
border:"1px solid rgba(255,255,255,0.1)",
backdropFilter:"blur(20px)",
borderRadius:"20px",
padding:"25px",
position:"relative"
},

cardTitle:{
marginBottom:"20px",
color:"#ccc"
},

ringContainer:{
position:"relative",
width:"100%",
height:"200px"
},

ringCenter:{
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
fontSize:"28px",
fontWeight:"bold"
},

recommendationCard:{
marginTop:"50px",
background:"rgba(255,255,255,0.06)",
border:"1px solid rgba(255,255,255,0.1)",
backdropFilter:"blur(20px)",
borderRadius:"20px",
padding:"35px",
maxWidth:"1100px",
marginLeft:"auto",
marginRight:"auto"
},

botHeader:{
display:"flex",
alignItems:"center",
gap:"15px",
marginBottom:"20px"
},

botAvatar:{
width:"45px"
},

botText:{
lineHeight:"1.8",
color:"#ddd"
},

buttonRow:{
display:"flex",
justifyContent:"center",
gap:"20px",
marginTop:"40px"
},

button:{
padding:"12px 20px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#7c6cff,#39d98a)",
color:"white",
cursor:"pointer"
},

comparisonCard:{
marginTop:"60px",
background:"rgba(255,255,255,0.06)",
border:"1px solid rgba(255,255,255,0.1)",
backdropFilter:"blur(20px)",
borderRadius:"20px",
padding:"30px"
}

};

export default ReportPage;