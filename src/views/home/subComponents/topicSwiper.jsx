import React, { Component } from 'react';
import './topicSwiper.scss';
import Swiper from 'swiper';
import Title from '../../../components/layout/Title';
class Topic extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      topicSwiper: null
      // Toplist:[]
    };
  }
  componentDidMount() {
    const that = this
    const topicSwiper = new Swiper('.topic-container', {
      loop: true,
      autoplay: 5000,
      pagination: '.swiper-pagination',
      onclick: function(swiper) {
        const realIndex = swiper.realIndex;
        that.goToAds(this.props.topicList[realIndex], 'ads');
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
    );
  }
}
export default Topic;
