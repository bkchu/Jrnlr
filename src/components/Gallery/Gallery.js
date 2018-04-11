import React, { Component } from "react";
import Unsplash from "./Unsplash/Unsplash";
import UrlPhoto from "./UrlPhoto/UrlPhoto";
import Giphy from "./Giphy/Giphy";
import "./Gallery.css";

const UNSPLASH = 1;
const OWN = 2;
const GIPHY = 3;

class Gallery extends Component {
  state = {
    mode: UNSPLASH,
    unsplashImage: null,
    urlImage: null,
    giphyImage: null
  };

  unsplashPressedHandler = () => {
    this.setState({ mode: UNSPLASH });
  };

  ownPressedHandler = () => {
    this.setState({ mode: OWN });
  };

  giphyPressedHandler = () => {
    this.setState({ mode: GIPHY });
  };

  imageSelected = image => {
    let { mode } = this.state;
    switch (mode) {
      case UNSPLASH:
        this.setState({ unsplashImage: image });
        break;
      case OWN:
        this.setState({ urlImage: image });
        break;
      case GIPHY:
        this.setState({ giphyImage: image });
        break;
      default:
    }

    this.props.selected(image, mode);
  };

  render() {
    let chooser = <p>Please choose a mode.</p>;
    let classesOwnPhoto = ["Gallery__button", "Gallery__button--ownphoto"];
    let classesUnsplash = ["Gallery__button", "Gallery__button--unsplash"];
    let classesGiphy = ["Gallery__button", "Gallery__button--giphy"];
    switch (this.state.mode) {
      case UNSPLASH:
        chooser = <Unsplash setImage={this.imageSelected} />;
        classesUnsplash.push("Gallery__selected-mode");
        break;
      case OWN:
        chooser = <UrlPhoto setImage={this.imageSelected} />;
        classesOwnPhoto.push("Gallery__selected-mode");
        break;
      case GIPHY:
        chooser = <Giphy setImage={this.imageSelected} />;
        classesGiphy.push("Gallery__selected-mode");
        break;
      default:
    }
    let displayedImage = null;

    if (this.state.urlImage && this.state.mode === OWN) {
      displayedImage = (
        <img className="Gallery__display" src={this.state.urlImage} alt="" />
      );
    } else if (this.state.unsplashImage && this.state.mode === UNSPLASH) {
      displayedImage = (
        <img
          className="Gallery__display"
          src={this.state.unsplashImage.urls.regular}
          alt={this.state.unsplashImage.description}
        />
      );
    } else if (this.state.giphyImage && this.state.mode === GIPHY) {
      displayedImage = (
        <img
          className="Gallery__display"
          src={this.state.giphyImage.images.original.url}
          alt=""
        />
      );
    } else if (this.props.editing) {
      let urlSrc = JSON.parse(this.props.editing);
      displayedImage = (
        <img className="Gallery__display" src={urlSrc.imageUrl} alt="" />
      );
    }

    return (
      <div className="Gallery">
        <button
          className={classesOwnPhoto.join(" ")}
          onClick={this.ownPressedHandler}
        >
          Upload
        </button>
        <button
          className={classesUnsplash.join(" ")}
          onClick={this.unsplashPressedHandler}
        >
          Photo
        </button>
        <button
          className={classesGiphy.join(" ")}
          onClick={this.giphyPressedHandler}
        >
          Giphy
        </button>
        {chooser}
        {displayedImage}
      </div>
    );
  }
}

export default Gallery;
