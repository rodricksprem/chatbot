import React from "react";
import humanIcon from "./humanface.png";
import botwithbgIcon from "./botwithbg.png";
import { ChatAssistant } from "./ChatAssistant";
import { ChatHuman } from "./ChatHuman";
export class ChatBubble extends React.Component {
    render() {
        let chat = this.props.item;
        let className = "fbot-bubble";
        // const botIcon ="./bot.png";
        // const humanIcon = "./humanface.png"
        let isQueryResponse = chat.isQueryResponse;
        let isAssistant = chat.source === "ASSISTANT";
        let isProcessing = chat.source === "ASSISTANT" && chat.text === "Processing...";
        console.log("isAssistant ", isAssistant);
        console.log("isProcessing ", isProcessing);
        console.log("isqueryresponse ", isQueryResponse);
        if (isAssistant) {
            className += " fbot-bubble-bot";
        }
        else {
            className += " fbot-bubble-usr";
        }
        if (isAssistant) {
            return (React.createElement(ChatAssistant, { className: className, imageIcon: botwithbgIcon, imageAlt: "Bot", isProcessing: isProcessing, content: chat.text, isQueryResponse: isQueryResponse }));
        }
        else {
            return (React.createElement(ChatHuman, { className: className, imageIcon: humanIcon, imageAlt: "User", content: chat.text }));
        }
    }
}
//# sourceMappingURL=ChatBubble.js.map