import React from 'react';

function Message(props) {  
    if(props.id == props.userId){
        return (
            <div className="message message-self">
                <div className="message-text message-self-bg">
                    <div className="message-username message-self-title">{props.username}</div>{props.text}
                </div>
            </div>
        )
    } else {
        return (
            <div className="message">
                <div className="message-text">
                    <div className="message-username">{props.username}</div>{props.text}
                </div>
            </div>
        )
    }
}

export default Message