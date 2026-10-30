"use client";
import {useState} from "react";
type Message={role:"user"|"assistant";content:string};
const PRO=["Break down this matchup using only the data available.","Explain implied probability versus no-vig consensus.","What does a positive market-relative price gap actually tell me?"];
const LITE=["Explain quarter-Kelly staking in plain English.","How should I track variance and closing-line value?","Help me build a bankroll record-keeping routine."];
export function ResearchChat(){
 const[mode,setMode]=useState<"pro"|"lite">("pro");const[question,setQuestion]=useState("");const[messages,setMessages]=useState<Message[]>([{role:"assistant",content:"Welcome to the JBI Research Desk. I can explain odds, compare market evidence and help you think through bankroll discipline. I will separate bookmaker consensus from independently validated statistical probabilities."}]);
 const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[sport,setSport]=useState("NBA");const[context,setContext]=useState("");
 const starters=mode==="pro"?PRO:LITE;
 async function send(text=question){
  const value=text.trim();if(!value||loading)return;
  const next=[...messages,{role:"user" as const,content:value}];setMessages(next);setQuestion("");setError("");setLoading(true);
  try{const response=await fetch("/api/research",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode,question:value,messages:next.slice(-8),sport,context})});const data=await response.json();if(!response.ok)throw new Error(data.error||"Research request failed.");setMessages([...next,{role:"assistant",content:data.answer}]);}
  catch(err){setError(err instanceof Error?err.message:"Could not complete the research request.");}
  finally{setLoading(false);}
 }
 return <div className="workspace-page chat-page"><section className="page-intro-row"><div><div className="eyebrow"><span className="eyebrow-line"/> JBI ASSISTANT</div><h1>Research, with context.</h1><p>Use PRO for market and matchup research. Use LITE for bankroll education, probability and disciplined process.</p></div></section>
  <div className="chat-layout"><section className="chat-panel"><div className="chat-panel-head"><div><span className="chat-online-dot"/> RESEARCH DESK / PRIVATE SESSION</div><div className="chat-mode-switch"><button type="button" className={mode==="pro"?"active":""} onClick={()=>setMode("pro")}>PRO</button><button type="button" className={mode==="lite"?"active":""} onClick={()=>setMode("lite")}>LITE</button></div></div>
   <div className="chat-context-row"><label>SPORT CONTEXT<select value={sport} onChange={e=>setSport(e.target.value)}><option>NBA</option><option>NFL</option><option>MLB</option><option>NHL</option><option>Soccer</option></select></label><label className="context-input">OPTIONAL MATCHUP / DATA CONTEXT<input value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. Celtics @ Knicks, player points market…"/></label></div>
   <div className="chat-messages">{messages.map((message,index)=><div key={index} className={"chat-message "+message.role}><div className="chat-message-avatar">{message.role==="assistant"?"J":"YOU"}</div><div className="chat-message-body"><span>{message.role==="assistant"?"JBI RESEARCH DESK":"YOU"}</span><p>{message.content}</p></div></div>)}{loading&&<div className="chat-message assistant"><div className="chat-message-avatar">J</div><div className="chat-message-body"><span>JBI RESEARCH DESK</span><p className="typing-dots">Reviewing the question and context…</p></div></div>}</div>
   {error&&<div className="chat-error">{error}</div>}
   <div className="chat-composer"><textarea value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();void send();}}} placeholder={mode==="pro"?"Ask about a matchup, line, prop or market probability…":"Ask about bankroll planning, unit sizing, risk or betting discipline…"} rows={2}/><button type="button" onClick={()=>void send()} disabled={loading||!question.trim()}>{loading?"…":"Send ↗"}</button></div>
   <div className="chat-footer">AI-generated explanations can be wrong. Verify live lines and source data. No guaranteed outcomes.</div>
  </section><aside className="chat-side"><div className="panel-card"><div className="panel-eyebrow">{mode==="pro"?"PRO RESEARCH":"LITE COACHING"}</div><h3>{mode==="pro"?"Work from the market.":"Work from a process."}</h3><p>{mode==="pro"?"Ask for odds explanations, line comparisons and structured matchup research. Add a current odds snapshot for a grounded answer.":"Learn implied probability, expected value, variance, unit sizing and record keeping without needing live market data."}</p><div className="chat-starter-list">{starters.map(item=><button key={item} type="button" onClick={()=>void send(item)}>{item}<span>↗</span></button>)}</div></div><div className="chat-integrity"><span>◈</span><strong>No fabricated statistics</strong><p>The assistant is instructed not to invent player hit rates, injury reports or historical trends when those feeds are not connected.</p></div></aside></div>
 </div>;
}
