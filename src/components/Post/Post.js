import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1 className="Title">{props.title}</h1>
        <h2 className="Author">{props.author}</h2>
        <div className="Info">
            <div className="Body">{props.body}</div>
        </div>
    </article>
);

export default post;