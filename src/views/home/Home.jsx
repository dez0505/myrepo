import React, { Component } from 'react';
import './Home.scss'
import '../../styles/homeTheme.scss'

// subComponent
import Header from '@/components/layout/Header'
import BetterScroll from '@/components/base/BetterScroll'
import Nav from '@/components/layout/Nav'
import AdsSwiper from './subComponents/AdsSwiper'
import Notice from './subComponents/Notice'
import TabBox from './tab/TabBox'
import Topic from './subComponents/topicSwiper'
import MarketChance from './subComponents/MarketMachine'

// api
import { getHomeData, getIconData } from '@/api/home'
// utils
import { getQueryString, setStore, getStore, getBase64 } from '@/utils/common'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsListData:[],
      liveListData:[],
      noticeListData:[],
      topicListData:[],
      navMenusData:[],
    }
  }

  componentDidMount(){
    const version = getQueryString('appversion')
    const htid = getQueryString('htid')
    const platform = getQueryString('platform')
    const account = getQueryString('account')
    const theme = getQueryString('theme')
    this.props.updatePageConfig({theme, htid, platform, account, version})
  }
  componentWillReceiveProps(nextProps) {
    this.getHomeData(nextProps)
    this.getIconData(nextProps)
  }
  async getIconData (params) {
   const {version, platform} = params
   try {
      const { data } = await getIconData({
        version, platform
      }) 
      if (data.Funlist.length === 0) return
      Promise.all(data.Funlist.map(d => getBase64(d.ImageUrl))).then(
        result => {
          const navMenusData = result.map((ImageUrl, i) => ({
            ...data.Funlist[i],
            ImageUrl
          }))
          this.setState({
            navMenusData
          })
          setStore('appindex.IndexMenus', navMenusData)
        },
        err => {
          throw (err)
        }
      )
   } catch (error) {
      throw (error)
   }
  }
  async getHomeData (params) {
   const {theme, version, platform} = params
   const  { data } = await getHomeData({
     theme,
     version,
     platform
   })
   this.setState({
    adsListData:data.FirstAppAdsJson,
    noticeListData:data.AnnounceJson,
    liveListData:data.LivePicsJson,
    topicListData:data.TopicPicsJson
   })
  }
  render() {
    console.log(333, this.props)
    return (
      <BetterScroll>
        <div className={`home-warpper ${this.props.theme==='night'?'black':'white'}`}>
          <Header/>
          <Nav navMenus={this.state.navMenusData}/>
          { this.state.adsListData.length>0 ? <AdsSwiper  adsList = {this.state.adsListData}/> : null }
          { this.state.noticeListData.length>0 ? <Notice  noticeList = {this.state.noticeListData}/> : null }
          <MarketChance/>
          {this.state.adsListData.length>0? <Topic topicList = {this.state.adsListData}/> : null}
          <div className='split-line'></div>  
          {this.state.liveListData.length>0? <img className='livepic' src={this.state.liveListData[0].ImageUrl} alt=""/> : null}
          <div className='split-line'></div>
          <TabBox/>  
        </div>
      </BetterScroll>
    ) 
  }
}
export default Home