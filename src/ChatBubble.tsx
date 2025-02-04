import React from "react";
import { ChatItem } from "./ChatItem";
import botIcon from "./bot.png";
import humanIcon from "./humanface.png";
import { Comment } from "react-loader-spinner";
import { ChatAssistant } from "./ChatAssistant";
import { ChatHuman } from "./ChatHuman";

export class ChatBubble extends React.Component<any,any> {

    render() {
        let chat: ChatItem = this.props.item;
         let className: string = "fbot-bubble";
        let isQueryResponse: boolean = chat.isQueryResponse;
        let isAssistant:boolean = chat.source==="ASSISTANT";
        let isProcessing:boolean = chat.source==="ASSISTANT" && chat.text==="Processing...";
        console.log("isAssistant ",isAssistant);
        console.log("isProcessing ",isProcessing);
        console.log("isqueryresponse ",isQueryResponse);
        console.log("chat time ",chat.time)
        
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
                  imageIcon={botIcon}
                  imageAlt="Bot"
                  isProcessing={isProcessing}
                  content={chat.text}
                  isQueryResponse= {isQueryResponse}
                  time={chat.time}
                  ></ChatAssistant>
                  
        )} else{
            return(<ChatHuman 
                  
                  className={className}
                  imageIcon={humanIcon}
                  imageAlt="User"
                 
                  content={chat.text}
                  time={chat.time}
                  ></ChatHuman>
            )
        }
                    
                 
                    
             
    }   
}