import { Component } from "react";
import React from "react";

class Input extends Component {
    constructor() {
        super();

        this.state = {
            text: "",
        };
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.text) return;

        this.setState({ text: "" });
        this.props.onSendMessage(this.state.text);
    };

    render() {
        return (
            <div className="Input">
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autoFocus
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default Input;
