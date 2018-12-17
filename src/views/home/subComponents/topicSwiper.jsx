import React, { Component } from 'react';
import './topicSwiper.scss';
import Swiper from 'swiper';
// utils
import { goToAPP } from '@/utils/common'

class TopicSwiper extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      topicSwiper: null
    };
  }
  componentDidMount() {
    const topicSwiper = new Swiper('.topic-container', {
      loop: true,
      autoplay: 5000,
      pagination: '.swiper-pagination',
      onClick: (swiper) => {
        const realIndex = swiper.realIndex;
        goToAPP(this.props.topicList[realIndex], 'ads');
      }
    });
    if (topicSwiper.slides.length <= 3) {
      topicSwiper.lockSwipes();
    }
    this.setState({
      topicSwiper
    })
  }
  componentDidUpdate() {
    if(this.state.topicSwiper){
      this.state.topicSwiper.update()
    }
  }
  render() {
    return (
      <div>
        <div className='split-line'></div> 
        <div className='topic-box'>
          <div className='swiper-container topic-container'>
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
export default TopicSwiper;
