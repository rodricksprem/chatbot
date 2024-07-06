import React from "react";
import { ChatItem } from "./ChatItem";

export class ChatBubble extends React.Component<any,any> {

    render() {
        let chat: ChatItem = this.props.item;
        let className: string = "fbot-bubble";
        if(chat.source==="ASSISTANT"){
            className += " fbot-bubble-bot"
        }
        else {
            className += " fbot-bubble-usr"
        }

        return(
            <div
                className={className}
            >
                <span
                    className="fbot-bubble-src"
                >
                    {chat.source+ ":"}
                </span>
                <span
                    className="fbot-bubble-text"
                >
                    {chat.text}
                </span>
            </div>
        )
    }
}