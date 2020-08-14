import React from 'react';
import ReactDOM from 'react-dom';
import ChapterInputs from './chapterInputs';
import '../css/chapterInputs.scss'



class ModifyChapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {title: "", content: "", wantSee: "preview", image: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sendChapter = this.sendChapter.bind(this);
        this.id = null;
    }

    componentDidMount(){
        let tempArray = window.location.href.split("/");
        this.id = parseInt(tempArray[tempArray.length-1]);
        fetch("/api/chapter/"+this.id).then(res => res.json()).then(data => {
            this.setState({title: data.title, content: data.content});
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
        fetch("/changeChapter",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chapter_id: this.id,
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

ReactDOM.render(<ModifyChapter/>,document.querySelector("#app"))