import React from "react";
import { ChatItem } from "./ChatItem";
import botIcon from "./bot.png";
import humanIcon from "./humanface.png";
import { Comment } from "react-loader-spinner";

export class ChatHuman extends React.Component<any,any> {

    render() {
        let className: string = this.props.className;
        let imageIcon: string = this.props.imageIcon;
        let imageAlt:string= this.props.imageAlt;
       let content:string=this.props.content;
        return(
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
                    className="fbot-bubble-text">
                   {content}
                </span>
               
             </div>
        )
    }
}