import React from 'react';
import ReactDOM from 'react-dom';
import {markdown} from 'markdown';
import '../css/chapter.scss';

class Chapter extends React.Component{
    constructor(props){
        super(props);
        this.state = {chapter: null}
        let temp = window.location.href.split("/");
        this.id = parseInt(temp[temp.length-1]);
    }

    componentDidMount(){
        fetch("/api/chapter/"+this.id).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({chapter: data});
            window.title = data.title;
        })
    }

    render(){
        if (this.state.chapter != null){
            return(
                <div dangerouslySetInnerHTML={{__html: markdown.toHTML(this.state.chapter.content)}}>
                </div>
                
            )
        } else {
            return (<div></div>)
        }
        
    }
}

ReactDOM.render(<Chapter/>,document.querySelector("#app"))