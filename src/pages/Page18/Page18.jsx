import React, { Component } from 'react';
import CompositeFilter from './components/CompositeFilter';
import UserTrafficStastistics from './components/UserTrafficStastistics';

export default class Page18 extends Component {
  static displayName = 'Page18';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page18-page">
        <CompositeFilter />
        <UserTrafficStastistics />
      </div>
    );
  }
}
