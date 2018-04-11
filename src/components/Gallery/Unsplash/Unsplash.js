import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "./Unsplash.css";

class Unsplash extends Component {
  state = {
    query: "",
    images: [],
    page: 1
  };

  toastId = null;

  onSubmitHandler = e => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
    }
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

  onNextHandler = () => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
    }
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          this.state.query
        }&page=${this.state.page + 1}&client_id=${
          process.env.REACT_APP_CLIENT_ID
        }`
      )
      .then(res => {
        this.setState(prevState => {
          return {
            images: res.data.results,
            page: prevState.page + 1
          };
        });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };
  onPreviousHandler = () => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
    }
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          this.state.query
        }&page=${this.state.page - 1}&client_id=${
          process.env.REACT_APP_CLIENT_ID
        }`
      )
      .then(res => {
        this.setState(prevState => {
          return {
            images: res.data.results,
            page: prevState.page - 1
          };
        });
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

  onRandomImageHandler = () => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
    }
    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=${
          process.env.REACT_APP_CLIENT_ID
        }`
      )
      .then(res => {
        this.props.setImage(res.data);
        toast.update(this.toastId, {
          render: "Done.",
          type: toast.TYPE.INFO,
          autoClose: 500,
          closeButton: null
        });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  };

  render() {
    let unsplashContainer = <div className="Unsplash__images">Loading...</div>;
    if (this.state.images.length > 0) {
      toast.update(this.toastId, {
        render: "Done.",
        type: toast.TYPE.INFO,
        autoClose: 500,
        closeButton: null
      });
      unsplashContainer = (
        <div className="Unsplash__images fade-in">
          <button
            className="Unsplash__button Unsplash__button--back"
            onClick={this.onPreviousHandler}
          >
            <i className="fas fa-angle-left" />
          </button>
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
          <button
            className="Unsplash__button Unsplash__button--next"
            onClick={this.onNextHandler}
          >
            <i className="fas fa-angle-right" />
          </button>
        </div>
      );
    }

    return (
      <div className="Unsplash">
        <div className="Unsplash__search">
          <form className="Unsplash__form" onSubmit={this.onSubmitHandler}>
            <input
              className="Unsplash__input"
              placeholder="Search for photos then press 'Enter'"
              onChange={this.onChangeHandler}
              type="text"
            />
          </form>{" "}
          - or -{" "}
          <button
            className="Unsplash__random"
            onClick={this.onRandomImageHandler}
          >
            Random
          </button>
        </div>
        {unsplashContainer}
        <ToastContainer autoClose={false} />
      </div>
    );
  }
}

export default Unsplash;
