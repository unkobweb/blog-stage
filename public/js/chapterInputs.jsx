import React from 'react';
import {markdown} from 'markdown';

function ChapterInputs({state, handleClick, handleChange, sendChapter}){
    console.log(state)
    let {experience, title, content, wantSee, image} = state;
    let right = (<div></div>);
        if (wantSee == "preview"){
            right = (
                <span id="right">
                        <span><h2>Prévisualisation</h2> <span>-</span> <span><b>Preview</b></span> <span onClick={handleClick.bind(this, "source")}>Source</span></span>
                        <div id="content" dangerouslySetInnerHTML={{__html: markdown.toHTML(content)}}></div>
                </span>
            )
            
        } else {
            right = (
                <span id="right">
                    <span><h2>Prévisualisation</h2> <span>-</span> <span onClick={handleClick.bind(this, "preview")}>Preview</span> <span><b>Source</b></span></span>
                    <div id="content">{markdown.toHTML(content)}</div>
                </span>
            )
        }
        return(
            <div>
                <div id="header">
                    <h1>AJOUTER UN CHAPITRE<br/>-<br/>{experience != null ? experience.company : "Loading"}</h1>
                </div>
                <div id="inputs">
                    <span id="left">
                        <div className="form-group">
                            <label htmlFor="title">Titre chapitre</label>
                            <input type="text" className="form-control" value={title} onChange={handleChange} name="title" id="title" placeholder="La fôret de brocéliande"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">URL image</label>
                            <input type="text" className="form-control" value={image} onChange={handleChange} name="image" id="image" placeholder="facultatif"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenu</label>
                            <textarea type="text" className="form-control" value={content} onChange={handleChange} name="content" id="content"></textarea>
                        </div>
                    </span>
                    {right}
                </div>
                <div id="sender"><button className="btn btn-danger" onClick={sendChapter}>Appliquer les changements</button></div>
            </div>
        )
}

module.exports = ChapterInputs;