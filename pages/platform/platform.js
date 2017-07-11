const App = getApp()
var that;
Page({
    data: {
        list: [],
        // isFirst: 0,
    },
    onLoad(options) {
        that = this;
        that.listsLink = 'mag.channel.list.json';
        that.setData({
            id: options.id,
        })
        this.initData();
    },
    initData() {
        let obj = {
            items: [],
            params: {},
        };
        that.setData({
            list: obj,
        })
        that.getList();
    },
    getList() {
        let objName = 'list';
        let setObj = that.data[objName];
        let params = setObj.params;

        App.HttpRequire.call({
            api: that.listsLink,
            data: params,
        }).then(data => {
            if (data.errcode == 0) {
                wx.setNavigationBarTitle({ title: data.page_title })
                let dataList = data.channels;
                if (dataList.length) {
                    setObj.items = [];
                    dataList.map(res => {
                        res.thumbnail = res.thumbnail ? res.thumbnail + "?imageView2/1/w/140/h/140" : '';
                    })
                    setObj.items = [...setObj.items, ...dataList];
                    that.setData({
                        [objName]: setObj,
                        page_title: data.page_title,
                        share_title: data.share_title,
                    })
                }
            }
        }, err => {
            // App.showErrToast('暂无该关键字文章', 3000);
        })
    },
    onPullDownRefresh() {
        // isFirst++;
        // console.log(isFirst);
    },
    navigateToArticalDetail(e) {
        const aid = e.currentTarget.dataset.aid;
        wx.navigateTo({
            url: '/pages/articalDetail/articalDetail?aid=' + aid,
        })
    },
    onShareAppMessage() {
        return {
            title: that.data.share_title,
            // desc: '给你最好的推广!',
            path: 'pages/detail/order'
        }
    }
})