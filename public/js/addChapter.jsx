import React from 'react';
import ReactDOM from 'react-dom';
import '../css/dist/addChapter.css'

class AddChapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {experience: null};
    }

    componentDidMount(){
        let tempArray = window.location.href.split("/");
        let id = parseInt(tempArray[tempArray.length-1]);
        fetch("/api/experience/"+id).then(res => res.json()).then(data => {
            this.setState({experience: data});
        })
    }

    render(){
        return(
            <div>
                <h1>AJOUTER UN CHAPITRE<br/>-<br/>{this.state.experience != null ? this.state.experience.company : "Loading"}</h1>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}

ReactDOM.render(<AddChapter/>,document.querySelector("#app"))