import React from 'react';
import ReactDOM from 'react-dom';
import ChapterInputs from './chapterInputs';
import '../css/chapterInputs.scss'



class AddChapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {experience: null, title: "", content: "", wantSee: "preview", image: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sendChapter = this.sendChapter.bind(this);
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

    sendChapter(e){
        fetch("/createChapter",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                experience_id: this.state.experience.id,
                title: this.state.title,
                content: this.state.content,
                image: this.state.image
            }),
        }).then(() => {
            window.location.href = "/admin";
        })
    }

    render(){
        return (<ChapterInputs state={this.state} sendChapter={this.sendChapter} handleClick={this.handleClick} handleChange={this.handleChange}/>)
    }
}

ReactDOM.render(<AddChapter/>,document.querySelector("#app"))