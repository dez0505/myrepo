import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Nav.scss'
import { goToFunction, getQueryString } from '@/utils/common.js'
const defautMenus = [{
  Funid: '21163',
  Funname: '一键打新',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/daxin.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10019',
  Funname: '产品商城',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/shangcheng.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10021',
  Funname: '数据中心',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/data-center.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '21004',
  Funname: '资金持仓',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/zjcc.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10203',
  Funname: '智能选股',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/znxg.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '21168',
  Funname: '智能账单',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/znzd.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '1',
}, {
  Funid: '10074',
  Funname: '智能问答',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/boshi.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10072',
  Funname: '全部',
  IconType: '1',
  ImageUrl: require('../../images/nav-images/all.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '1'
}, {
  Funid: '21163',
  Funname: '一键打新',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/daxin-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommen: '0',
}, {
  Funid: '10019',
  Funname: '产品商城',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/shangcheng-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10021',
  Funname: '数据中心',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/data-center-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '21004',
  Funname: '资金持仓',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/zjcc-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10203',
  Funname: '智能选股',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/znxg-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '21168',
  Funname: '智能账单',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/znzd-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10074',
  Funname: '智能问答',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/boshi-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '0',
}, {
  Funid: '10072',
  Funname: '全部',
  IconType: '2',
  ImageUrl: require('../../images/nav-images/all-red.png'),
  LinkUrl: '',
  Linktype: '0',
  Recommend: '1'
}]
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterNavMenus: []
    }
  }
  setFilterMenus (navMenus, theme = 'day') {
    if (!navMenus.length) return
    const filterNavMenus = navMenus.filter(item => theme === 'red' ? item.IconType === '2' : item.IconType === '1')
    this.setState({
      filterNavMenus
    })
  }
  // 解决有默认值的情况要在mount中执行
  componentWillMount () {
   this.setFilterMenus(defautMenus, getQueryString('theme'))
  }
  componentWillReceiveProps(props) {
    this.setFilterMenus(props.navMenus, props.theme)
  }
  render() {
    return (
      <div className='nav-warpper'>
        <div className="nav-list">
          {
            this.state.filterNavMenus.map((item,index)=>{
              return(
                <div className="nav-item" onClick= { () => goToFunction(item.Funid) } data-id={index} key={index}>
                  <img src={item.ImageUrl} alt=""/>
                  <div>{item.Funname}</div>
                </div>
              ) 
            })
          }
        </div>
      </div>
    ) 
  }
}
Nav.propTypes = {
  navMenus: PropTypes.array,
}
export default Nav