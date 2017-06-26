//app.js
import meta from 'meta';
import storage from './utils/storage';
import Events from './utils/event';
import Auth from './utils/Auth'
import HttpRequire from './utils/api.js';

var HOST_PATH = meta.HOST_PATH

App(Object.assign({}, Events, {
    onLaunch() {
        // this.db = db
        this.storage = storage(this);
        this.HttpRequire = HttpRequire;
    },

    globalData: {
        link: HOST_PATH,
        // naviTitle: '一个程序推广',
        userInfo: {},
        token: null,
        hasToken: null,
        encryptedData: null,
        iv: null,
        code: null,

    },
    showErrToast(title, duration, image) {
        wx.showToast({
            title: title || "必选项未完全填完",
            image: image || '../../assets/images/icon_cancel.png',
            duration: duration || 1500
        })
    },
}))