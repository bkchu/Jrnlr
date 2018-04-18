import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer, style } from "react-toastify";

import "./Giphy.css";

style({
  TOP_RIGHT: {
    top: "calc(1em + 75px)",
    right: "1em"
  }
});

class Giphy extends Component {
  state = {
    query: "",
    images: [],
    page: 0
  };

  toastId = null;

  onSubmitHandler = e => {
    e.preventDefault();
    let { query } = this.state;
    if (query !== "" && !toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
      axios
        .get(
          `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${
            process.env.REACT_APP_GIPHY_KEY
          }&limit=10`
        )
        .then(res => {
          this.setState({ images: res.data.data });
        })
        .catch(err => {
          console.log("Error happened during fetching!", err);
        });
    }
  };

  onNextHandler = () => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast("Loading...");
    }
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${this.state.query}&api_key=${
          process.env.REACT_APP_GIPHY_KEY
        }&limit=10&offset=${this.state.page + 10}`
      )
      .then(res => {
        this.setState(prevState => {
          return {
            images: res.data.data,
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
        `http://api.giphy.com/v1/gifs/search?q=${this.state.query}&api_key=${
          process.env.REACT_APP_GIPHY_KEY
        }&limit=10&offset=${this.state.page - 10}`
      )
      .then(res => {
        this.setState(prevState => {
          return {
            images: res.data.data,
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
        `http://api.giphy.com/v1/gifs/random?api_key=${
          process.env.REACT_APP_GIPHY_KEY
        }`
      )
      .then(res => {
        this.props.setImage(res.data.data);
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
    let giphyContainer = <div className="Giphy__images">Loading...</div>;
    if (this.state.images.length > 0) {
      toast.update(this.toastId, {
        render: "Done.",
        type: toast.TYPE.INFO,
        autoClose: 500,
        closeButton: null
      });
      giphyContainer = (
        <div className="Giphy__images fade-in">
          <button
            className="Giphy__button Giphy__button--back"
            onClick={this.onPreviousHandler}
          >
            <i className="fas fa-angle-left" />
          </button>
          {this.state.images.map((image, index) => {
            return (
              <img
                onClick={() => this.onImageClickedHandler(index)}
                className="Giphy__mini-image"
                key={image.id}
                src={image.images.fixed_height_downsampled.url}
                alt=""
              />
            );
          })}
          <button
            className="Giphy__button Giphy__button--next"
            onClick={this.onNextHandler}
          >
            <i className="fas fa-angle-right" />
          </button>
        </div>
      );
    }

    return (
      <div className="Giphy">
        <div className="Giphy__search">
          <form className="Giphy__form" onSubmit={this.onSubmitHandler}>
            <input
              className="Giphy__input"
              placeholder="Search for gifs then press 'Enter'"
              onChange={this.onChangeHandler}
              type="text"
            />
          </form>
          <button className="Giphy__random" onClick={this.onRandomImageHandler}>
            Random Giphy
          </button>
        </div>
        {giphyContainer}
        <ToastContainer autoClose={false} />
      </div>
    );
  }
}

export default Giphy;
