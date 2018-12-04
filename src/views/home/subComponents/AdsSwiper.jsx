import React, { Component } from 'react';
// Swiper
import './AdsSwiper.scss'
import Swiper from 'swiper'
// api

class AdsSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.mySwiper = null
    this.state = {
      mySwiper: null
    }
  }
  componentDidMount() {
    let mySwiper = new Swiper('.ads-swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    })
    this.setState({ mySwiper: mySwiper })
  }
  componentDidUpdate() {
    if(this.state.mySwiper){
      this.state.mySwiper.update()
    }
  }
  render() {
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