var React = require('react');
var Radium = require('radium');

/**
 * ImageSelector component.
 * Component that allows a user to select images from the filesystem and renders
 * a live preview of the selected image.
 */
var ImageSelector = React.createClass({
  propTypes: {
    maxSize: React.PropTypes.number, // max size of image in bytes
    onImageSizeError: React.PropTypes.func,
    onImageSelected: React.PropTypes.func,
    image: React.PropTypes.string, // externally specify image preview
  },

  getDefaultProps() {
    return {
      maxSize: 500000,  // 500k by default (Hapi has max 1 MiB Content-Length)
      onImageSizeError: () => {}, // noop
      onImageSelected: () => {}, // noop
    };
  },

  getInitialState() { return {}; },

  componentWillMount() {
    this.reader = new FileReader();
  },

  /**
   * Event handler for the file selected event.
   * @param  {Object} event The event object.
   */
  onFileSelected(event) {
    var file = event.target.files[0];

    // Don't process the file if it exceeds maxSize; invoke error callback.
    if (file.size > this.props.maxSize) {
      this.props.onImageSizeError({
        file: file,
        sizeLimit: this.props.maxSize
      });
      return;
    }

    // After base64 encoding finishes, update the local state, fire callback.
    this.reader.onloadend = () => {
      var dataURL = this.reader.result;
      this.setState({ src: dataURL });
      this.props.onImageSelected({ dataURL: dataURL });
    };
    this.reader.readAsDataURL(file);
  },

  render() {
    // Externally provided image has higher precedence
    var src = ('image' in this.props) ? this.props.image : this.state.src;
    var preview = src ? <img style={style.img} src={src} />
                      : null;

    return (
      <div>
        <input type="file" accept="image/*" onChange={this.onFileSelected} />
        <div style={style.imgContainer}>
          {preview}
        </div>
      </div>
    );
  }
});

var style = {
  imgContainer: {
    margin: '1em 0'
  },
  img: {
    maxWidth: '100%',
    borderRadius: 4,
  }
};

module.exports = Radium(ImageSelector);
