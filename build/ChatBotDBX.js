var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import './ChatBot.css';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Configuration } from "openai";
import { ChatItem } from "./ChatItem";
import { ChatBubble } from "./ChatBubble";
import axios from 'axios';
export default class ChatBotDBX extends React.Component {
    constructor(props) {
        super(props);
        this.configuration = new Configuration({
            apiKey: ""
        });
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
        this.conversation = [];
        this.conversation.push(new ChatItem("ASSISTANT", "Hi, how can i help you today?", false));
        this.state = { size: "min", answer: "" };
    }
    componentDidMount() {
    }
    open(e) {
        this.setState({ size: "max" });
    }
    close(e) {
        this.setState({ size: "min" });
        this.go();
    }
    getAnswer(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (e.key === "Enter") {
                this.conversation.push(new ChatItem("YOU", this.textInput.value, false));
                this.setState({ answer: "Thinking about it ..." }, () => { this.conversationElement.scrollTop = this.conversationElement.scrollHeight; });
                try {
                    const response = yield axios.post('https://dbc-61d14746-e672.cloud.databricks.com/serving-endpoints/text_to_sql_using_dbxllm_endpoint/invocations', {
                        inputs: {
                            question: this.textInput.value,
                        }
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.configuration.apiKey}`,
                        },
                    });
                    this.textInput.value = "";
                    this.conversation.push(new ChatItem("ASSISTANT", response.data.predictions.prediction, true));
                    this.setState({ answer: "" }, () => { this.conversationElement.scrollTop = this.conversationElement.scrollHeight; });
                }
                catch (error) {
                    console.error('Error sending message:', error);
                }
            }
        });
    }
    go() {
        return __awaiter(this, void 0, void 0, function* () {
            let navId = manywho.model.getDefaultNavigationId(this.props.flowKey);
            if (navId) {
                let nav = manywho.model.getNavigation(navId, this.props.flowKey);
                if (nav) {
                    let navItem = Object.values(nav.items)[0];
                    if (navItem) {
                        let stateId = manywho.utils.extractStateId(this.props.flowKey);
                        let tenantId = manywho.utils.extractTenantId(this.props.flowKey);
                        let token = manywho.state.getAuthenticationToken(this.props.flowKey);
                        let baseUrl = "";
                        if ((!manywho.settings.global('platform.uri')) && (manywho.settings.global('platform.uri').length <= 0)) {
                            baseUrl = window.location.origin || 'https://flow.manywho.com';
                        }
                        else {
                            baseUrl = manywho.settings.global('platform.uri');
                        }
                        let valueurl = `${baseUrl}/api/run/1/state/${stateId}/values`;
                        const request = {};
                        request.method = "POST";
                        request.headers = {
                            "Content-Type": "application/json",
                            "ManyWhoTenant": tenantId
                        };
                        if (token) {
                            request.headers.Authorization = token;
                        }
                        request.credentials = "same-origin";
                        //get value
                        request.method = "GET";
                        let response = yield fetch(`${valueurl}/name/Global: NextModule`, request);
                        let obj = yield response.json();
                        request.method = "POST";
                        //let data: any = {};
                        //data.developerName="BotNextModule";
                        obj.contentValue = "290cd9f6-f696-46dd-8dd8-313662309ae9";
                        //data.contentType="ContentString";
                        //data.objectData=[];
                        request.body = JSON.stringify([obj]);
                        response = yield fetch(valueurl, request);
                        yield manywho.engine.navigate(navId, navItem.navigationItemId, null, this.props.flowKey);
                    }
                }
            }
        });
    }
    render() {
        switch (this.state.size) {
            case "min":
                return (React.createElement("div", { className: 'fbot fbot-min', onClick: this.open, title: "Click to open chat" },
                    React.createElement(FontAwesomeIcon, { icon: faComments })));
            case "max":
                let chats = [];
                for (let pos = 0; pos < this.conversation.length; pos++) {
                    chats.push(React.createElement(ChatBubble, { key: this.conversation[pos].time.getTime(), item: this.conversation[pos] }));
                }
                return (React.createElement("div", { className: 'fbot fbot-max' },
                    React.createElement("div", { className: "fbot-title" },
                        React.createElement(FontAwesomeIcon, { className: "fbot-title-icon", icon: faComments, onClick: this.close }),
                        React.createElement("span", { className: "fbot-title-label" }, "GSC Chat"),
                        React.createElement(FontAwesomeIcon, { className: "fbot-title-button", icon: faCircleXmark, title: "Close", onClick: this.close })),
                    React.createElement("div", { className: "fbot-body" },
                        React.createElement("div", { className: "fbot-conversation", ref: (element) => { this.conversationElement = element; } }, chats)),
                    React.createElement("div", { className: "fbot-footer" },
                        React.createElement("textarea", { className: "fbot-question", rows: 3, ref: (element) => { this.textInput = element; }, onKeyUp: this.getAnswer, placeholder: "Ask me something and press enter." }))));
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
//# sourceMappingURL=ChatBotDBX.js.map