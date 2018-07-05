import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Post.css';

class Post extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.id !== nextProps.id;
  }

  render() {
    const { id, userid, username, title, subtitle, date, image } = this.props;
    let imageObj = JSON.parse(image);
    return (
      <div className="Post">
        <Link className="Link" to={`/users/${userid}/posts/${id}`}>
          <img className="Post__image" src={imageObj.imageUrl} alt="" />
        </Link>
        <div className="Post__well">
          <div className="Post__post-info">
            <Link className="Link" to={`/users/${userid}`}>
              <p className="Post__username">{username}</p>
            </Link>
            <h3 className="Post__date">{moment.utc(date).fromNow()}</h3>
          </div>
          <Link className="Link" to={`/users/${userid}/posts/${id}`}>
            <h1 className="Post__title">{title}</h1>
            <p className="Post__subtitle">{subtitle}</p>
          </Link>
        </div>
      </div>
    );
  }
}
export default Post;
