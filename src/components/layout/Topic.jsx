import React, { Component } from 'react';
import './Topic.scss'
import Swiper from 'swiper'
import Title from './Title'
class Topic extends Component {
    constructor(props) {
      super(); //可以不给props
      this.state = {
        topicSwiper: {}
        // Toplist:[]
      }
    }
    componentDidMount() {
        let myswiper = new Swiper('.topic-container', {
            autoplay: true,//可选选项，自动滑动
        })
        this.setState({
            topicSwiper: myswiper
        })
    }
    render() {
      return (
        <div className='Topic-box'>
          <Title title='话题广场'/>
          <div className="swiper-container topic-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide topic-slide">slider1</div>
                <div className="swiper-slide topic-slide">slider2</div>
                <div className="swiper-slide topic-slide">slider3</div>
            </div>
          </div>
        </div>
      ) 
    }
  }
  export default Topic