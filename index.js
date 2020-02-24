const axios = require("axios");
const fs = require('fs');
const md5 = require('md5');
module.exports = function (str, complete, contain_dir) {
    let counter = 0;
    let list = str.trim().split('\n').map(s => s.trim()).filter(a => (a.length && a.indexOf('http') === 0));
    list = [...new Set(list)];
    list.forEach(url => {
        getUrl(url);
    });
    function getUrl(url) {
        let file = contain_dir + md5(url) + '.txt';
        (async () => {
            try {
                let stats2 = await new Promise((oo, xx) => {
                    fs.lstat(contain_dir, function (e, stats) {
                        oo(stats);
                    });
                });
                if (!stats2) {
                    await new Promise((oo, xx) => {
                        fs.mkdir(contain_dir, a => { oo(); });
                    });
                }
                let rs = await new Promise((oo, xx) => {
                    fs.lstat(file, function (e, stats) {
                        oo(!(stats && stats.isFile()));
                    });
                });
                if (rs) {
                    let html = await axios.get(url);
                    let wo = {
                        url: url,
                        data: html.data,
                        headers: html.headers,
                        statusText: html.statusText,
                        status: html.status
                    }
                    fs.writeFile(file, JSON.stringify(wo), d => {
                        console.log('complete - ' + url);
                    });
                }
            } catch (e) {
                console.log('fail - ' + url);
            }
            counter++;
            if (counter === list.length) {
                complete();
            }
        })();
    }
    return list;
};
