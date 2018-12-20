import React, { Component } from 'react';
import '../../styles/homeTheme.scss'
import { Icon } from 'antd-mobile';
// redux
import { connect } from 'react-redux'
import { updatePageConfig } from '../../actions/index'
import { updateLoadingState } from '../../actions/list'

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
import TabHeader from './tab/TabHeader'
// api
import { getHomeData, getIconData } from '@/api/home'
// utils
import { getQueryString, setStore, getStore, getBase64, parseTime } from '@/utils/common'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsListData:[{
        AdsTypeCode: '2',
        FunctionTypeId: '1001111',
        ImageUrl:  require('../../images/home/defaultAds.jpg'),
        LinkTitle: '开户',
        LinkUrl: ''
      }],
      liveListData:[],
      noticeListData:[],
      topicListData:[],
      navMenusData:getStore('appindex.IndexMenus')||[],
      liveFmList: [],
      refreshTime: '',
      isTabFixed: false,
      innerHeight: 0,
    }
  }

  componentDidMount(){
    this.updatePageConfig()
  }
  // 重置页面路由参数  若没获取到window.innerHeight 反复调用
  updatePageConfig() {
    if(window.innerHeight) {
      this.setState({innerHeight:window.innerHeight})
      const titleheight = getQueryString('titleheight')
      const version = getQueryString('appversion')
      const htid = getQueryString('htid')
      const platform = getQueryString('platform')
      const account = getQueryString('account')
      const theme = getQueryString('theme')
      const scrollHeight = window.innerHeight - titleheight
      this.props.updatePageConfig({titleheight, theme, htid, platform, account, version, scrollHeight})
      window.getOptional('SH601801,SZ002167,SZ000001,HK00001,HH00637,HZ00330','自选股')
      // window.location.href = '@optional_and_team'
    } else {
      setTimeout(() => {
        this.updatePageConfig()
      }, 100)
    }
    
  }
  // 当主题或其他参数变化时 路由发生变化时 执行接口 
  componentWillReceiveProps(nextProps) {
    if(nextProps.theme !== this.props.theme || nextProps.version !== this.props.version || nextProps.platform !== this.props.platform) {
      this.initHomeApi(nextProps)
    } 
  }
  // 获得菜单图标数据
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
  // 获得首页数据
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
   if(data.FirstAppAdsJson.length === 0) {
    this.setState({
      adsListData: [{
        AdsTypeCode: '2',
        FunctionTypeId: '1001111',
        ImageUrl:  require('../../images/home/defaultAds.jpg'),
        LinkTitle: '开户',
        LinkUrl: ''
      }]
    }) 
   }
  }
  // 首页内容初始化
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
  // 上拉刷新首页内容
  updateHomeContent() {
    this.initHomeApi(this.props,() => {
      this.props.updateLoadingState({
        refreshLoading: true
      })
    })//更新首页接口
  }
  // render 固定tab栏
  renderFixTab() {
    const {theme, tabIsFixed, activeHomeTabIndex} = this.props
    const tabFixStyle={
      position: 'fixed',
      top: getQueryString('titleheight')+'px',
      left: 0,
      right: 0,
      zIndex: 99,
      background: theme === 'night' ? '#202528' : '#fff',
      display: tabIsFixed? '' : 'none'
    }
    if(activeHomeTabIndex === 3) {
      return (
        <div style={tabFixStyle}>
          <TabHeader type='home' watch={false}></TabHeader> 
          <TabHeader type='optional' watch={false}></TabHeader>
        </div>
      )
    } else {
      return (
        <div style={tabFixStyle}>
          <TabHeader type='home' watch={false}></TabHeader> 
        </div>
      )
    }
  }
  render() {
    const {theme} = this.props
    const {adsListData,noticeListData,liveFmList,refreshTime,navMenusData,topicListData,innerHeight} = this.state
    const liveFmListProps = {theme,liveFmList}
    const themeClassName = theme === 'day' ? 'white' : theme === 'night' ? 'black' : 'red'
    return (
        innerHeight ? (
        <div className={themeClassName} style={{height:'100%'}}>
          <Header/>
          {
            this.renderFixTab()
          }
          <BetterScroll ref='betterScroll' refreshTime = {refreshTime} updateHomeContent={() =>this.updateHomeContent()}>
            <div className={ 'home-warpper'}>
              <Nav navMenus={navMenusData} theme={theme}/>
              { adsListData.length>0 ? <AdsSwiper  adsList = {adsListData}/> : null }
              { noticeListData.length>0 ? <Notice theme = {theme} noticeList = {noticeListData}/> : null }
              <MarketMachine />
              {topicListData.length>0? <TopicSwiper topicList = {topicListData}/> : null}
              { liveFmList.length>0? <LiveFM {...liveFmListProps}> </LiveFM>: null }
              <div className='split-line'></div>
              <TabBox/> 
            </div>
          </BetterScroll>
      </div>) : <Icon className='loading-icon' type='loading' text='loading' />
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.pageConfig.theme,            // 主题
    version: state.pageConfig.version,        // 版本
    htid: state.pageConfig.htid,              // 用户id
    platform: state.pageConfig.platform,      // 安卓或ios
    account: state.pageConfig.account,        // account 没用到
    tabIsFixed: state.pageConfig.tabIsFixed,  // 控制是否显示固定头
    activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex, // 控制是否显示固定optional头
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePageConfig: theme => dispatch(updatePageConfig(theme)),
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)