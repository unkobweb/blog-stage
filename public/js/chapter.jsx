import React from "react";
import ReactDOM from "react-dom";
import { markdown } from "markdown";
import "../css/chapter.scss";

function Header({ left, right, title }) {
  console.log(left);
  let leftContent = left ? (
    <a href={"/chapter/" + left.id}>{"< " + left.title}</a>
  ) : (
    <a disabled>Pas de chapitre précédent</a>
  );
  console.log(right);
  let rightContent = right ? (
    <a href={"/chapter/" + right.id}>{right.title + " >"}</a>
  ) : (
    <a disabled>Pas de chapitre suivant</a>
  );
  console.log(title);
  return (
    <div id="header">
      <div id="left">{leftContent}</div>
      <div id="title">{title}</div>
      <div id="right">{rightContent}</div>
    </div>
  );
}

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chapter: null };
    let temp = window.location.href.split("/");
    this.id = parseInt(temp[temp.length - 1]);
  }

  componentDidMount() {
    fetch("/api/chapter/" + this.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ chapter: data });
        window.title = data.title;
      });
  }

  render() {
    if (this.state.chapter != null) {
      return (
        <div>
          <Header
            left={this.state.chapter.prev}
            right={this.state.chapter.next}
            title={this.state.chapter.title}
          />
          <div
            id="content"
            dangerouslySetInnerHTML={{
              __html: markdown.toHTML(this.state.chapter.content),
            }}
          ></div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

ReactDOM.render(<Chapter />, document.querySelector("#app"));
