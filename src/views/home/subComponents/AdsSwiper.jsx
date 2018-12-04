import React, { Component } from 'react';
// Swiper
import './AdsSwiper.scss'
import Swiper from 'swiper'
// api

class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null
    }
  }
  componentDidMount() {
    const mySwiper = new Swiper('.ads-swiper', {
      autoplay: true,//可选选项，自动滑动
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentDidUpdate() {
    if(this.state.mySwiper){
      this.state.mySwiper.update()
    }
  }
  render() {
    // console.log(1111,this.props)
    const adsList = this.props.adsList
    return (
      <div>
        <div className="ads-box">
          <div className="swiper-container ads-swiper">
            <div className="swiper-wrapper">
              {adsList.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index} style={{backgroundImage:'url('+item.ImageUrl+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',backgroundPosition:'center'}}></div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    ) 
  }
}
export default AdsSwiper