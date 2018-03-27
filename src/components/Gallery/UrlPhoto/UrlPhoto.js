import React, { Component } from "react";
import "./UrlPhoto.css";

class UrlPhoto extends Component {
  state = {
    url: ""
  };
  onChangeHandler = e => {
    this.setState({ url: e.target.value });
    this.props.setImage(e.target.value);
  };

  render() {
    return (
      <div className="UrlPhoto">
        <input
          className="UrlPhoto__input"
          value={this.state.url}
          onChange={this.onChangeHandler}
          placeholder="Paste a photo's URL here."
          type="text"
        />
      </div>
    );
  }
}

export default UrlPhoto;
