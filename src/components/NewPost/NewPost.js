import React, { Component } from 'react';
import styles from './NewPost.module.scss';
// import axios from 'axios';
import axios from '../../axios';
import Overlay from '../UI/Overlay/Overlay';

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

    render (props) {
        let classes = [styles.NewPost, styles.Close];

        if (this.props.open) {
            classes = [styles.NewPost, styles.Open];
        }

        return (
            <div>
                <div className={classes.join(' ')}>
                    <i className={['material-icons', styles.iconClose].join(' ')} onClick={this.props.closed}>clear</i>
                    <div className={styles.NewPostTitle}>New Blog</div>
                    <div className={styles.PostFormRow}>
                        <label>Title</label>
                        <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    </div>

                    <div className={styles.PostFormRow}>
                        <label>Author</label>
                        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                            <option value="Max">Max</option>
                            <option value="Manu">Manu</option>
                            <option value="Tony">Tony</option>
                        </select>
                    </div>

                    <div className={styles.PostFormRow}>
                        <label>Content</label>
                        <textarea rows="9" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                    </div>

                    <div className={styles.PostFormRow}>
                        <button onClick={this.savePost}>Post Blog</button>
                    </div>
                </div>
                <Overlay show={this.props.open} clicked={this.props.closed} />
            </div>
        );
    }
}

export default NewPost;