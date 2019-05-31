import React, { Component } from 'react';
import styles from './FullPost.module.scss';
// import axios from 'axios';
import axios from '../../axios';

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
        let post = this.props.id ? <p className={styles.Message}>Loading...</p> : <p className={styles.Message}>Please select a Post!</p>;

        if (this.state.loadedPost) {
            post = (
                <div className={styles.FullPost}>
                    <h1 className={styles.Title}>{this.state.loadedPost.title}</h1>
                    <p className={styles.Body}>{this.state.loadedPost.body}</p>
                    <div className={styles.Edit}>
                        <button className={[styles.Button, styles.Delete].join(' ')} onClick={this.deleteBlog}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;