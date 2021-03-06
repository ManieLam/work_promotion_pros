//index.js
//获取应用实例
var App = getApp();
var that;
Page({
    data: {
        // initSearch: {
        //     inputType: 'text',
        //     placeholder: '输入关键词,一键解锁小程序',
        //     searchInputShowed: true,
        // },
        isShow: false,
        allShow: true,
        pTags: [],
        tags: [],
        newAccounts: [],
        noMore: false,
        cat_id: 1, //默认分类id为1 (id:1 科技)
        modalInit: {
            modalHide: true,
            tag_id: null,
        }, //modal默认设置
        staticTags: [{ id: 9, name: "关联", isAct: false }, { id: 10, name: "推文", isAct: false }, { id: 11, name: "菜单", isAct: false }, { id: 12, name: "底部广告", isAct: false }]

    },
    //事件处理函数
    onLoad: function() {
        that = this
            //请求接口
        that.listsLink = 'mag.account.home.json';
        // that.globalData = App.globalData.inforList;
        that.initData();
    },
    initData() {
        let obj = {
            items: [],
            params: {},
            paginate: {
                hasMore: false,
            },
        };
        that.setData({
            newAccounts: obj,
        })
        that.getList();
    },
    //搜索
    // handleInput(e) {
    //     // console.info(e.detail.value)
    //     that.setData({ searchValue: e.detail.value })
    // },
    // clearInput() {
    //     that.setData({ searchValue: '' });
    // },
    // getSearchList(e) {
    //     e.currentTarget.dataset.key ? that.setData({ searchValue: '' }) : '';
    //     let searchValue = that.data.searchValue || e.currentTarget.dataset.key;
    //     if (searchValue) {
    //         wx.navigateTo({
    //             url: '/pages/searchResult/searchResult?key=' + searchValue + "&post_type=news",
    //         })
    //     } else {
    //         App.showErrToast('输入搜索关键词')
    //     }

    // },

    getList(options) {
        let objName = 'newAccounts';
        let setObj = that.data[objName];

        let params = Object.assign(setObj.params, {
            cat: that.data.cat_id
        }, options);

        App.HttpRequire.call({
            api: that.listsLink,
            data: params,
        }).then(data => {
            if (data.errcode == 0) {
                wx.setNavigationBarTitle({ title: data.page_title })
                let dataList = data.accounts;
                if (dataList.length) {

                    dataList.map(res => {
                        res.thumbnail = res.thumbnail ? res.thumbnail + "?imageView2/2/w/120" : '';
                        res.read = res.read > 10000 ? res.read.substr(0, res.read.length - 4) + 'W+' : res.read;
                        res.fans = res.fans > 10000 ? res.fans.substr(0, res.fans.length - 4) + 'W+' : res.fans;
                    })

                    let next_cursor = data.next_cursor,
                        next_first = data.next_first;
                    setObj.items = [];
                    setObj.items = [...setObj.items, ...dataList];
                    // setObj.paginate.hasMore = next_cursor != next_first;
                    // next_cursor != next_first ? setObj.params.paged++ : null;
                    that.setData({
                        [objName]: setObj,
                        tags: data.categorys,
                        pTags: data.categorys.slice(0, 3),
                        page_title: data.page_title,
                        share_title: data.share_title,
                        hasMore: data.next_cursor,
                        hasNew: data.next_first,
                    })
                    console.info(setObj)
                }
            }
        }, err => {
            // App.showErrToast('暂无该关键字文章', 3000);
        })
    },

    navigateToArticalDetail(e) {
        //点击打开浮层
        let acDetail = that.data.newAccounts.items.find(items => {
                return items.id == e.currentTarget.dataset.id
            })
            // console.info("acDetail", acDetail)
        that.setData({
            "modalInit.item": acDetail,
            "modalInit.tag_id": e.currentTarget.dataset.id,
            "modalInit.modalHide": !that.data.modalInit.modalHide,
        })
    },
    modalChange() {
        that.setData({ "modalInit.modalHide": !that.data.modalInit.modalHide })
    },
    showNewTagList(e) { //打开新的公众号分类
        const cat_id = e.currentTarget.dataset.id;
        that.setData({ cat_id: cat_id });
        that.getList();
    },
    loadMore() {
        console.log("loadMore");
        if (that.data.hasMore) {
            that.getList({ cursor: that.data.hasMore })
        }
    },
    onShareAppMessage() {
        return {
            title: that.data.share_title,
            path: "/pages/index/index",
        }
    },
    onReachBottom() {
        console.log("加载更多");
        if (that.data.hasMore) {
            that.getList({ cursor: that.data.hasMore })
        }
    },
    showTag(e) {
        const show = e.currentTarget.dataset.show;
        console.info("show::", show)
        show == "true" ? that.setData({ allShow: false, isShow: true }) : that.setData({ allShow: true, isShow: false })
    }

})