// pages/contact/contact.js
var App = getApp();
var that;
Page({

    data: {
        contactData: {
            items: [],
            params: {},
            paginate: {
                has_more: true,
            },
        },
    },

    onLoad(options) {
        that = this;
        // 接口
        that.contactLink = 'mag.contact.home1.json';
        that.getContactData();
    },
    getContactData() {
        let setObj = that.data.contactData;
        let params = setObj.params;

        App.HttpRequire.call({
            api: that.contactLink,
            data: params,
        }).then(data => {
            if (data.errcode == 0) {
                wx.setNavigationBarTitle({ title: data.page_title })
                let newData = data.contact_cat;

                if (newData.length) {
                    // if(data.current_page ==1){
                    //   setObj.items = [];
                    // }

                    setObj.items = [...setObj.items, ...newData];
                    let hasMore = data.total_pages > data.current_page ? true : false;
                    setObj.paginate.has_more = hasMore;
                    hasMore ? setObj.params.paged++ : null;

                    that.setData({
                            contactData: setObj,
                            hasMore: hasMore,
                            share_title: data.share_title
                        })
                        // console.info("contactData", that.data.contactData)

                }
            }
        }, err => {})
    },
    callOnLine(e) {
        console.info("p", e)
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
        })
    },
    onShareAppMessage() {
        return {
            title: that.data.share_title,
            path: '/pages/contact/contact',
        }
    }
    // messageOnLine(e){
    //   console.info(e)
    //   // https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN

    // },



})