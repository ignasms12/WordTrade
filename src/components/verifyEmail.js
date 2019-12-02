import React from 'react'

//@TODO Style the page

const verifyEmail = (props) => {
    console.log(props);
    if(props.user && !props.user.emailVerified){
        props.user.sendEmailVerification().then(function() {
            // Email sent.
            console.log("Sent");
        }).catch(function(error) {
            // An error happened.
            console.log("Error sending verification email");
        });
    }
    return (
        <div>
            You are not verified
        </div>
    )
}

export default verifyEmail;
