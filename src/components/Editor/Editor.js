import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// prettier-ignore
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Replace this text with your own content.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  onContentStateChange = contentState => {
    console.log("contentState: ", contentState);
    this.props.contentStateChanged(contentState);
  };

  render() {
    return (
      <Editor
        initialContentState={
          this.props.initialContentState
            ? JSON.parse(this.props.initialContentState)
            : content
        }
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
    );
  }
}
export default EditorConvertToJSON;
