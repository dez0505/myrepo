import React, { Component } from 'react';
import '../../styles/homeTheme.scss'

// subComponent
import BetterScroll from '@/components/base/BetterScroll'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import AdsSwiper from './subComponents/AdsSwiper'
import Notice from './subComponents/Notice'
import MarketMachine from './subComponents/MarketMachine'
import TopicSwiper from './subComponents/TopicSwiper'
import LiveFM from './subComponents/LiveFM'
import TabBox from './tab/TabBox'
import TabHeaderCase from '../../containers/TabHeaderCase'

// container


// api
import { getHomeData, getIconData } from '@/api/home'
// utils
import { getQueryString, setStore, getStore, getBase64, parseTime } from '@/utils/common'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsListData:[],
      liveListData:[],
      noticeListData:[],
      topicListData:[],
      navMenusData:getStore('appindex.IndexMenus')||[],
      liveFmList: [],
      refreshTime: '',
      isTabFixed: false,
      activeScrollY: {
        value: 0
      }
    }
  }

  componentDidMount(){
    this.updatePageConfig()
  }
  // 重置页面路由参数
  updatePageConfig() {
    const titleheight = getQueryString('titleheight')
    const version = getQueryString('appversion')
    const htid = getQueryString('htid')
    const platform = getQueryString('platform')
    const account = getQueryString('account')
    const theme = getQueryString('theme')
    const scrollHeight = window.innerHeight - titleheight
    this.props.updatePageConfig({titleheight, theme, htid, platform, account, version, scrollHeight})
  }
  // 执行接口
  componentWillReceiveProps(nextProps) {
    if(nextProps.theme !== this.props.theme || nextProps.version !== this.props.version || nextProps.platform !== this.props.platform) {
      this.initHomeApi(nextProps)
    } 
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
    topicListData:data.TopicPicsJson,
    liveFmList: data.FmLivePicsJson
   })
  }
  initHomeApi(nextProps, callback) {
    Promise.all([
      this.getIconData(nextProps),this.getHomeData(nextProps)
    ]).then(() => {
      const refreshTime = parseTime(new Date())
      this.setState({
        refreshTime
      })
      if(callback){
        callback()
      }
    })
  }
  updateHomeContent() {
    this.initHomeApi(this.props,() => {
      this.props.updateLoadingState({
        refreshLoading: true
      })
    })//更新首页接口

  }
  loadFixTabMenu() {
    const tabFixStyle={
      position: 'fixed',
      top: getQueryString('titleheight')+'px',
      left: 0,
      right: 0,
      zIndex: 99,
      background: this.props.theme === 'night' ? '#202528' : '#fff',
      display: this.props.tabIsFixed? '' : 'none'
    }
    if(this.props.activeHomeTabIndex === 3) {
      return (
        <div style={tabFixStyle}>
          <TabHeaderCase type='home'></TabHeaderCase> 
          <TabHeaderCase type='optional'></TabHeaderCase>
        </div>
      )
    } else {
      return (
        <div style={tabFixStyle}>
          <TabHeaderCase type='home'></TabHeaderCase> 
        </div>
      )
    }
  }
  render() {
    const liveFmListProps = {theme:this.props.theme, liveFmList:this.state.liveFmList}
    return (
      <div>
        <Header/>
        {
          this.loadFixTabMenu()
        }
        <BetterScroll refreshTime = {this.state.refreshTime} updateHomeContent={()=>this.updateHomeContent()}>
          <div className={`home-warpper ${this.props.theme==='night'?'black':'white'}`}>
            <Nav navMenus={this.state.navMenusData} theme={this.props.theme}/>
            { this.state.adsListData.length>0 ? <AdsSwiper  adsList = {this.state.adsListData}/> : null }
            { this.state.noticeListData.length>0 ? <Notice theme = {this.props.theme} noticeList = {this.state.noticeListData}/> : null }
            <MarketMachine />
            {this.state.adsListData.length>0? <TopicSwiper topicList = {this.state.adsListData}/> : null}
            { this.state.liveFmList.length>0? <LiveFM {...liveFmListProps}> </LiveFM>: null }
            <div className='split-line'></div>
            <TabBox/> 
          </div>
        </BetterScroll>
      </div>
    ) 
  }
}
export default Home