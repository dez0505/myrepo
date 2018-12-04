import React, { Component } from 'react';
import './Home.scss'
import '../../styles/homeTheme.scss'

// subComponent
import Header from '../../components/layout/Header'
import Nav from '../../components/layout/Nav'
import AdsSwiper from './subComponents/AdsSwiper'
import Notice from './subComponents/Notice'

// api
import { getHomeData } from '../../api/home'
import Topic from '../../components/layout/Topic'
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
  componentDidMount(){
    const random = Math.floor(Math.random()*2);
    if(random === 1){
      this.props.updateTheme({theme:'white'})
    }else{
      this.props.updateTheme({theme:'black'})
    }
    this.getHomeDate()
  }
  async getHomeDate () {
   const  { data }  =await getHomeData({
     theme: this.props.theme === 'white' ? 'day' : this.props.theme === 'black'? 'night' : 'red',
     version: '7.00',
     platform: 'android'
   })
   console.log(data.FirstAppAdsJson)
   this.setState({
    adsListData:data.FirstAppAdsJson,
    noticeListData:data.AnnounceJson,
    liveListData:data.LivePicsJson,
    topicListData:data.TopicPicsJson
   })
   setTimeout(()=>{
    console.log(this.state)
   },1000)
  }
  render() {
    return (
      <div className={`home-warpper ${this.props.theme==='white'?'white':'black'}`}>
        <Header/>
        <Nav/>
        { this.state.adsListData.length>0 ? <AdsSwiper  adsList = {this.state.adsListData}/> : null }
        { this.state.noticeListData.length>0 ? <Notice  noticeList = {this.state.noticeListData}/> : null }
        <Topic/>
      </div>
    ) 
  }
}
export default Home