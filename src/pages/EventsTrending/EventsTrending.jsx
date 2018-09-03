import React, { Component } from 'react';
import BizchartsOtherCustomBar from './components/BizchartsOtherCustomBar';

export default class EventsTrending extends Component {
  static displayName = 'EventsTrending';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="events-trending-page">
        <BizchartsOtherCustomBar />
      </div>
    );
  }
}
