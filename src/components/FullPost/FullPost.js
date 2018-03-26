import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import moment from "moment";

import "./FullPost.css";
import { getPost } from "../../redux/ducks/postReducer";
import Error from "../Error/Error";
class FullPost extends Component {
  componentDidMount() {
    console.log(this.props.match.params.postid);
    this.props.getPost(this.props.match.params.postid);
  }

  render() {
    let { userid, postid } = this.props.match.params;
    let { selectedPost, error } = this.props;
    let displayPost = <p>Loading...</p>;

    if (selectedPost && !error) {
      let { title, date, body, imageobj } = selectedPost[0];
      let image = JSON.parse(imageobj);
      displayPost = (
        <div className="FullPost">
          <h1 className="FullPost__title">{title}</h1>
          <p className="FullPost__date">
            {moment(date).format("MMM DD, YYYY")}
          </p>
          <img className="FullPost__image" src={image.imageUrl} alt="" />
          <p className="FullPost__body">{body}</p>
        </div>
      );
      console.log(selectedPost);
    } else if (error) {
      displayPost = <Error error={error} />;
    }

    return (
      <div>
        <Header />
        <div className="container">{displayPost}</div>
      </div>
    );
  }
}

export default connect(state => ({ ...state.postReducer }), { getPost })(
  FullPost
);
