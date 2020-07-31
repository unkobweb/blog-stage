import React from 'react';
import ReactDOM from 'react-dom';
import '../css/dist/admin.css';

function AddChapter({id}){
    return(
        <a className="addchapter" href={"/addChapter/"+id}><p>Ajouter un chapitre</p></a>
    )
}

function Chapitre({id, title}){
    return(
        <div className="chapter">
            <span id="left">
                <span id="arrows">
                    <div>
                        <i className="fas fa-chevron-up"></i>
                    </div>
                    <div>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </span>
                <span id="content">ID : {id} - {title}</span>
            </span>
            <span id="right">
                <button>Modifier</button>
                <button>Supprimer</button>
            </span>
        </div>
    )
}

function Experience({experience}){
    let rows = []
    let lastId = 0;
    experience.chapters.forEach(chapter => {
        rows.push(<Chapitre key={chapter.id} id={chapter.id} title={chapter.title}/>)
        lastId = chapter.id;
    })
    rows.push(<AddChapter key={lastId+1} id={experience.id}/>)
    return(
        <div className="experience">
            <h2>{experience.company}</h2>
            <div className="chapters">
                {rows}
            </div>
        </div>
    )
}

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {experiences : null}
    }

    componentDidMount(){
        fetch("/api/getAdmin").then(res => res.json()).then(data => this.setState({experiences: data}))
    }

    render(){
        if (this.state.experiences == null){
            return <div></div>
        }
        let rows = [];
        this.state.experiences.forEach(experience => {
            rows.push(<Experience key={experience.id} experience={experience}/>)
        });
        return(
            <div>
                <h1>ADMIN PANEL</h1>
                <div id="experiences">
                    {rows}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Admin/>,document.querySelector("#app"))