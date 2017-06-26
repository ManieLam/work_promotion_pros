// pages/articalDetail/articalDetail.js
var WxParse = require('../../helpers/wxParse.js');
var App = getApp();
var that;
const HttpRequire = require('../../utils/api');
const Auth = require('../../utils/Auth');
Page({
    data: {
        datalist: {},
        // showWrite: false,
        // isLikeArt: false,
        // hasMore: {
        //     hasMore: false,
        //     nohasMore_title: '以上全部留言'
        // },
        // modal_options: { title: '', content: '' },
        leaveMsg: '', //留言信息
    },
    onLoad: function(options) {
        that = this;
        that.setData({
            aid: options.aid,
            isShare: options.isShare,
        })

        // 设置请求链接
        that.getDetail = 'mag.channel.get.json';
        that.getArticalDetail()

    },

    onShow() {

    },
    getArticalDetail() {
        console.info(1231231)
        let access_token = '';
        let data = {
            id: that.data.aid,
        };
        let nUrl = access_token ? that.getDetail + '?access_token=' + access_token : that.getDetail;
        HttpRequire.call({
            api: nUrl,
            data: data,
        }).then(data => {
            if (data.errcode == 0) {
                let resultList = data.chanel;
                // wx.setNavigationBarTitle({ title: data.page_title })

                resultList.content ? WxParse.wxParse('content', 'html', resultList.content, that, 5) : null;
                // let nohasMore_title = resultList.reply_count ? '以上全部评论' : '暂无评论';
                // resultList.thumbnail = resultList.thumbnail ? resultList.thumbnail + "?imageView2/1/w/220/h/220" : ''



                that.setData({
                    resultList: resultList,
                    // page_title: data.page_title,
                    // share_title: data.share_title,
                    // isLikeArt: resultList.is_liked,
                    // "hasMore.nohasMore_title": nohasMore_title,
                })
            }
        }, err => {})

    },
    onShareAppMessage() {
        const aid = this.data.aid;
        return {
            title: that.data.share_title,
            path: '/pages/articalDetail/articalDetail?aid=' + aid + '&isShare=1',

        }
    }

})