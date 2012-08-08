var context = describe;

var sitescollection = require('../../lib/sitescollection');

describe("sites", function() {

  var sites;
  beforeEach( function() {
    sites = sitescollection();
  });

  describe("initialisation", function() {
    it("should habe an empty sites list", function() {
      expect(sites.sites).toEqual({});
    });
  });

  describe("#count", function() {
    context("with no sites", function() {
      it("shoud return 0", function() {
        delete(sites.sites);
        expect(sites.count()).toEqual(0);
      });
    });

    context("with 2 sites present", function() {
      it("shoud return 2", function() {
        sites.sites = { "bla":"blubb", "brabl":"bleat" }
        expect(sites.count()).toEqual(2);
      });
    });
  });

  describe("#findSite", function() {
    context("the searched site is present", function() {
      it("should return the site", function() {
        site = {id: "siteid", name: "blaaa"}
        sites.sites[site.id] = site;
        expect(sites.findSite(site.id)).toEqual(site);
      });
    });
    context("the searched site not present", function() {
      it("should not find the site and return false", function() {
        sites.sites = {};
        expect(sites.findSite("siteId")).toBeFalsy();
      });
    });
  });


  describe("#addSite", function() {
    context("the site is already present", function() {
      it("should return false", function() {
        site = { id: "mysiteid", name: "myname" };
        sites.sites[site.id] = site;
        expect(sites.addSite(site)).toBeFalsy();
      });
    });
    context("the site is NOT already present", function() {
      it("should return true", function() {
        site = { id: "mysiteid", name: "myname" };
        sites.sites = {};
        expect(sites.addSite(site)).toEqual(true);
      });
    });
  });

  describe("#findOrCreateById", function() {
    it("should return the site", function() {
      mysite = { id: "bla" }
      expect(sites.findOrCreateById("bla").id).toEqual(mysite.id);
    });
  });

  describe("the module", function() {
    it("should export a function", function() {
      expect(typeof(sitescollection)).toEqual("function")
    });
    it("should instanciate an object", function() {
      expect(typeof(sitescollection())).toEqual("object")
    });
  });
});
