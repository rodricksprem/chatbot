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
        // const botIcon ="./bot.png";
        // const humanIcon = "./humanface.png"
        let isQueryResponse: boolean = chat.isQueryResponse;
        console.log({isQueryResponse});
      
        let isAssistant:boolean = chat.source==="ASSISTANT";
        let isProcessing:boolean = chat.source==="ASSISTANT" && chat.text==="Processing...";
        console.log(isAssistant);
        console.log(isProcessing);
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
                  ></ChatAssistant>
        )} else{
            return(<ChatHuman 
                  
                  className={className}
                  imageIcon={botIcon}
                  imageAlt="User"
                  content={chat.text}
                  ></ChatHuman>
            )
        }
                    
                 
                    
             
    }   
}