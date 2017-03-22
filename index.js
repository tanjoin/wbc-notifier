var Nightmare = require('nightmare');
var nightmare = Nightmare({ show : false });
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
          'message': result
        });
        text = result;
      }
    })
    .catch(function(error) {
      console.error(error);
    });
};

main();
setInterval(main, 60000); // 1分おき
