import React from 'react';
import { Link } from 'react-router-dom';


const verifyEmail = (props) => {
    console.log(props);
    if(props.user && !props.user.emailVerified){
        props.user.sendEmailVerification().then(function() {
            var req = new XMLHttpRequest();
            req.open("POST", "http://localhost:4000/postreq", true);
            req.setRequestHeader('Content-Type', 'application/json');
            var jsondata = JSON.stringify({"uid": props.user.uid, "userName": props.user.displayName[0]});
            req.send(jsondata);

            console.log("Sent");
        }).catch(function(error) {
            // An error happened.
            console.log("Error sending verification email");
        });
    }
    return (
        <React.Fragment>
                    <body>
                        <header>                    
                            <h1 className="wordTrade">WordTrade</h1>
                        </header>
                        <div className="spacer"></div>
                        <section className="wishList">
                            <label className="wishlistLabel">Deals</label>
                            <h1 className="noDeals">
                                <span class="sorry">Verification email has been sent,</span>
                                 please verify your email, then continue.
                            </h1>
                        </section>
                            <Link to = "/wishlist"><span class="continue">Continue</span></Link>
                    </body>
                </React.Fragment>
    )
}

export default verifyEmail;
