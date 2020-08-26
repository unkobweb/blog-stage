import React from "react";
import ReactDOM from "react-dom";
import "../css/admin.scss";

function AddChapter({ id }) {
  return (
    <a className="addchapter" href={"/addChapter/" + id}>
      <p>Ajouter un chapitre</p>
    </a>
  );
}

function Chapitre({
  id,
  number,
  title,
  moveChapter,
  deleteChapter,
  experience,
}) {
  return (
    <div className="chapter">
      <span id="left">
        <span id="arrows">
          <div>
            <i
              onClick={moveChapter.bind(this, number, "up", experience.id)}
              className="fas fa-chevron-up"
            ></i>
          </div>
          <div>
            <i
              onClick={moveChapter.bind(this, number, "down", experience.id)}
              className="fas fa-chevron-down"
            ></i>
          </div>
        </span>
        <span id="content">
          Chapitre {number} - {title}
        </span>
      </span>
      <span id="right">
        <a href={"/modifyChapter/" + id}>Modifier</a>
        <a onClick={deleteChapter.bind(this, id)}>Supprimer</a>
      </span>
    </div>
  );
}

function Experience({ experience, moveChapter, deleteChapter }) {
  let rows = [];
  let maxId = 0;
  experience.chapters.forEach((chapter) => {
    rows.push(
      <Chapitre
        key={chapter.id}
        id={chapter.id}
        number={chapter.number}
        title={chapter.title}
        moveChapter={moveChapter}
        deleteChapter={deleteChapter}
        experience={experience}
      />
    );
    maxId = chapter.id > maxId ? chapter.id : maxId;
  });
  rows.push(<AddChapter key={maxId + 1} id={experience.id} />);
  return (
    <div className="experience">
      <h2>{experience.company}</h2>
      <div className="chapters">{rows}</div>
    </div>
  );
}

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { experiences: null };
    this.moveChapter = this.moveChapter.bind(this);
    this.deleteChapter = this.deleteChapter.bind(this);
  }

  componentDidMount() {
    fetch("/api/getAdmin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ experiences: data });
      });
  }

  moveChapter(id, way, expId) {
    console.log(id + " of " + expId + " exp want to go " + way);
    fetch("/moveChapter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        experienceId: expId,
        chapterId: id,
        way: way,
      }),
    }).then(() => {
      this.componentDidMount();
    });
  }

  deleteChapter(id) {
    if (
      window.confirm("Voulez vous vraiment supprimer la chapitre d'id " + id)
    ) {
      fetch("/deleteChapter/" + id, {
        method: "DELETE",
      }).then(() => {
        this.componentDidMount();
      });
    }
  }

  render() {
    if (this.state.experiences == null) {
      return <div></div>;
    }
    let rows = [];
    this.state.experiences.forEach((experience) => {
      rows.push(
        <Experience
          key={experience.id}
          experience={experience}
          moveChapter={this.moveChapter}
          deleteChapter={this.deleteChapter}
        />
      );
    });
    return (
      <div>
        <h1>ADMIN PANEL</h1>
        <div id="experiences">{rows}</div>
      </div>
    );
  }
}

ReactDOM.render(<Admin />, document.querySelector("#app"));
