import React, { Component } from "react";

class Message extends Component {
    className = () => {
        const messageFromMe =
            this.props.message.member.id === this.props.currentMember.id;
        return messageFromMe
            ? "Messages-message currentMember"
            : "Messages-message";
    };

    render() {
        const { message } = this.props;

        return (
            <li className={this.className()}>
                <span
                    className="avatar"
                    style={{
                        backgroundColor: message.member.clientData.color,
                    }}
                />
                <div className="Message-content">
                    <div className="username">
                        {message.member.clientData.username}
                    </div>
                    <div className="text">{message.text}</div>
                </div>
            </li>
        );
    }
}

export default Message;
