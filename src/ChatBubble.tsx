import React from "react";
import { ChatItem } from "./ChatItem";
import botIcon from "./bot.png";
import humanIcon from "./humanface.png";
import botwithbgIcon from "./botwithbg.png";
import { Comment } from "react-loader-spinner";
import { ChatAssistant } from "./ChatAssistant";
import { ChatHuman } from "./ChatHuman";

export class ChatBubble extends React.Component<any,any> {

    render() {
        let chat: ChatItem = this.props.item;
         let className: string = "fbot-bubble";
        // const botIcon ="./bot.png";
        // const humanIcon = "./humanface.png"
        let isQueryResponse: boolean = chat.isQueryResponse;
        let isAssistant:boolean = chat.source==="ASSISTANT";
        let isProcessing:boolean = chat.source==="ASSISTANT" && chat.text==="Processing...";
        console.log("isAssistant ",isAssistant);
        console.log("isProcessing ",isProcessing);
        console.log("isqueryresponse ",isQueryResponse);
        if(isAssistant){
            className += " fbot-bubble-bot";
            
        }
        else {
            className += " fbot-bubble-usr";
        }
        if(isAssistant){
        return(
            
        <ChatAssistant 
                  
                  className={className}
                  imageIcon={botwithbgIcon}
                  imageAlt="Bot"
                  isProcessing={isProcessing}
                  content={chat.text}
                  isQueryResponse= {isQueryResponse}
                  ></ChatAssistant>
        )} else{
            return(<ChatHuman 
                  
                  className={className}
                  imageIcon={humanIcon}
                  imageAlt="User"
                 
                  content={chat.text}
                  ></ChatHuman>
            )
        }
                    
                 
                    
             
    }   
}