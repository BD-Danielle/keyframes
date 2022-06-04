"use strict";

/*
 *
 *
 */
(function ($, window, document, undefined) {
  "use strict";

  $.lining = function (el, options) {
    var base = this; // Access to jQuery and DOM versions of element

    base.$el = $(el); // Cached objects

    base.$win = $(window);
    base.$doc = $(document);
    base.win = window;
    base.$body = $("html, body");
    base.clickNo = 0; // Initialize

    base.init = function () {
      console.log('options: ', options); // undefined
      base.options = $.extend({}, $.lining.defaultOptions, options);
      base.$field = $(base.options.field);
      base.$btn = $(base.options.btn);
      base.$plsFocus = $(base.options.plsFocus);
      base.$cloudL = $(base.options.cloudL);
      base.$cloudR = $(base.options.cloudR);
      base.$blur = $(base.options.blur);
      base.$clear = $(base.options.clear);
      base.$silver = $(base.options.silver);
    }; // Use jQuery fn to prevent JS loaded wrong message


    base.getMultiScripts = function (jsArray, path) {
      var _jsArray = $.map(jsArray, function (js) {
        // console.log(jsArray);
        return $.getScript((path || "") + js);
      });

      return $.when.apply($, _jsArray);
    }; // Third party module import


    base.importJS = function (jsOptions, callback) {
      if (jsOptions.files.length > 0) {
        $.getScript(jsOptions.path + jsOptions.files[0]).done(function () {
          jsOptions.files = jsOptions.files.slice(1);
          base.importJS(jsOptions, callback);
        });
      } else {
        callback();
      }
    }; // Detect obj's offsetTop


    base.offsetTop = function (obj) {
      if (obj.length) return obj.offset().top;
    }; // Make objs keyframe


    base.keyframe = function () {
      return $.keyframe.define([{
        name: "plsFocus",
        from: {
          // opacity: 0,
          visibility: "visible"
        },
        to: {
          // opacity: 1,
          visibility: "hidden"
        }
      }, {
        name: "cloudL",
        from: {
          opacity: 1,
          left: 0
        },
        to: {
          opacity: 0,
          left: "-390px"
        }
      }, {
        name: "cloudR",
        from: {
          opacity: 1,
          right: 0
        },
        to: {
          opacity: 0,
          right: "-420px"
        }
      }, {
        name: "blur",
        from: {
          opacity: 1,
          visibility: "visible"
        },
        to: {
          opacity: 0,
          visibility: "hidden"
        }
      }, {
        name: "clear",
        from: {
          opacity: 0,
          visibility: "hidden"
        },
        to: {
          opacity: 1,
          visibility: "visible"
        }
      }, {
        name: "silver",
        from: {
          // display: "none",
          height: 0,
          padding: 0
        },
        to: {
          // display: "block",
          height: "100%",
          padding: "10px 0"
        }
      }]);
    };

    base.comes = function (selector) {
      selector.playKeyframe([{
        name: "plsFocus",
        duration: "1s",
        timingFunction: "ease",
        delay: "0s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
      base.cloudL(base.$cloudL);
      base.cloudR(base.$cloudR);
      base.blur(base.$blur);
      base.clear(base.$clear);
      base.silver(base.$silver);
    };

    base.cloudL = function (selector) {
      selector.playKeyframe([{
        name: "cloudL",
        duration: "3s",
        timingFunction: "ease",
        delay: "1.1s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
    };

    base.cloudR = function (selector) {
      selector.playKeyframe([{
        name: "cloudR",
        duration: "3s",
        timingFunction: "ease",
        delay: "1.1s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
    };

    base.blur = function (selector) {
      selector.playKeyframe([{
        name: "blur",
        duration: "1.6s",
        timingFunction: "ease",
        delay: "1.1s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
    };

    base.clear = function (selector) {
      selector.playKeyframe([{
        name: "clear",
        duration: "1.6s",
        timingFunction: "ease",
        delay: "1.1s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
    };

    base.silver = function (selector) {
      selector.playKeyframe([{
        name: "silver",
        duration: "1.2s",
        timingFunction: "linear",
        delay: "2.5s",
        iterationCount: 1 // direction: "normal",
        // fillMode: "forwards",
        // complete: function(){ },

      }]);
    }; // Run initializer


    base.init();
    base.$win.on("load", function () {
      base.keyframe();
      // console.log("base.$el: ", base.$el); //base.$el:  init [body.PC, context: body.PC]
      // console.log("base.options: ", base.options);
    });
    base.$doc.on('click', '#see', function (e) {
      e.preventDefault();
      $(this).remove();
      base.comes(base.$plsFocus);
    });
  };

  $.lining.defaultOptions = {
    field: "#lining",
    blur: "#blur",
    clear: "#clear",
    cloudL: "#cloudL",
    cloudR: "#cloudR",
    plsFocus: "#plsFocus",
    silver: "#silver",
    btn: "#see"
  };

  $.fn.lining = function (options) {
    return this.each(function () {
      new $.lining(this, options);
    });
  };
})(jQuery, window, document);