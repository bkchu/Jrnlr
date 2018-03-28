import React, { Component } from "react";
import Unsplash from "./Unsplash/Unsplash";
import UrlPhoto from "./UrlPhoto/UrlPhoto";
import "./Gallery.css";

const UNSPLASH = 1;
const OWN = 2;

class Gallery extends Component {
  state = {
    mode: UNSPLASH,
    unsplashImage: null,
    urlImage: null
  };

  unsplashPressedHandler = () => {
    this.setState({ mode: UNSPLASH });
  };

  ownPressedHandler = () => {
    this.setState({ mode: OWN });
  };

  imageSelected = image => {
    let { mode } = this.state;
    if (mode === UNSPLASH) {
      this.setState({ unsplashImage: image });
    } else if (mode === OWN) {
      this.setState({ urlImage: image });
    }
    this.props.selected(image);
  };

  render() {
    let chooser = <p>Please choose a mode.</p>;
    let classesOwnPhoto = ["Gallery__button", "Gallery__button--ownphoto"];
    let classesUnsplash = ["Gallery__button", "Gallery__button--unsplash"];
    switch (this.state.mode) {
      case UNSPLASH:
        chooser = <Unsplash setImage={this.imageSelected} />;
        classesUnsplash.push("Gallery__selected-mode");
        break;
      case OWN:
        chooser = <UrlPhoto setImage={this.imageSelected} />;
        classesOwnPhoto.push("Gallery__selected-mode");
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
    } else if (this.props.editing) {
      let urlSrc = JSON.parse(this.props.editing);
      console.log(this.props.editing);
      displayedImage = (
        <img className="Gallery__display" src={urlSrc.imageUrl} alt={""} />
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
          Unsplash
        </button>
        {chooser}
        {displayedImage}
      </div>
    );
  }
}

export default Gallery;
