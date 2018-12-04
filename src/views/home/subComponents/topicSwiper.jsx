import React, { Component } from 'react';
import './topicSwiper.scss'
import Swiper from 'swiper'
import Title from '../../../components/layout/Title'
class Topic extends Component {
    constructor(props) {
      super(); //可以不给props
      this.state = {
        topicSwiper: {}
        // Toplist:[]
      }
    }
    componentDidMount() {
        console.log('topicList:',this.props.topicList)
        let myswiper = new Swiper('.topic-container', {
            autoplay: true,//可选选项，自动滑动
        })
        this.setState({
            topicSwiper: myswiper
        })
    }
    render() {
      return (
        <div className='topic-box'>
          <Title title='话题广场'/>
          <div className='topic-wrap'>
            <div className="swiper-container topic-container">
                <div className="swiper-wrapper">
                    {this.props.topicList.map((item,index)=>{
                        return (
                            <div key={index} className="swiper-slide topic-slide">
                                <img src={item.ImageUrl} alt=""/>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      ) 
    }
  }
  export default Topic