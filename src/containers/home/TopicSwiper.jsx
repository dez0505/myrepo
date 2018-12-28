import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './TopicSwiper.scss';
import Swiper from 'swiper';
// utils
import { goToAPP } from '../../utils/common'

class TopicSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      topicSwiper: null
    };
  }
  componentDidMount() {
    this.initTopicSwiper()
  }
  initTopicSwiper() {
    const adsSwiper = new Swiper('.topic-swiper', {
      loop: true,
      autoplay:5000,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction: false,
      onClick: (swiper) => {
        const realIndex = swiper.realIndex
        goToAPP(this.props.adsList[realIndex], 'ads')
      }
    })
    if(adsSwiper.slides.length <= 3) {
      adsSwiper.lockSwipes()
    } else {
      adsSwiper.unlockSwipes()
    }
    this.adsSwiper = adsSwiper
  }
  componentWillReceiveProps(props) {
    if(this.adsSwiper && this.props.topicList !== props.topicList){
      setTimeout(()=>{
        this.adsSwiper.destroy(false, false); 
        this.initAdsSwiper()
      },200)
    }
  }
  swiperOnClick(){
    goToAPP(this.props.topicList[this.adsSwiper.realIndex], 'ads')
  }
  render() {
    return (
      <div>
        <div className='split-line'></div> 
        <div className='topic-box'>
          <div className='swiper-container topic-swiper' onClick={()=>{this.swiperOnClick()}}>
            <div className='swiper-wrapper'>
              {this.props.topicList.map((item, index) => {
                return (
                  <div className="swiper-slide" key={index} style={{backgroundImage:'url('+item.ImageUrl+')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',backgroundPosition:'center'}}></div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div> 
      </div>
    );
  }
}
TopicSwiper.propTypes = {
  topicList: PropTypes.array
}
export default TopicSwiper;
