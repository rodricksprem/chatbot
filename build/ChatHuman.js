import React from "react";
export class ChatHuman extends React.Component {
    render() {
        let className = this.props.className;
        let imageIcon = this.props.imageIcon;
        let imageAlt = this.props.imageAlt;
        let content = this.props.content;
        return (React.createElement("div", { className: className },
            React.createElement("span", { className: "fbot-bubble-src" },
                React.createElement("img", { src: imageIcon, alt: imageAlt, className: "user-img" })),
            React.createElement("span", { className: "fbot-bubble-text" }, content)));
    }
}
//# sourceMappingURL=ChatHuman.js.map