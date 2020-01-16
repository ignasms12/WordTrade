import React from 'react';
import { Link } from 'react-router-dom';


const verifyEmail = (props) => {
    console.log(props);
    if(props.user && !props.user.emailVerified){
        props.user.sendEmailVerification().then(function() {
            console.log("yep")
            var req = new XMLHttpRequest();
            req.open("POST", "https://messaging-server-for-app.herokuapp.com:80/postreq", true);
            req.setRequestHeader('Content-Type', 'application/json');
            var jsondata = JSON.stringify({"uid": props.user.uid, "userName": props.user.displayName[0]});
            req.send(jsondata);

            console.log("Sent");
        }).catch(function(error) {
            // An error happened.
            console.log();
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
