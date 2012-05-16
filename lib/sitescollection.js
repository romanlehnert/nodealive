var site = require('./site');

var sitesCollection = function(spec) {
  var that = {};

  that.sites = {};

  that.count = function() {
    return Object.keys(that.sites).length;
  };

  that.addSite = function(site) {
    that.sites[site.id] = site;
  };

  that.findSite = function(id) {
    return that.sites[id];
  };

  that.findOrCreateById = function(id) {
    if (typeof(that.sites[id]) == "undefined") {
      that.sites[id] = site({id: id});
    }
    return that.sites[id];
  };

  return that;
};

module.exports = sitesCollection;
