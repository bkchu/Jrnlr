import React, { Component } from "react";
import axios from "axios";

import "./Unsplash.css";

class Unsplash extends Component {
  state = {
    query: "",
    images: []
  };

  onSubmitHandler = e => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          this.state.query
        }&client_id=${process.env.REACT_APP_CLIENT_ID}`
      )
      .then(res => {
        this.setState({ images: res.data.results });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };

  onImageClickedHandler(index) {
    this.props.setImage(this.state.images[index]);
  }

  onChangeHandler = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    let unsplashContainer = <div className="Unsplash__images">Loading...</div>;
    if (this.state.images) {
      unsplashContainer = (
        <div className="Unsplash__images fade-in">
          {this.state.images.map((image, index) => {
            return (
              <img
                onClick={() => this.onImageClickedHandler(index)}
                className="Unsplash__mini-image"
                key={image.id}
                src={image.urls.thumb}
                alt=""
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="Unsplash">
        <form className="Unsplash__form" onSubmit={this.onSubmitHandler}>
          <input
            className="Unsplash__input"
            placeholder="Search for photos then press 'Enter'"
            onChange={this.onChangeHandler}
            type="text"
          />
          {unsplashContainer}
        </form>
      </div>
    );
  }
}

export default Unsplash;
