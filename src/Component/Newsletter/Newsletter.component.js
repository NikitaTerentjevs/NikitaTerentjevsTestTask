import React from 'react';
import axios from 'axios';
import { SocialLinks, API_PATH } from "./Newsletter.config";
import './Newsletter.style.scss'


export default class Newsletter extends React.PureComponent {

    constructor() {
        super();
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTermsChange = this.handleTermsChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    state = {
        email: '',
        agreedToTerms: false,
        emailValid: null,
        success: false,
        error: null
    };

    renderSocialMediaLinks() {
       return Object.entries(SocialLinks).map(([key, value]) => {
           return (
               // eslint-disable-next-line jsx-a11y/anchor-has-content
               <a className={ "icon icon-" + value.name } key={ value.name } href={ value.link }/>
           );
       })
    }

    validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/;
        return validation.test(String(email).toLowerCase());
    }

    handleEmailChange (e) {
        var email = e.target.value;
        this.setState({
            email : email,
            emailValid: this.validateEmail(email)
        })
    }

    handleTermsChange (e) {
        this.setState({ agreedToTerms : e.target.checked })
    }

    handleFormSubmit (e) {
        e.preventDefault();
        var { emailValid, agreedToTerms, email } = this.state;

        if (email === '') {
            this.setState({ error: "Email address is required" });
            return;
        }

        if (!emailValid) {
            this.setState({ error: "Please provide a valid e-mail address" });
            return;
        }

        if (!agreedToTerms) {
            this.setState({ error: "You must accept the terms and conditions" });
        }

        if (emailValid && agreedToTerms) {
            axios({
                method: 'post',
                url: API_PATH,
                headers: { 'content-type': 'application/json' },
                data: this.state
            }).then(result => {
                if (!result.data.success) {
                    this.setState({ error: "We are not accepting subscriptions from Colombia emails" }); //validation for columbia emails is done in php since php regex is more flexible than in Java script
                } else {
                    this.setState({ error: null });
                }
                this.setState({ success: result.data.success });
            }).catch(error => {
                this.setState({ error: error.message });
                console.log(error.message);
            });
        }
    }

    renderError() {
        const { error } = this.state;
        return error ? (
            <p className="EmailInput-Error">{ error }</p>
        ) : null;
    }

    renderSubscriptionHeader() {
        return (
            <div className="Newsletter-Heading">
                <h1>Subscribe to newsletter</h1>
                <p className="Subheading">Subscribe to our newsletter and get 10% discount on pineapple glasses.</p>
            </div>
        );
    }

    renderSubscription() {
        return (
            <form onSubmit={ this.handleFormSubmit }>
                <div className="EmailInput-Container">
                    <input
                        className="EmailInput"
                        type="email"
                        id="email"
                        name="email"
                        onChange={ this.handleEmailChange }
                        placeholder="Type your email address here…"
                    />
                    <button
                        className="icon-ic_arrow"
                        onClick={ this.handleFormSubmit }
                        type="button"
                    />
                </div>

                { this.renderError() }

                <div className="TermsOfService">
                    <input
                        className="TermsOfService-Checkbox"
                        id="agreedToTerms"
                        type="checkbox"
                        onChange={ this.handleTermsChange }
                    />
                    <label className="TermsOfService-Label">I agree to <a href="/#" className="TermsOfService-Link">terms
                        of service</a></label>
                </div>
            </form>
        );
    }

    renderSuccessHeader() {
        return (
            <div className="Newsletter-Heading-Success">
                <div className="Success-Icon"/>
                <h1>Thanks for subscribing!</h1>
                <p className="Subheading">You have successfully subscribed to our email listing. Check your email for the discount code.</p>
            </div>
        );
    }



    render () {
        const { success } = this.state;
        return (
            <div className="Newsletter">
                { success ? this.renderSuccessHeader() : this.renderSubscriptionHeader() }
                { !success ?this.renderSubscription() : null }

                <div className='SocialLinks'>
                    { this.renderSocialMediaLinks() }
                </div>
            </div>
        );
    };
}
