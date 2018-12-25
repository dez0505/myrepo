module.exports = {
  plugins: [
    require('autoprefixer')({
        "browsers": [
          "defaults",
          "not ie < 11",
          "last 2 versions",
          "> 1%",
          "last 3 iOS versions",
          "iOS >= 8",
        ],
        flexbox: 'no-2009', // 作用可以将webkit-box 替换为webkit-flex  webkit-box 不能嵌套flex布局  webkit-flex可以
    })
  ]
}