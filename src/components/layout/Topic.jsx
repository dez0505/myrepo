import React, { Component } from 'react';
import './Topic.scss'
import Swiper from 'swiper'
import Title from './Title'
class Topic extends Component {
    constructor(props) {
      super(); //可以不给props
      this.state = {
        mySwiper: {},
        Toplist:[]
      }
    }
    componentDidMount() {
        let myswiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
        })
        this.setState({
            mySwiper: myswiper
        })
    }
    render() {
      return (
        <div className='Topic-box'>
          <Title title='话题广场'/>
          <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">slider1</div>
                <div className="swiper-slide">slider2</div>
                <div className="swiper-slide">slider3</div>
            </div>
          </div>
        </div>
      ) 
    }
  }
  export default Topic