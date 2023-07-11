import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            member: {
                username: this.randomName(),
                color: this.randomColor(),
            },
        };
        this.drone = new window.Scaledrone("OMgrGGyQjsnf91VC", {
            data: this.state.member,
        });
    }

    componentDidMount = () => {
        this.drone.on("open", (error) => {
            if (error) return console.error(error);

            this.setState({
                member: { ...this.state.member, id: this.drone.clientId },
            });
        });
        this.drone.subscribe("observable-room").on("message", (message) => {
            const { member, id, data } = message;
            const newMessage = {
                member,
                text: data,
                id,
            };
            this.setState({ messages: [...this.state.messages, newMessage] });
        });
    };

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };

    /* HELPERS */
    randomName = () => {
        const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
        const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return adjective + noun;
    };

    randomColor = () => {
        return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    };
    /* END HELPERS */

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>My Chat App</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}

export default App;
