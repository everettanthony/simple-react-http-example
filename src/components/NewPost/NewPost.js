import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './NewPost.css';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    savePost = () => {
        const data = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body
        };

        axios.post(postsUrl, data).then( rsp => {
            console.log( rsp.data );
        }).catch(error => {
            // console.log(error);
            this.setState({error: true});
        });
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                    <option value="Tony">Tony</option>
                </select>
                <button onClick={this.savePost}>Save</button>
            </div>
        );
    }
}

export default NewPost;