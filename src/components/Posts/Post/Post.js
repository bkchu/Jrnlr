import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./Post.css";

const Post = ({ id, userid, title, date, body, image }) => {
  let imageObj = JSON.parse(image);
  let bodyShort = body
    .split("")
    .slice(0, 150)
    .join("");
  return (
    <Link className="Link Post" to={`/users/${userid}/posts/${id}`}>
      <img className="Post__image" src={imageObj.imageUrl} alt="" />
      <div className="Post__well">
        <h1 className="Post__title">{title}</h1>
        <h3 className="Post__date">{moment.utc(date).fromNow()}</h3>
        <p className="Post__body">{bodyShort + "..."}</p>
      </div>
    </Link>
  );
};

export default Post;
