import React from 'react'
import ReactDOM from 'react-dom'
import {markdown} from 'markdown';
import '../css/dist/connexion.css'

class Connexion extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: "", password: "", message: {}};
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    onChangeHandler(e){
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({message: {}});
        fetch("/connect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({message: data});
            if (data.type == "success"){
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
            }
        });
    }

    render(){
        let message = (<div></div>);
        if (this.state.message.content !== undefined){
            let type = "alert alert-"+this.state.message.type;
            let content = this.state.message.content;
            message = (<div className={type} role="alert">
                {content}
            </div>)
        }
        return(
            <div className="container">
                <h1>CONNEXION</h1>
                {message}
                <form>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Identifiant</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" name="username" value={this.state.mail} onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Mot de passe</label>
                        <input type="password" className="form-control" id="formGroupExampleInput2" name="password" value={this.state.password} onChange={this.onChangeHandler}/>
                    </div>
                    <button className="btn btn-danger" onClick={this.handleClick}>Se connecter</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Connexion />, document.querySelector("#app"));
