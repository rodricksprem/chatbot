import React from "react";
import { createRoot } from "react-dom/client";
import { CSSProperties } from "react";
import "./ChatBot.css";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Configuration, OpenAIApi } from "openai";
import { ChatItem } from "./ChatItem";
import { ChatBubble } from "./ChatBubble";
import axios from "axios";


import botIcon from "./bot.png";
declare var manywho: any;

export default class ChatBot extends React.Component<any, any> {
  conversation: ChatItem[];
  conversationElement: any;
  configuration = new Configuration({
    apiKey: "",
  });
  openai: OpenAIApi;
  textInput: HTMLTextAreaElement;
  textOutput: HTMLTextAreaElement;

  constructor(props: any) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.conversation = [];
    this.conversation.push(
      new ChatItem("ASSISTANT", "Hi, how can i help you today?", false)
    );
    this.state = { size: "min", answer: "" };
  }

  componentDidMount() {}

  open(e: any) {
    this.setState({ size: "max" });
  }

  close(e: any) {
    this.setState({ size: "min" });
    this.go();
  }

  async getAnswer(e: any) {
    if (e.key === "Enter") {
      const quest = this.textInput.value;
      this.textInput.value = "";
      this.textInput.disabled = true;

      this.conversation.push(new ChatItem("YOU", quest, false,));
      this.setState({ answer: "Thinking about it ..." }, () => {
        this.conversationElement.scrollTop =
          this.conversationElement.scrollHeight;
      });
      let proccesing: ChatItem = new ChatItem(
        "ASSISTANT",
        "Processing...",
        false
      );
      this.conversation.push(proccesing);
      try {
        const response = await axios.post(
          "https://etifvwys6j5da7z2tehdswjnka0tkwlk.lambda-url.us-east-1.on.aws/",
          {
            inputs: {
              question: quest,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        this.conversation.pop();
        this.conversation.push(
          new ChatItem("ASSISTANT", response.data.predictions.prediction, true)
        );
        this.setState({ answer: "" }, () => {
          this.conversationElement.scrollTop =
            this.conversationElement.scrollHeight;
        });
        this.textInput.disabled = false;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }

  async go() {
    let navId: string = manywho.model.getDefaultNavigationId(
      this.props.flowKey
    );
    if (navId) {
      let nav: any = manywho.model.getNavigation(navId, this.props.flowKey);
      if (nav) {
        let navItem: any = Object.values(nav.items)[0];
        if (navItem) {
          let stateId: string = manywho.utils.extractStateId(
            this.props.flowKey
          );
          let tenantId: string = manywho.utils.extractTenantId(
            this.props.flowKey
          );
          let token: string = manywho.state.getAuthenticationToken(
            this.props.flowKey
          );
          let baseUrl: string = "";
          if (
            !manywho.settings.global("platform.uri") &&
            manywho.settings.global("platform.uri").length <= 0
          ) {
            baseUrl = window.location.origin || "https://flow.manywho.com";
          } else {
            baseUrl = manywho.settings.global("platform.uri");
          }
          let valueurl = `${baseUrl}/api/run/1/state/${stateId}/values`;

          const request: RequestInit = {};
          request.method = "POST";
          request.headers = {
            "Content-Type": "application/json",
            ManyWhoTenant: tenantId,
          };
          if (token) {
            request.headers.Authorization = token;
          }
          request.credentials = "same-origin";

          //get value
          request.method = "GET";
          let response = await fetch(
            `${valueurl}/name/Global: NextModule`,
            request
          );
          let obj = await response.json();

          request.method = "POST";
          //let data: any = {};
          //data.developerName="BotNextModule";
          obj.contentValue = "290cd9f6-f696-46dd-8dd8-313662309ae9";
          //data.contentType="ContentString";
          //data.objectData=[];
          request.body = JSON.stringify([obj]);
          response = await fetch(valueurl, request);
          await manywho.engine.navigate(
            navId,
            navItem.navigationItemId,
            null,
            this.props.flowKey
          );
        }
      }
    }
  }

  render() {
    switch (this.state.size) {
      case "min":
        return (
          <div
            className="fbot fbot-min"
            onClick={this.open}
            title="Click to open chat"
          >
            <FontAwesomeIcon icon={faComments} />
          </div>
        );

      case "max":
        let chats: any[] = [];
        for (let pos = 0; pos < this.conversation.length; pos++) {
          chats.push(
            <ChatBubble
              key={this.conversation[pos].time.getTime()}
              item={this.conversation[pos]}
            />
          );
        }

        return (
            <div className="fbot fbot-max">
            <div className="hIBePD">
              <div className="dyxozL">
                <div className="dRaMVw">
                  <div className="gsshEm">
                    <div className="ePFAfP">
                      <div className="fqXYVo">
                        <img
                          src={botIcon}
                          alt="Chat with Virtual Assistant"
                          title="Chat with Virtual Assistant"
                          style={
                            {
                              margin: "0px",
                              padding: "0px",
                              height: "100%",
                              width: "100%",
                              "border-radius": "40px",
                            } as React.CSSProperties
                          }
                        ></img>
                      </div>
                      <div className="cqsqAH">ClinicalOps Virtual Assistant</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                title="Close chat"
                role="button"
                aria-label="close chat button"
                className="bIGVOb"
              >
                <svg
                  height="15px"
                  viewBox="0 0 15 15"
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    style={
                      { fill: "rgb(255, 255, 255)" } as React.CSSProperties
                    }
                  >
                    <polygon points="0 14.0186916 14.0186916 0 15 0.981308396 0.981308396 15"></polygon>
                    <polygon points="0.981308396 0 15 14.0186916 14.0186916 15 0 0.981308396"></polygon>
                  </g>
                </svg>
              </div>
            </div>

            <div className="eYhqoF">
              <div
                className="fbot-conversation"
                  ref={(element: any) => {
                    this.conversationElement = element;
                  }}
                >
                  {chats}
              
              </div>
            </div>

            <div className="bjNMke">
              <div className="hiYdui">
                <div className="cOALSM">
                  <textarea
                    rows={1}
                    placeholder="Type a message and press Enter"
                    tabIndex={1}
                    className="kTlUVN"
                    style={{ height: "35px" } as React.CSSProperties}
		     ref={(element: HTMLTextAreaElement)=>{this.textInput = element}}
                                onKeyUp={this.getAnswer}
                  ></textarea>
                </div>
                <button
                  tabIndex={2}
                  title="Send message"
                  aria-label="submit"
                  type="button"
                  className="jxmml"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="14"
                    viewBox="0 0 22 17"
                    style={
                      {
                        transform: "scale(1.35, 1.35)",
                      } as React.CSSProperties
                    }
                  >
                    <g>
                      <g>
                        <path
                          d="M0.578947368,4.53333333 L21.4210526,0.566666667 L11.7719298,16.3119048 L8.44271032,12.5348915 C7.93874622,11.9631421 7.99369703,11.0911041 8.56544638,10.58714 C8.56691312,10.5858471 8.56838261,10.5845574 8.56985483,10.5832708 L16.7894737,3.4 L5.079888,7.74709505 C4.58578169,7.93052827 4.03034241,7.81650277 3.64846667,7.45324016 L0.578947368,4.53333333 Z"
                          style={
                            { fill: "rgb(1, 60, 103)" } as React.CSSProperties
                          }
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
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

manywho.component.register("Chatbot", ChatBot);

