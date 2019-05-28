import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id).then(rsp => {
                    this.setState({ loadedPost: rsp.data });
                }).catch(error => {
                    // console.log(error);
                    this.setState({error: true});
                });
            }
         }
    }

    deleteBlog = () => {
        axios.delete('/posts/' + this.props.id).then(rsp => {
            console.log('Deleted: ', rsp);
        });
    }

    render () {
        let post = this.props.id ? <p className="Message">Loading...</p> : <p className="Message">Please select a Post!</p>;

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1 className="Title">{this.state.loadedPost.title}</h1>
                    <p className="Body">{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deleteBlog}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;