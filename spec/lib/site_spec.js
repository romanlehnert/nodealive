var context = describe;

var site = require('../../lib/site.js');

describe("site", function() {

  var mysite;
  beforeEach( function() {
    mysite = site();
  });


  describe("initialisation", function() {

    it("should return an object", function() {
      mysite = site();
      expect(typeof(mysite)).toEqual("object");
    });

    it("should set the default values for the site object", function() {
      expect(mysite.sessions).toEqual({});
      expect(mysite.id).toBeUndefined();
      expect(mysite.callbackUrl).toBeUndefined();
    });

    it("should set the passed id", function() {
      mysite = site( {id: "palabea"});
      expect(mysite.id).toEqual("palabea");
    });

    it("should set the passed callbackUrl", function() {
      mysite = site({callbackUrl: "bla"});
      expect(mysite.callbackUrl).toEqual("bla");
    });

  });

  describe("#sessionsCount", function() {
    
    it("should return the elements count of the sessions hash", function() {
      mysite.sessions = {};
      expect(mysite.sessionsCount()).toEqual(0);

      mysite.sessions = {a: "test", b: "test"}
      expect(mysite.sessionsCount()).toEqual(2);
    });

  });

  describe("#addSession", function(){

    context("given a valid session with an id property", function() {
      it("should add the given objet to the sessions hash", function() {
        expect(mysite.addSession({id: "palabea"})).toBeTruthy();
      });
    });
    
    context("given an invalid session with no id poperty", function() {
      it("should raise an error", function() {
        expect(function(){mysite.addSession({})}).toThrow("Argument Error");
      });
    });

  });

  describe("#findSession", function() {

    context("the searched session present", function() {
      it("should return the session", function() {
        mysession = {id: "blubb", name: "blaaa"}
        mysite.sessions["blubb"] = mysession;
        expect(mysite.findSession("blubb")).toEqual(mysession);
      });
    });

    context("the searched session NOT present", function() {
      it("should retun undefined", function() {
        mysite.sessions = {};
        mysession = mysite.findSession("asd");
        expect(typeof(mysession)).toEqual("undefined");
      });
    });
  });

  describe("#findOrCreateSessionById", function() {
    context("when a session with the given id exists", function() {
      it("should return the session", function() {
        mysession = {id: "blubb", name: "blaaa"};
        mysite.sessions["blubb"] = mysession;
        expect(mysite.findOrCreateSessionById("blubb")).toEqual(mysession);
      });
    });
    context("when no session with the given id exists", function() {
      it("should create the session, store it, and return it", function() {
        mysite.sessions = {};
        returnedSession = mysite.findOrCreateSessionById("blubb");
        expect(returnedSession.id).toEqual("blubb");
      });
    });
  });

});
