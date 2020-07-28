import React from 'react'
import ReactDOM from 'react-dom'
import '../css/dist/connexion.css'

class Connexion extends React.Component{
    constructor(props){
        super(props);
        this.state = {mail: "", password: ""};
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onChangeHandler(e){
        const name = e.target.name;
        if (name == "mail" && this.validateEmail(e.target.value)){
            this.setState({mailOk: true});
        } else if(name== "mail") {
            this.setState({mailOk: false})
        }
        this.setState({
            [name]: e.target.value
        });
        
    }

    render(){
        let mailMsg = "";
        let mailStatus = "form-control is-";
        let mailFeedback = "-feedback"
        if (!this.state.mailOk && this.state.mail.length > 0){
            mailStatus += "invalid";
            mailFeedback = "invalid"+mailFeedback;
            mailMsg = "Veuillez rentrer une adresse mail valide"
        } else if (this.state.mailOk && this.state.mail.length > 0){
            mailStatus += "valid";
            mailFeedback = "valid"+mailFeedback;
            mailMsg = "Adresse mail OK"
        } else {
            mailStatus = "form-control";
            mailFeedback = "";
            mailMsg = "";
        }
        return(
            <div className="container">
                <h1>CONNEXION</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Adresse mail</label>
                        <input type="text" className={mailStatus} id="formGroupExampleInput" name="mail" placeholder="exemple@domaine.fr" value={this.state.mail} onChange={this.onChangeHandler}/>
                    </div>
                    <div className={mailFeedback}>
                        {mailMsg}
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Mot de passe</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" name="password" placeholder="Password" value={this.state.password} onChange={this.onChangeHandler}/>
                    </div>
                    <button className="btn btn-danger">Se connecter</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Connexion/>,document.querySelector("#app"))