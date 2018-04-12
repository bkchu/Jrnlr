import React from "react";
import { Link } from "react-router-dom";
import "./FabButton.css";

const FabButton = () => {
  return (
    <div className="fab">
      <span className="fab-action-button">
        <i className="fab-action-button__icon" />
      </span>
      <ul className="fab-buttons">
        <li className="fab-buttons__item">
          <div className="Link fab-buttons__link">
            <i className="icon-material icon-material_fb" />
          </div>
        </li>
        <li className="fab-buttons__item">
          <div className="Link fab-buttons__link">
            <i className="icon-material icon-material_tw" />
          </div>
        </li>
        <li className="fab-buttons__item">
          <div className="Link fab-buttons__link">
            <i className="icon-material icon-material_li" />
          </div>
        </li>
        <li className="fab-buttons__item">
          <div className="Link fab-buttons__link">
            <i className="icon-material icon-material_gp" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FabButton;
