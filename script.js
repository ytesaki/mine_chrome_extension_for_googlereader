(function() {
  var MAX_WINDOW_OPEN = 5;
  var onKeyDown = function(event) {
    if(event.keyCode == 79 && !event.shiftKey) {
      var entries = document.evaluate('//div[@id="entries"]//div[contains(@class ,"entry ")] | //div[@id="entries"]//div[@class="collapsed"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for(var i = 0, m = MAX_WINDOW_OPEN; i < entries.snapshotLength && m > 0; i++) {
        var entry = entries.snapshotItem(i);
        var stars = document.evaluate('.//div[contains(@class, "item-star-active")]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var tags = document.evaluate('.//span[contains(@class, "entry-tagging-action-title")]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        if(stars.snapshotLength > 0) {
          var star = stars.snapshotItem(0);
          var tag = tags.snapshotItem(0);
          var links = document.evaluate('.//h2[@class="entry-title"]/a | .//div[@class="entry-main"]/a', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          if(links.snapshotLength > 0) {
            var link = links.snapshotItem(0);
            var win = window.open(link.href, '_blank');
            //alert("open stars?"+win);
            if(win && !win.closed) {
              m--;
              var event = document.createEvent('MouseEvents');
              event.initEvent('click', true, true);
              star.dispatchEvent(event);
              tag.dispatchEvent(event);
              window.setTimeout(function(){
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                var target = document.evaluate('//div[@id="entries"]//div[contains(@class,"tags-edit")]//input[contains(@class,"tags-edit-tags")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                target.snapshotItem(0).value="readed";
                var target_button = document.evaluate('//div[@id="entries"]//div[contains(@class,"tags-edit")]//div[contains(@class,"goog-button-body")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                target_button.snapshotItem(0).dispatchEvent(event);
              }, 20);
            }
          }
        }
      }
    }
  }
  
  document.addEventListener('keydown', onKeyDown, false);
})();
/**/