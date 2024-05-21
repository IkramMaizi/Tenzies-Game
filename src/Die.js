import './App.css';
import React from "react";

export default function Die(props){
    return(
        <div className={props.isHold ? "hold--dice--component" : "dice--component"} onClick={()=>props.holdDie(props.dieIndex)}>
        <p className="die--number">{props.dieNumber}</p>
        </div>  
    )
}