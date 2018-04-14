import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";

class EditorConvertToJSON extends Component {
  onContentStateChange = contentState => {
    this.props.contentStateChanged(contentState);
  };

  render() {
    return (
      <div className="Editor">
        <Editor
          initialContentState={
            this.props.initialContentState &&
            JSON.parse(this.props.initialContentState)
          }
          placeholder="What's on your mind?"
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onContentStateChange={this.onContentStateChange}
          toolbar={{
            fontFamily: {
              options: [
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
                "Roboto",
                "Lucida Sans"
              ],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            }
          }}
        />
      </div>
    );
  }
}
export default EditorConvertToJSON;
