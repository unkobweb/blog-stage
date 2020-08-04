import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.scss';

function Separator(){
    return(
        <div id="separator"></div>
    )
}

function Experience({experience}){
    let {id, slug, main_color, period, company, job} = experience

    function handleClick(e){
        window.location.href = "/experience/"+id
    }

    return(
        <div className="experience" data-id={id} style={{backgroundImage: "url('/img/"+slug+".png')"}} onClick={handleClick}>
            <h3 className="period">{period}</h3>
            <h3 className="name">{company}</h3>
            <h4 className="job">{job}</h4>
            <div className="color-overlay"></div>
        </div>
    )
}

class Experiences extends React.Component{

    constructor(props){
        super(props);
        this.state = {experiences: null};
    }

    componentDidMount(){
        fetch("http://localhost:8000/api/allExperiences").then(data => data.json()).then(result => {
            this.setState({experiences : result});
        });
    }

    render(){
        const rows = [];
        if (this.state.experiences != null){
            this.state.experiences.forEach(experience => {
                rows.push(<Experience key={experience.id} experience={experience}/>);
            });
            return (
                <div>
                    <div id="experiences">{rows}</div>
                    <Separator/>
                </div>
            )
        }
        return <div></div>
    }

}

ReactDOM.render(<Experiences/>,document.querySelector("#app"));