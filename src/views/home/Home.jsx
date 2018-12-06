import React, { Component } from 'react';
import './Home.scss'
import '../../styles/homeTheme.scss'

// subComponent
import Header from '../../components/layout/Header'
import BetterScroll from '../../components/base/BetterScroll'
import Nav from '../../components/layout/Nav'
import AdsSwiper from './subComponents/AdsSwiper'
import Notice from './subComponents/Notice'

// api
import { getHomeData } from '../../api/home'
import Topic from './subComponents/topicSwiper'
import MarketChance from './subComponents/MarketMachine'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsListData:[],
      liveListData:[],
      noticeListData:[],
      topicListData:[]
    }
  }
  componentDidMount(val){
    const random = Math.floor(Math.random()*2);
    if(random === 1){
      this.props.updateTheme({theme:'white'})
    }else{
      this.props.updateTheme({theme:'black'})
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getHomeDate(nextProps.theme)
  }
  async getHomeDate (theme) {
   const  { data } = await getHomeData({
     theme: theme === 'white' ? 'day' : theme === 'black'? 'night' : 'red',
     version: '7.00',
     platform: 'android'
   })
   this.setState({
    adsListData:data.FirstAppAdsJson,
    noticeListData:data.AnnounceJson,
    liveListData:data.LivePicsJson,
    topicListData:data.TopicPicsJson
   })
  }
  render() {
    console.log('render', this.props.theme)
    return (
      <BetterScroll>
        <div className={`home-warpper ${this.props.theme==='white'?'white':'black'}`}>
          <Header/>
          <Nav/>
          { this.state.adsListData.length>0 ? <AdsSwiper  adsList = {this.state.adsListData}/> : null }
          { this.state.noticeListData.length>0 ? <Notice  noticeList = {this.state.noticeListData}/> : null }
          <MarketChance/>
          {this.state.adsListData.length>0? <Topic topicList = {this.state.adsListData}/> : null}
          <div className='split-line'></div>  
          {this.state.liveListData.length>0? <img className='livepic' src={this.state.liveListData[0].ImageUrl} alt=""/> : null}
          <div className='split-line'></div>  
        </div>
      </BetterScroll>
    ) 
  }
}
export default Home