import React, { Component } from 'react';
import './MarketMachine.scss'
import Title from '../../../components/layout/Title'
class Topic extends Component {
    constructor(props) {
      super(); //可以不给props
      this.state = {
        changceList :[
            {title: ''}
        ]
      }
    }
    componentDidMount() {
        
    }
    render() {
      return (
        <div className='market-box'>
          <Title title='市场机会'/>
          <div className="market-wrap top-border">
            <div className="market-list">
              <div className="market-item bot-border">
                <div className="market-title">今日投资日历</div>
                <div className='market-desc'>新股</div>
              </div>
              <div className="market-item bot-border">
                <div className="market-title">今日投资日历</div>
                <div className='market-desc'>新股</div>
              </div>
              <div className="market-item bot-border">
                <div className="market-title">今日投资日历</div>
                <div className='market-desc'>新股</div>
              </div>
              <div className="market-item bot-border">
                <div className="market-title">今日投资日历</div>
                <div className='market-desc'>新股</div>
              </div>
            </div>
          </div>
        </div>
      ) 
    }
  }
  export default Topic