import React, { Component } from 'react';
import styles from './Blog.module.scss';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
        postFormOpen: false
    };

    componentDidMount() {
        axios.get('/posts/').then(rsp => {
            const posts = rsp.data.slice(0, 12);

            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Tony Bradshaw'
                }
            });

            this.setState({ posts: updatedPosts });
        }).catch(error => {
            // console.log(error);
            this.setState({error: true});
        });
    }

    getBlockDetails = (id) => {
        this.setState({ selectedPostId: id });
    }

    postFormClose = () => {
        this.setState({ postFormOpen: false });
    }

    postFormToggle = (evt) => {
        evt.preventDefault();

        this.setState( ( prevState ) => {
            return { postFormOpen: !prevState.postFormOpen };
        } );
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    body={post.body} 
                    clicked={() => this.getBlockDetails(post.id)} />;
            });
        }

        return (
            <div className={styles.Blog}>
                <header className={styles.Header}>
                    <nav className={styles.Nav}>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/" onClick={this.postFormToggle}>New Blog</a></li>
                        </ul>
                    </nav>
                </header>
                <div className={styles.Main}>
                    <div className={styles.Column}>
                        <section className={styles.Posts}>
                            {posts}
                        </section>
                    </div>
                    <div className={styles.Column}>
                        <section>
                            <FullPost id={this.state.selectedPostId} />
                        </section>
                    </div>
                </div>
                <section>
                    <NewPost open={this.state.postFormOpen} 
                        closed={this.postFormClose} />
                </section>
            </div>
        );
    }
}

export default Blog;