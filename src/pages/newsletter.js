import Link from "gatsby-link";
import React from "react";
import { connect } from "react-redux";
import { navigateTo } from "gatsby-link";

import SubpageHeader from "../components/SubpageHeader";
import Cart from "../components/Cart";

const windowGlobal = typeof window !== "undefined" && window;
// const CHECKOUT_URL = "https://schneckenhof4-api.herokuapp.com/payment/checkout";
// const CHECKOUT_URL =
// 'https://calm-cliffs-35577.herokuapp.com/payment/checkout';
const CHECKOUT_URL = 'http://localhost:3000/newsletters';

class NewsLetter extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            successMessage: '',
            errorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.target.value })
    }

    handleSubmit(event) {
        this.setState({ successMessage: "", errorMessage: "" })
        event.preventDefault()
        var formBody = {
            "email": this.state.email,
            "isSubscribed": true
        }
        if (this.state.email) {
            fetch(CHECKOUT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formBody)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        if (res.error.statusCode === "422") {
                            this.setState({ successMessage: "Bereits abonniert." })
                        } else {
                            this.setState({ errorMessage: res.error.message })
                        }
                    } else {
                        this.setState({ successMessage: "Abonnement Erfolgreich." });

                    }
                })
                .catch(err => {
                    if (err.error.stausCode === "422") {
                        this.setState({ successMessage: "Bereits abonniert." })
                    } else {
                        this.setState({ errorMessage: err.error.message })
                    }
                });
        } else {
            this.setState({ errorMessage: "Bitte geben Sie zuerst eine E-Mail an." })
        }
    }

    render() {
        return (
            <div className="content-container news-letter">
                <SubpageHeader />
                <div className="news-box">
                    <form>
                        <h3 style={{ color: "white" }}>Ingressu u vostru email à subscribe for the newletter</h3>
                        <input type="email" name="email" placeholder="Email..." onChange={(e) => this.handleChange(e)} /><br />
                        <button onClick={(e) => this.handleSubmit(e)}>Abonniere jetzt</button>
                    </form>
                    <h5 className="success">{this.state.successMessage}</h5>
                    <h5 className="error">{this.state.errorMessage}</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ count, items, shipping, total, grandTotal }) => {
    return { count, items, shipping, total, grandTotal };
};

const mapDispatchToProps = dispatch => {
    return {
        clear: () => dispatch({ type: "CLEAR" })
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(newsLetter);
export default NewsLetter