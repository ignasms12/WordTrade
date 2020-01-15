import React from 'react';

function Message(props) {  
    if(props.id == props.userId){
        return (
            <div className="message message-self">
                <div className="message-text message-self-inline-block">
                    <div className="message-username message-self-title">{props.username}</div><p className="message-self-bg">{props.text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="message">
                <div className="message-text">
                    <div className="message-username">{props.username}</div><p>{props.text}</p>
                </div>
            </div>
        )
    }
}

export default Message