/*
 * ========================================================================
 * KFC 1.0
 * A KFC is a css keyframes controller that is dependent on jquery.keyframes.js.
 * YILING CHEN.
 * Copyright 2022, MIT License.
 * How to use it:
 * see README.md
 * ========================================================================
 */
(function ($, window, keyframe) {
  "use strict";
  $.kfc = function (el, options, callback) {
    var self = this; // access to jQuery and DOM versions of element
    self.$win = $(window);
    if (typeof el == 'string') {
      self.$el = el;
      self.$options = $.extend([], $.kfc.defaultOptions, options);
      self.callback = callback;
    } else if (typeof el == 'object') {
      self.$el = null;
      self.options = $.extend([], $.kfc.defaultOptions, el);
      self.callback = options;
    };

    self.keyframesDefine = function (options) {
      return keyframe.define(options);
    };

    self.playKeyframes = function () {
      self.options.forEach(function (c) {
        if(c.name) $(c.identify + c.name).playKeyframe(c);
        if(!c.name && c.shorthand) $('#' + c.shorthand.split(' ')).playKeyframe(c.shorthand);
        c.callback && c.callback();
      })
    };

    self.keyframesDefine(self.options);

    if (self.callback) {
      self.playKeyframes(self.options);
      self.callback();
      return;
    }
    self.playKeyframes(self.options);

  };
  $.kfc.defaultOptions = [];
  $.fn.kfc = function (options, callback) {
    return this.each(function () {
      new $.kfc(this, options, callback);
    });
  };
})(jQuery, window, jQuery.keyframe)