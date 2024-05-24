import './App.css';
import React from "react";

export default function Die(props){
    const pip = <p className="pip"></p>

    return(
        <div Style={props.isHold && "background-color: #00ff95"} 
        className= "dice--component" onClick={()=>props.holdDie(props.dieIndex)}>
        <div className={`pip--container number-${props.dieNumber}`}>   
            {props.dieNumber>=1 && pip}
            {props.dieNumber>=2 && pip}
            {props.dieNumber>=3 && pip}
            {props.dieNumber>=4 && pip}
            {props.dieNumber>=5 && pip}
            {props.dieNumber>=6 && pip}
            
        {/* <p className="die--number"></p> */}
        </div> 
        </div>  
    )
}

// {`dice--component number-${props.dieNumber}`}