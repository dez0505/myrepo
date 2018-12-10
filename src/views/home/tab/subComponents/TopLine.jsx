import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item } from 'antd-mobile/lib/tab-bar';

export default class TabContent extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <div className='tab-list bottom-border'>
        <div className="list-item">
          <div className="title">
            {item.Title}
          </div>
          <div className="content">
            <div className="content-left">
              <div className="label">
                {item.Category}
              </div>
              <div className="orign">
                <span className="media">
                  {item.MediaName}
                </span>
              </div>
            </div>
            <div className={{'key-word':true,'up':parseFloat(item.stockNum)>=0,'down':parseFloat(item.stockNum)<0}}>
              <span class="up-icon"></span>
              <span>{item.Stocks[0].Name}</span>
              <span v-show='item.stocksNum' class="rate">{item.stocksNum}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
