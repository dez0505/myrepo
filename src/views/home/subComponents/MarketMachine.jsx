import React, { Component } from 'react';
import './MarketMachine.scss'
import Title from '../../../components/layout/Title'
const marketPic1 = require('../../../images/machine-images/today_date.png')
const marketPic3 = require('../../../images/machine-images/today_stop.png')
const marketPic2 = require('../../../images/machine-images/allman_make.png')
const marketPic4 = require('../../../images/machine-images/myself_change.png')
class Topic extends Component {
    constructor(props) {
        super(); //可以不给props
        this.state = {
            chanceList: [
                {
                    title: '今日投资日历',
                    list: [
                        { txt: '新股', num: '1' },
                        { txt: '新债', num: '1' },
                        { txt: '分红转送', num: '12' },
                        { txt: '停复牌', num: '137' }
                    ],
                    picUrl: marketPic1
                },
                {
                    title: '大家都在用',
                    list: [
                        { txt: '选股策略', num: '大数据' },
                        { txt: '股入选', num: '10' }
                    ],
                    picUrl: marketPic2
                },
                {
                    title: '个股发生异动',
                    list: [
                        { txt: '火箭发射', num: '海通证券' },
                        { txt: '涨幅', num: '9.36%' }
                    ],
                    picUrl: marketPic3
                },
                {
                    title: '今日板块涨停',
                    list: [
                        { txt: '家涨停', num: '90', extra: '共' },
                        { txt: '板块排名第一', num: '化工' }
                    ],
                    picUrl: marketPic4
                }
            ]
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className='market-box'>
                <div className='split-line'></div>
                <Title title='市场机会' />
                <div className="market-wrap top-border">
                    <div className="market-list">
                        {
                            this.state.chanceList.map((item, index) => {
                                return (
                                    <div key={index} className="market-item bot-border">
                                        <div className="market-title">{item.title}</div>
                                        <div className='market-desc-list'>
                                            {
                                                item.list.map((desc, num) => {
                                                    return (
                                                        <div key={num} className='market-desc'>
                                                            <span>{desc.extra?desc.extra:''}</span>
                                                            {index === 0 ? desc.txt:''}
                                                            {index === 2 && num === 1 ? desc.txt:''}
                                                            <span className='orgcolor'>{desc.num}</span>
                                                            {index !== 0 && (index !== 2 || num !== 1) ?desc.txt:''}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <img className='market-bg' src={item.picUrl} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Topic