
import React from "react";
import { createRoot } from 'react-dom/client';
import { CSSProperties } from "react";
import './ChatBot.css';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Configuration, OpenAIApi } from "openai";
import { ChatItem } from "./ChatItem";
import { ChatBubble } from "./ChatBubble";
import axios from 'axios';
declare var manywho: any;

export default class ChatBotDBX extends React.Component<any,any> {
    
    conversation: ChatItem[];
    conversationElement: any;
    configuration = new Configuration({
      apiKey: ""
    });        
    openai: OpenAIApi;
    textInput: HTMLTextAreaElement;
    textOutput: HTMLTextAreaElement;

    constructor(props: any){
        super(props);
        this.open=this.open.bind(this);
        this.close=this.close.bind(this);
        this.getAnswer=this.getAnswer.bind(this);
        this.conversation = [];
        this.conversation.push(new ChatItem("ASSISTANT","Hi, how can i help you today?",false));
        this.state={size: "min", answer: ""}
    }

    componentDidMount(){
    
      
    }

    open(e: any) {
        this.setState({size: "max"})
    }

    close(e: any) {
        this.setState({size: "min"});
        this.go();
    }

    async getAnswer(e: any){
        if(e.key==="Enter") {
            this.conversation.push(new ChatItem("YOU", this.textInput.value,false));
            this.setState({answer: "Thinking about it ..."}, () => {this.conversationElement.scrollTop = this.conversationElement.scrollHeight});
            try {
                
                const response = await axios.post(
                  'https://dbc-61d14746-e672.cloud.databricks.com/serving-endpoints/text_to_sql_using_dbxllm_endpoint/invocations',
                   {
                    inputs:{
                       question: this.textInput.value,
                    }
                    },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.configuration.apiKey}`,
                    },
                    
                  },
                  
                );
          
                this.textInput.value="";
                 this.conversation.push(new ChatItem("ASSISTANT", response.data.predictions.prediction,true))
                  this.setState({answer: ""},() => {this.conversationElement.scrollTop = this.conversationElement.scrollHeight});
              } catch (error) {
                console.error('Error sending message:', error);
              }
           
        }
    }

    async go() {
        let navId: string = manywho.model.getDefaultNavigationId(this.props.flowKey);
        if(navId) {
            let nav: any = manywho.model.getNavigation(navId, this.props.flowKey);
            if(nav) {
                let navItem: any = Object.values(nav.items)[0];
                if(navItem) {
                    let stateId: string = manywho.utils.extractStateId(this.props.flowKey);
                    let tenantId: string = manywho.utils.extractTenantId(this.props.flowKey);
                    let token: string = manywho.state.getAuthenticationToken(this.props.flowKey);
                    let baseUrl: string = "";
                    if((!manywho.settings.global('platform.uri')) && (manywho.settings.global('platform.uri').length <= 0)) {
                        baseUrl = window.location.origin || 'https://flow.manywho.com';
                    } 
                    else {
                        baseUrl = manywho.settings.global('platform.uri');
                    }
                    let valueurl = `${baseUrl}/api/run/1/state/${stateId}/values`;
                    
                    
                    const request: RequestInit = {};
                    request.method = "POST";  
                    request.headers = {
                        "Content-Type": "application/json",
                        "ManyWhoTenant": tenantId
                    };
                    if(token) {
                        request.headers.Authorization = token;
                    }
                    request.credentials= "same-origin";
                    
                    //get value
                    request.method = "GET";  
                    let response = await fetch(`${valueurl}/name/Global: NextModule`, request);
                    let obj = await response.json();

                    request.method = "POST";  
                    //let data: any = {};
                    //data.developerName="BotNextModule";
                    obj.contentValue="290cd9f6-f696-46dd-8dd8-313662309ae9";
                    //data.contentType="ContentString";
                    //data.objectData=[];
                    request.body = JSON.stringify([obj]);
                    response = await fetch(valueurl, request);
                    await manywho.engine.navigate(navId, navItem.navigationItemId, null, this.props.flowKey);
                }
            }
        }
    }

    render() {
        
        switch(this.state.size){
            case "min":
                return (
                    <div
                        className='fbot fbot-min'
                        onClick = {this.open}
                        title="Click to open chat"
                    >
                        <FontAwesomeIcon 
                            icon={faComments} 
                        />
                    </div>
                );
                
            case "max":
                let chats: any[] = [];
                for(let pos = 0 ; pos < this.conversation.length ; pos++) {
                    chats.push(
                        <ChatBubble 
                            key={this.conversation[pos].time.getTime()}
                            item={this.conversation[pos]}
                        />
                    );
                }

                return (
                    <div
                        className='fbot fbot-max'
                    >
                        <div
                            className="fbot-title"
                        >
                            <FontAwesomeIcon 
                                className="fbot-title-icon"
                                icon={faComments} 
                                onClick={this.close} 
                            />
                            <span
                                className="fbot-title-label"
                            >
                                GSC Chat
                            </span>
                            <FontAwesomeIcon 
                                className="fbot-title-button"
                                icon={faCircleXmark} 
                                title="Close"
                                onClick={this.close} 
                            />
                        </div>
                        <div
                            className="fbot-body"
                        >
                            <div
                                className="fbot-conversation"
                                ref={(element: any) => {this.conversationElement=element}}
                            >
                                {chats}
                            </div>
                        </div>
                        <div
                            className="fbot-footer"
                        >
                            <textarea 
                                className="fbot-question"
                                rows={3}
                                ref={(element: HTMLTextAreaElement)=>{this.textInput = element}}
                                onKeyUp={this.getAnswer}
                                placeholder="Ask me something and press enter."
                            />
                        </div>
                    </div>
                );
        }
    }
}

/*
if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    prepBot();
} else {
    document.addEventListener('DOMContentLoaded', prepBot);
}

function prepBot() {
    let bot: any = document.getElementById("bot");
    if(bot){
        const root = createRoot(bot);
        root.render(<ChatBot/>);
        console.log("injected");
    }
    document.removeEventListener('DOMContentLoaded', prepBot);
}
*/

manywho.component.register("Chatbot", ChatBotDBX);
