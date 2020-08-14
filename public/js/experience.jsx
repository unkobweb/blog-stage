import React from 'react';
import ReactDOM from 'react-dom';
import '../css/experience.scss';

function Title({title, slug, mainColor}){
    return(
        <div id="title">
            <div id="image" style={{backgroundImage: "url('/img/"+slug+".png')"}}></div>
            <h1 style={{backgroundColor: mainColor}}>{title}</h1>
        </div>
    )
}

function Chapitres({mainColor, children}){
    console.log(mainColor)
    return (
        <div>
            <h2 style={{color: mainColor, textAlign: "center"}}>Chapitres</h2>
            <div id="chapters">
                {children}
            </div>
        </div>
    )
}

function Chapitre({slug, number, title, id, redirect}){
    
    return(
            <div className="chapter" onClick={redirect.bind(this,id)} style={{backgroundImage: "url('/img/hover.png'), url('/img/"+slug+".png')"}}>
                <h3>Chapitre {number} - {title}</h3>
            </div>
    )
}

class Experience extends React.Component{
    constructor(props){
        super(props);
        this.state = {experience: null};
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount(){
        let link = window.location.href.split("/");
        let id = link[link.length-1];
        fetch("http://localhost:8000/api/experience/"+id).then(data => data.json()).then(result => {
            console.log(result);
            this.setState({experience : result});
            document.title = result.company;
            console.log(this.state.experience)
        });
    }

    redirect(id){
        window.location.href = "/chapter/"+id;
    }

    render(){
        if (this.state.experience != null){
            let {id, company, slug, main_color, contract, job, period, second_color, chapters} = this.state.experience;
            console.log(chapters)
            let rows = chapters.map((chapter)=><Chapitre key={chapter.id} number={chapter.number} id={chapter.id} slug={chapter.slug} title={chapter.title} redirect={this.redirect}/>);
            return(
            <div>
                <Title title={company} slug={slug} mainColor={main_color}/>
                <Chapitres mainColor={this.state.experience.main_color}>{rows}</Chapitres>
            </div>
            )
        }
        return (
            <div></div>
        )
    }
}

ReactDOM.render(<Experience/>, document.querySelector("#app"));