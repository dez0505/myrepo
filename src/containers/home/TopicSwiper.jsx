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
     
    };
    this.topicSwiper = null
  }
  componentDidMount() {
    this.initTopicSwiper()
  }
  initTopicSwiper() {
    const topicSwiper = new Swiper('.topic-swiper', {
      loop: true,
      autoplay:5000,
      threshold : 50,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction: false
    })
    if(topicSwiper.slides.length <= 3) {
      topicSwiper.lockSwipes()
    } else {
      topicSwiper.unlockSwipes()
    }
    this.topicSwiper = topicSwiper
  }
  componentWillReceiveProps(props) {
    if(this.topicSwiper && (this.props.topicList !== props.topicList)){
      setTimeout(()=>{
        this.topicSwiper.destroy(false, false); 
        this.initTopicSwiper()
      },200)
    }
    if(this.adsSwiper && (props.callBackHome !== this.props.callBackHome)){
      setTimeout(()=>{
        this.adsSwiper.update({ updateTranslate:false })
        this.adsSwiper.startAutoplay()
      },100)
    }
  }
  swiperOnClick(){
    goToAPP(this.props.topicList[this.topicSwiper.realIndex], 'ads')
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
