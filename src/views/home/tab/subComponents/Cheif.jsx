import React, { Component } from 'react'
import PropTypes from 'prop-types'
// css
import './Cheif.scss'
import { goToAPP } from '../../../../utils/common';

class Cheif extends Component {
  static propTypes = {
    cheifList: PropTypes.array
  }
  constructor(props) {
    super()
  }
  componentDidMount() {
    console.log(this.props)
  }
  dealWithTime(pushTime) {
    let time = pushTime
      if (new Date(time).getDate() === new Date().getDate() && new Date(time).getMonth() === new Date().getMonth() && new Date(time).getFullYear() ===
          new Date().getFullYear()
      ) {
        return time.slice(11, 16)
      } else {
        return time.slice(5, 10).replace('-', '月') + '日'
      }
  }
  render() {
    return (
      <div className='tab-list'>
        {
          this.props.cheifList.map((item, index) => {
            return (
              <div className="list-item bot-border" key={index}  onClick ={()=>goToAPP(item)}>
                <div className="title">
                  {item.Title}
                </div>
                <div className="content">
                  <div className="content-left">
                    <div className="origin">
                    {this.dealWithTime(item.CreatedDate)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Cheif