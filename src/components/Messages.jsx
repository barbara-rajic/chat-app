import { Component } from "react";
import React from "react";
import Message from "./Message";

class Messages extends Component {
    render() {
        const { messages, currentMember } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map((message) => (
                    <Message key={message.id} message={message} currentMember={currentMember} />
                ))}
            </ul>
        );
    }
}

export default Messages;
