const statisticData = {
  '10062': { 'name': '搜索', 'clickKey': '51734', 'clickType': 'CAction' },
  '10067': { 'name': '消息中心', 'clickKey': '51547', 'clickType': 'CAction' },
  '10203': { 'name': '智能选股3.0', 'clickKey': '51543', 'clickType': 'CSC' },
  '10034': { 'name': '限售解禁', 'clickKey': '51224', 'clickType': 'CSC' },
  '10029': { 'name': '主力持仓', 'clickKey': '51207', 'clickType': 'CSC' },
  '10037': { 'name': '资金流向', 'clickKey': '51230', 'clickType': 'CSC' },
  '10045': { 'name': '深港通专题（对话深港通）', 'clickKey': '51231', 'clickType': 'CSC' },
  '10019': { 'name': '产品商城', 'clickKey': '50109', 'clickType': 'CSC' },
  '10035': { 'name': '股市日历', 'clickKey': '51225', 'clickType': 'CSC' },
  '10075': { 'name': '我的足迹', 'clickKey': '51353', 'clickType': 'CSC' },
  '10027': { 'name': '业绩预告', 'clickKey': '51222', 'clickType': 'CSC' },
  '10030': { 'name': '两融规模', 'clickKey': '51208', 'clickType': 'CSC' },
  '21168': { 'name': '智能账单（对账单）', 'clickKey': '51204', 'clickType': 'CSC' },
  '10031': { 'name': '大宗交易', 'clickKey': '51209', 'clickType': 'CSC' },
  '30011': { 'name': '行情预警', 'clickKey': '51221', 'clickType': 'CSC' },
  '21004': { 'name': '资金股份', 'clickKey': '50105', 'clickType': 'CSC' },
  '10046': { 'name': '黄金专题', 'clickKey': '51232', 'clickType': 'CSC' },
  '10072': { 'name': '全部（查看全部功能）', 'clickKey': '51353', 'clickType': 'CSC' },
  '10074': { 'name': '智能问答（海博士）', 'clickKey': '51356', 'clickType': 'CSC' },
  '10028': { 'name': '龙虎榜', 'clickKey': '51206', 'clickType': 'CSC' },
  '10036': { 'name': '股东人数', 'clickKey': '51226', 'clickType': 'CSC' },
  '21163': { 'name': '一键打新', 'clickKey': '51203', 'clickType': 'CSC' },
  '1001111': { 'name': '立即开户', 'clickKey': '50701', 'clickType': 'CSC' },
  '10047': { 'name': '学堂', 'clickKey': '51233', 'clickType': 'CSC' },
  '10057': { 'name': '智能舆情', 'clickKey': '51672', 'clickType': 'CSC' },
  '10021': { 'name': '数据中心', 'clickKey': '51673', 'clickType': 'CSC' },
  '10196': { 'name': '通知公告列表', 'clickKey': '50111', 'clickType': 'CAction' },
  '10203@more': { 'name': '智能选股-更多', 'clickKey': '51653', 'clickType': 'CAction' },
  '10109@211': { 'name': '智能选股指标-上升通道', 'clickKey': '51654', 'clickType': 'CIntelliPickIndex' },
  '10109@212': { 'name': '智能选股指标-平台突破', 'clickKey': '51655', 'clickType': 'CIntelliPickIndex' },
  '10109@223': { 'name': '智能选股指标-均线多头', 'clickKey': '51656', 'clickType': 'CIntelliPickIndex' },
  '10109@1000': { 'name': '智能选股指标-指标共振', 'clickKey': '51657', 'clickType': 'CIntelliPickIndex' },
  '10109@1001': { 'name': '智能选股指标-白马优选', 'clickKey': '51658', 'clickType': 'CIntelliPickIndex' },
  '10109@1002': { 'name': '智能选股指标-成长潜力', 'clickKey': '51659', 'clickType': 'CIntelliPickIndex' },
  '10109@1003': { 'name': '智能选股指标-破净反弹', 'clickKey': '51660', 'clickType': 'CIntelliPickIndex' },
  '10109@1004': { 'name': '智能选股指标-大单买入', 'clickKey': '51661', 'clickType': 'CIntelliPickIndex' },
  '10109@30000': { 'name': '智能选股指标-MACD金叉', 'clickKey': '51662', 'clickType': 'CIntelliPickIndex' },
  '10109@30701': { 'name': '智能选股指标-BOLL突破中轨', 'clickKey': '51663', 'clickType': 'CIntelliPickIndex' },
  '10109@1100': { 'name': '智能选股指标-实时热搜', 'clickKey': '51664', 'clickType': 'CIntelliPickIndex' },
  '10109@1101': { 'name': '智能选股指标-涨停追踪', 'clickKey': '51665', 'clickType': 'CIntelliPickIndex' },
  '10109@1102': { 'name': '智能选股指标-主力异动', 'clickKey': '51666', 'clickType': 'CIntelliPickIndex' },
  '10109@1103': { 'name': '智能选股指标-多方关注', 'clickKey': '51667', 'clickType': 'CIntelliPickIndex' },
  '10109@1104': { 'name': '智能选股指标-基金增仓', 'clickKey': '51668', 'clickType': 'CIntelliPickIndex' },
  '10109@1105': { 'name': '智能选股指标-研报推荐', 'clickKey': '51669', 'clickType': 'CIntelliPickIndex' },
  'clickZNXG': { 'name': '智能选股推荐股点击', 'clickKey': '51670', 'clickType': 'CAction' },
  '10019@more': { 'name': '理财产品-更多', 'clickKey': '51671', 'clickType': 'CAction' },
  '10047@btn': { 'name': '学堂', 'clickKey': '51365', 'clickType': 'CAction' },
  '10048@btn': { 'name': '吐槽', 'clickKey': '50115', 'clickType': 'CAction' },
  '10119@btn': { 'name': '活动', 'clickKey': '51679', 'clickType': 'CAction' },
  '10123': { 'name': '精选咨询-更多', 'clickKey': '50112', 'clickType': 'CAction' },
  '10035@more': { 'name': '投资日历', 'clickKey': '51680', 'clickType': 'CAction' },
  '10129': { 'name': '扫一扫', 'clickKey': '51730', 'clickType': 'CAction' },
  '10118': { 'name': '智能盯盘', 'clickKey': '51745', 'clickType': 'CSC' },
  '10084': { 'name': '短线精灵', 'clickKey': '51746', 'clickType': 'CAction' },
  '10127': { 'name': '涨停分析', 'clickKey': '51747', 'clickType': 'CAction' },
  '30014': { 'name': '直播鉴权', 'clickKey': '51748', 'clickType': 'CAction' },
  'tab0': { 'name': '切换到头条', 'clickKey': '51749', 'clickType': 'CAction' },
  'tab1': { 'name': '切换到首席', 'clickKey': '51750', 'clickType': 'CAction' },
  'tab2': { 'name': '切换到7*24', 'clickKey': '50600', 'clickType': 'CAction' },
  'tab3': { 'name': '切换到自选', 'clickKey': '50603', 'clickType': 'CAction' },
  'tab4': { 'name': '切换到更多', 'clickKey': '50606', 'clickType': 'CAction' },
  '10006': { 'name': '更多-彩虹内参', 'clickKey': '51354', 'clickType': 'CAction' },
  '10038': { 'name': '更多-港股策略', 'clickKey': '51355', 'clickType': 'CAction' },
  '10114': { 'name': '更多-主编精选', 'clickKey': '51506', 'clickType': 'CAction' },
}
export default statisticData
