import React, { Component } from 'react';
// Swiper
import './AdsSwiper.scss'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

// api

class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      mySwiper: null
    }
  }
  componentDidMount() {
   setTimeout(()=>{
    console.log('adsSwiper', this.props)
   },1000) 
    this.setState({ mySwiper: new Swiper('.ads-swiper', {
      autoplay: true,//可选选项，自动滑动
      loop: true,
    }) })
  }
  render() {
    return (
      <div className="ads-box">
        <div className="swiper-container ads-swiper">
          <div className="swiper-wrapper">
            {this.props.adsList.map((item, index) => {
              return (
                <div className="swiper-slide" key={index} style={{backgroundImage:'url('+item.ImageUrl+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',backgroundPosition:'center'}}></div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    ) 
  }
}
export default AdsSwiper