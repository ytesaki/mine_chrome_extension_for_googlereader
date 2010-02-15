(function(){
  window.addEventListener('load', function(){
    var urls = [
      chrome.extension.getURL('script.js'),
    ];
    for(var i = 0; i < urls.length; i++){
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.src = urls[i];
      document.body.appendChild(script);
    }
  }, false);
})();