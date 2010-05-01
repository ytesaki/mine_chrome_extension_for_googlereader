(function() {
//var test_a=function(){
  //var MAX_WINDOW_OPEN = 1;
  var MAX_WINDOW_OPEN = 5;
  var tagEdit = function(){
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    var target = document.evaluate('//div[@id="entries"]//div[contains(@class,"tags-edit")]//input[contains(@class,"tags-edit-tags")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var value = target.snapshotItem(0).value;
    target.snapshotItem(0).value
    target.snapshotItem(0).value="readed,"+value;
    var target_button = document.evaluate('//div[@id="entries"]//div[contains(@class,"tags-edit")]//div[contains(@class,"goog-button-body")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    target_button.snapshotItem(0).dispatchEvent(event);
  }
  var onKeyDown = function(event) {
    if(event.keyCode == 79 || event.keyCode == 73 && !event.shiftKey) {
      var entries = document.evaluate('//div[@id="entries"]//div[contains(@class ,"entry ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      if(event.keyCode == 73) entries = document.evaluate('//div[@id="entries"]//div[contains(@class ,"entry ") and not(contains(@class,"read"))]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for(var i = 0, m = MAX_WINDOW_OPEN; i < entries.snapshotLength && m > 0; i++) {
        var entry = entries.snapshotItem(i);
        var targetItems = document.evaluate('.//div[contains(@class, "item-star-active")]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(event.keyCode == 73) targetItems = entries;
        var tags = document.evaluate('.//span[contains(@class, "entry-tagging-action-title")]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(targetItems.snapshotLength > 0) {
          var targetItem = targetItems.snapshotItem(0);
          var tag = tags.snapshotItem(0);
          var links = document.evaluate('.//h2[@class="entry-title"]/a | .//div[@class="entry-main"]/a', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          if(links.snapshotLength > 0) {
            var link = links.snapshotItem(0);
            var win = window.open(link.href, '_blank');
            if(win && !win.closed) {
              m--;
              var event2 = document.createEvent('MouseEvents');
              event2.initEvent('click', true, true);
              targetItem.dispatchEvent(event2);
              tag.dispatchEvent(event2);
              window.setTimeout(tagEdit, 60);
            }
          }
        }
      }
    }
  }
  document.addEventListener('keydown', onKeyDown, false);
//};
//test_a();
})();
