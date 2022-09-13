function mapItems(items, getKey) {
    var map = {};
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var key = getKey(item);
        if (key in items) {
          throw new Error('Item key is duplicated (' + key + ').');
      }
        map[key] = item;
  }
    return map;
}

function detectChanges(prevItems, nextItems, getKey, compareItems) {
  var mappedItems = mapItems(prevItems, getKey);
  var detectedChanges = {
      addedItems: [],
      updatedItems: [],
      removedItems: [],
      unchangedItems: []
  };
  for (var i = 0; i < nextItems.length; ++i) {
      var nextItem = nextItems[i];
        var itemKey = getKey(nextItem);
      if (itemKey in mappedItems) {
          var prevItem = mappedItems[itemKey];
          if (delete mappedItems[itemKey] && compareItems(prevItem, nextItem)) {
              detectedChanges.unchangedItems.push(nextItem);
          } else {
                detectedChanges.updatedItems.push(nextItem);
          }
      } else {
          detectedChanges.addedItems.push(nextItem);
      }
  }
  for (var itemKey in mappedItems) {
        if (itemKey in mappedItems) {
          detectedChanges.removedItems.push(mappedItems[itemKey]);
      }
  }
  return detectedChanges;
}