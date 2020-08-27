import React from "react";
import ReactDOM from "react-dom";
import "../css/index.scss";

function Header() {
  return (
    <div id="header">
      <h1>Alexandre Sieg</h1>
    </div>
  );
}

function Buttons() {
  return (
    <div id="buttons">
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/documents/CV_Alexandre_SIEG.pdf"
        >
          CV Developpeur
        </a>
      </div>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/documents/CV_Sieg_Alexandre.pdf"
        >
          CV Système / Réseau
        </a>
      </div>
    </div>
  );
}

function Experience({ experience }) {
  let { id, slug, main_color, period, company, job } = experience;

  function handleClick(e) {
    window.location.href = "/experience/" + id;
  }

  return (
    <div
      className="experience"
      data-id={id}
      style={{ backgroundImage: "url('/img/" + slug + ".png')" }}
      onClick={handleClick}
    >
      <h3 className="period">{period}</h3>
      <h3 className="name">{company}</h3>
      <h4 className="job">{job}</h4>
      <div className="color-overlay"></div>
    </div>
  );
}

class Experiences extends React.Component {
  constructor(props) {
    super(props);
    this.state = { experiences: null };
  }

  componentDidMount() {
    fetch("/api/allExperiences")
      .then((data) => data.json())
      .then((result) => {
        this.setState({ experiences: result });
      });
  }

  render() {
    const rows = [];
    if (this.state.experiences != null) {
      this.state.experiences.forEach((experience) => {
        rows.push(<Experience key={experience.id} experience={experience} />);
      });
      return (
        <div>
          <Header />
          <div id="experiences">{rows}</div>
          <Buttons />
        </div>
      );
    }
    return <div></div>;
  }
}

ReactDOM.render(<Experiences />, document.querySelector("#app"));
