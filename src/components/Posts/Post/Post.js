import React from "react";
import moment from "moment";
import "./Post.css";

// key={post.id}
// title={post.title}
// date={post.date}
// body={post.body}
// image={post.imageObj}

const Post = ({ title, date, body, image }) => {
  let imageObj = JSON.parse(image);
  let bodyShort = body
    .split("")
    .slice(0, 150)
    .join("");

  return (
    <div className="Post">
      <img className="Post__image" src={imageObj.imageUrl} alt="" />
      <div className="Post__well">
        <h1 className="Post__title">{title}</h1>
        <h3 className="Post__date">{moment(date).fromNow()}</h3>
        <p className="Post__body">{bodyShort + "..."}</p>
      </div>
    </div>
  );
};

export default Post;
