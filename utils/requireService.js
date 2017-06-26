var sendRrquest = function (url, method, data, header) {
    var promise = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data||{},
            method: method,
            header: header||{},
            success: resolve,
            fail: reject
        })
    });
    return promise;
};

module.exports.sendRrquest = sendRrquest