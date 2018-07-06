import React, { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import FroalaEditor from 'react-froala-wysiwyg';

// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: this.props.initialContentState || ''
    };

    this.config = {
      placeholderText: 'Edit Your Content Here!',
      charCounterCount: false,
      iconsTemplate: 'font_awesome_5'
    };
  }

  // onContentStateChange = contentState => {
  //   this.props.contentStateChanged(contentState);
  // };

  handleModelChange = model => {
    this.setState(
      {
        model
      },
      () => this.props.contentStateChanged(model)
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div className="Editor">
        <FroalaEditor
          tag="textarea"
          config={this.config}
          model={this.state.model}
          onModelChange={this.handleModelChange}
        />

        {/* <Editor
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
                'Arial',
                'Georgia',
                'Impact',
                'Tahoma',
                'Times New Roman',
                'Verdana',
                'Roboto',
                'Lucida Sans'
              ],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            }
          }}
        /> */}
      </div>
    );
  }
}
export default EditorConvertToJSON;
