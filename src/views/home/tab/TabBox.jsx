import React, { Component } from 'react';
import TabContent from './TabContent'
import TabHeaderCase from '../../../containers/TabHeaderCase'

class TabBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <TabHeaderCase type='home'></TabHeaderCase>
        <TabContent></TabContent>
      </div>
    )
  }
}

export default TabBox;