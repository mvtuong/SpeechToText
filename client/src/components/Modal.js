import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends React.Component {
  render() {
    return (
      <section>
        <div className="modal">
          <div className="modal-main">
            <h3>{this.props.title}</h3>
            <p>{this.props.text}</p>
            <div className="btns-wrapper">
              <button type="button" className="link-button close-btn" onClick={this.props.onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Modal;
