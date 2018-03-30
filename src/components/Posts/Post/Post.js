import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./Post.css";

const Post = ({ id, userid, username, title, date, body, image }) => {
  let imageObj = JSON.parse(image);
  let bodyShort = body
    .split("")
    .slice(0, 150)
    .join("");
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
          <p className="Post__body">{bodyShort + "..."}</p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
