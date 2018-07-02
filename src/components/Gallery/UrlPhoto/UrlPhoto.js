import React, { Component } from 'react';
import './UrlPhoto.css';

class UrlPhoto extends Component {
  state = {
    url: ''
  };
  onChangeHandler = e => {
    let url = e.target.value;
    if (/^http:/.test(e.target.value)) {
      let urlArr = url.split('');
      urlArr.splice(0, 4, 'https');
      url = urlArr.join('');
    }
    this.setState({ url });
    this.props.setImage(url);
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
