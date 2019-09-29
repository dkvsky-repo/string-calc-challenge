import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className='card text-white bg-danger mb-3'>
          <div className='card-header'>
            <span role='img' aria-label='blush-emoji'>
              🤭
            </span>{' '}
            ERROR{' '}
            <span role='img' aria-label='blush-emoji'>
              🤭
            </span>
          </div>
          <div className='card-body'>
            <h5 className='card-title'>
              Houston, we have a problem: *** PLEASE REFRESH!!! ***
            </h5>
            <p className='card-text'>
              {this.state.error && this.state.error.toString()}
              <pre>{this.state.errorInfo.componentStack}</pre>
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
