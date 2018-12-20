import React, { Component } from 'react';
import TabContent from './TabContent'
import TabHeader from './TabHeader'

class TabBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id='listContent'>
        <TabHeader type='home' watch={true}></TabHeader>
        <TabContent></TabContent>
      </div>
    )
  }
}

export default TabBox;