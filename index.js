var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: false
});
var notifier = require('node-notifier');

var text = '';

var main = function() {
    nightmare
        .goto('https://baseball.yahoo.co.jp/live/wbc/game/2017032211/score')
        .wait('#situation')
        .evaluate(function() {
            return document.querySelector('#situation > p').innerText;
        })
        .end()
        .then(function(result) {
            if (text !== result) {
                notifier.notify({
                    'title': 'WBC速報',
                    'message': result,
                    'icon': 'res/job_sports_jikkyou.png',
                    'open': 'https://baseball.yahoo.co.jp/live/wbc/game/2017032211/score'
                });
                text = result;
            }
        })
        .catch(function(error) {
            console.error(error);
            notifier.notify({
                'title': 'WBC速報',
                'message': 'エラーが発生したため通知を終了します',
                'icon': 'res/job_uguisujou_sports.png',
                'open': 'https://baseball.yahoo.co.jp/live/wbc/game/2017032211/score'
            });
            clearInterval(loop);
        });
};

var loop = setInterval(function() {
    main();
}, 10000); // 10秒おき
