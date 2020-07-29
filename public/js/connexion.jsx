import React from 'react'
import ReactDOM from 'react-dom'
import {markdown} from 'markdown';
import '../css/dist/connexion.css'

class Connexion extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: "", password: ""};
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    onChangeHandler(e){
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.state);
        fetch("/connect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        });
    }

    render(){
        return(
            <div className="container">
                <h1>CONNEXION</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Identifiant</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" name="identifiant" placeholder="exemple@domaine.fr" value={this.state.mail} onChange={this.onChangeHandler}/>
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

ReactDOM.render(<Connexion />, document.querySelector("#app"));
