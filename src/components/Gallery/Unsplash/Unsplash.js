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
    console.log(this.state);
    let images = <div>Loading...</div>;
    if (this.state.images) {
      images = this.state.images.map((image, index) => {
        return (
          <img
            onClick={() => this.onImageClickedHandler(index)}
            className="Unsplash__mini-image"
            key={image.id}
            src={image.urls.thumb}
            alt=""
          />
        );
      });
    }

    return (
      <div className="Unsplash">
        <form className="Unsplash__form" onSubmit={this.onSubmitHandler}>
          <input
            className="Unsplash__input"
            placeholder="Search Unsplash then press 'Enter'"
            onChange={this.onChangeHandler}
            type="text"
          />
        </form>
        <div className="Unsplash__images">{images}</div>
      </div>
    );
  }
}

export default Unsplash;
