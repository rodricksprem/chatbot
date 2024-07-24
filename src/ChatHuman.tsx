import React from "react";
import { Comment } from "react-loader-spinner";

export class ChatHuman extends React.Component<any,any> {

    render() {
        let className: string = this.props.className;
        let imageIcon: string = this.props.imageIcon;
        let imageAlt:string= this.props.imageAlt;
       let content:string=this.props.content;
       let time:Date=this.props.time;
       
       let hoursAndMinute:string= time.getHours() + ':' + time.getMinutes() 
       let isQueryResponse:boolean = this.props.isQueryResponse;
        return(
            <div>
            <div
                className={className}
            >
                <span
                    className="fbot-bubble-src"
                >
                 
                    <img
                    src={imageIcon}
                    alt={imageAlt} className="user-img"
                ></img>
                 
                    
                    
                </span>
                <span
                    className="fbot-bubble-usr-text">
                   {content}
                </span>
               
             </div>
             <div className="fbot-bubble-usr-time">{hoursAndMinute}</div>
             </div>
        )
    }
}