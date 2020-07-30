import React from 'react';
import ReactDOM from 'react-dom';
import {markdown} from 'markdown';
import '../css/dist/addChapter.css'

class AddChapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {experience: null, title: "", content: "", wantSee: "preview"};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        let tempArray = window.location.href.split("/");
        let id = parseInt(tempArray[tempArray.length-1]);
        fetch("/api/experience/"+id).then(res => res.json()).then(data => {
            this.setState({experience: data});
        })
    }

    handleChange(e){
        console.log(e.target.name)
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    handleClick(span){
        this.setState({
            wantSee: span,
        });
    }

    render(){
        let right = (<div></div>);
        if (this.state.wantSee == "preview"){
            right = (
                <span id="right">
                        <span><h2>Prévisualisation</h2> <span>-</span> <span><b>Preview</b></span> <span onClick={this.handleClick.bind(this, "source")}>Source</span></span>
                        <div id="content" dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.content)}}></div>
                </span>
            )
            
        } else {
            right = (
                <span id="right">
                    <span><h2>Prévisualisation</h2> <span>-</span> <span onClick={this.handleClick.bind(this, "preview")}>Preview</span> <span><b>Source</b></span></span>
                    <div id="content">{markdown.toHTML(this.state.content)}</div>
                </span>
            )
        }
        return(
            <div>
                <div id="header">
                    <h1>AJOUTER UN CHAPITRE<br/>-<br/>{this.state.experience != null ? this.state.experience.company : "Loading"}</h1>
                </div>
                <div id="inputs">
                    <span id="left">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Titre chapitre</label>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange} name="title" id="exampleFormControlInput1" placeholder="La fôret de brocéliande"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput2">Contenu</label>
                            <textarea type="text" className="form-control" value={this.state.content} onChange={this.handleChange} name="content" id="exampleFormControlInput2"></textarea>
                        </div>
                    </span>
                    {right}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<AddChapter/>,document.querySelector("#app"))