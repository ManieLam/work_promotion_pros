// var Promise = require('./es6-promise').Promise;
// const config = require('../meta.js')
import {HOST_PATH} from '../meta.js'

function noop() {}
var defaultOptions = {
    method: 'GET',
    header: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    success: noop,
    fail: noop,
    complete: noop
};
const call = function(options = {}) {
        let that = this;
        return new Promise((resolve, reject) => {
            wx.canIUse('showLoading') ? wx.showLoading({ title: '拼命加载中' }) : wx.showToast({ title: '拼命加载中', icon: 'loading' });
            var params = Object.assign({}, defaultOptions, options);
            params.url = options.url || (HOST_PATH + params.api);

            params.success = function(res) {
                wx.canIUse('showLoading') ? wx.hideLoading() : null;
                if (res.statusCode == 200) {
                    if (res.data.errcode == 0) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                } else {
                    reject(res.data);
                }
            }

            params.fail = function(res) {
                reject(res);
            }

            wx.request(params);
        });

    }

module.exports = {
    call:call,
}