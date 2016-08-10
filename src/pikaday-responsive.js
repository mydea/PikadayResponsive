(function(root, factory) {
  if (typeof define === 'function') {
    define('pikaday-responsive', ['exports'], function(exports) {
      return (exports['default'] = factory());
    });
  } else if (typeof module === 'object') {
    module.exports = factory();
  } else {
    root.pikadayResponsive = factory();
  }
}(this, function() {

  // Check if all dependencies are loaded
  if (!moment) {
    console.error("You need to load moment.js in order to use pikaday-responsive.");
    return;
  }

  if (!jQuery) {
    console.error("You need to load jQuery in order to use pikaday-responsive.");
    return;
  }

  if (!Pikaday) {
    console.error("You need to load pikaday in order to use pikaday-responsive.");
    return;
  }

  var defaultOptions = {
    format: "YYYY-MM-DD",
    outputFormat: "YYYY-MM-DD",
    checkIfNativeDate: function() {
      return Modernizr.inputtypes.date && (Modernizr.touchevents && navigator.appVersion.indexOf("Win") === -1);
    },
    classes: "",
    placeholder: "Select a date",
    pikadayOptions: {},
    dayOffset: 0
  };

  return function(el, options) {
    var $el = $(el);
    var settings = $.extend({}, defaultOptions, options);

    // The container element for the input
    var $container;
    // The actual input field
    var $input;
    // The display input field
    var $display;
    // The actual output value
    var obj = {
      pikaday: null,
      value: null,
      date: null,
      element: $el[0]
    };

    // Check if first param is <input>
    if (!$el.length || $el[0].tagName !== "INPUT") {
      console.error("pikadayResponsive expects an input-field as its first element.", $el[0]);
      return false;
    }

    // The original input field is made hidden. This field will contain the actual value.
    $el.attr("type", "hidden");
    // Wrap the input in a container
    $el.wrap("<span class='pikaday__container'></span>");
    $container = $el.parent(".pikaday__container");

    // If the original input has an ID, use it to generate IDs for the generated display inputs
    var originalId = $el.attr('id');

    if (settings.checkIfNativeDate()) {
      // Use native date picker
      $input = $("<input type='date' class='pikaday__invisible' placeholder='" + settings.placeholder + "'/>");
      if (originalId) {
        $input.attr('id', originalId + '-input');
      }
      $container.append($input);

      $display = $("<input type='text' readonly='readonly' class='pikaday__display pikaday__display--native " + settings.classes + "' placeholder='" + settings.placeholder + "' />");
      $container.append($display);

      $input.on("change", function() {
        var val = $(this).val();
        $display.removeClass("is-empty");

        if (!val) {
          obj.date = null;
          obj.value = null;
          $display.addClass("is-empty");
        } else {
          obj.date = moment(val, "YYYY-MM-DD");
          obj.value = obj.date.format(settings.outputFormat);
        }

        // Convert numbers (unix timestamp) to ints
        if (obj.value * 1 === parseInt(obj.value, 10)) {
          obj.value *= 1;
        }
        $el.val(obj.value);
        if (obj.date) {
          $display.val(obj.date.format(settings.format));
        } else {
          $display.val(null);
        }


        $el.trigger("change");
        $el.trigger("change-date", [obj]);
      });

    } else {
      // Use Pikaday
      $input = $("<input type='text' class='pikaday__display pikaday__display--pikaday " + settings.classes + "' placeholder='" + settings.placeholder + "' />");
      if (originalId) {
        $input.attr('id', originalId + '-input');
      }
      $container.append($input);

      var hasSelected = false;
      var selectTimer = null;

      obj.pikaday = new Pikaday($.extend({}, settings.pikadayOptions, {
        field: $input[0],
        format: settings.format,
      }));

      $input.on("change", function() {
        if (hasSelected) {
          return;
        }

        hasSelected = true;
        selectTimer = window.setTimeout(function() {
          hasSelected = false;
        }, 10);

        var val = $(this).val();
        $input.removeClass("is-empty");

        if (!val) {
          obj.date = null;
          obj.value = null;
          $input.addClass("is-empty")
        } else {
          obj.date = moment(val, settings.format);
          // Add an optional day offset to account for time zones
          obj.date.add(settings.dayOffset, "day");

          obj.value = obj.date.format(settings.outputFormat);
          $(this).val(obj.date.format(settings.format));
        }

        // Convert numbers (unix timestamp) to ints
        if (obj.value * 1 === parseInt(obj.value, 10)) {
          obj.value *= 1;
        }
        $el.val(obj.value);

        // Wait 1ms in order to circumvent bug where events weren't triggered
        setTimeout(function() {
          $el.trigger("change");
          $el.trigger("change-date", [obj]);
        }, 1);
      });
    }

    /**
     * This function sets the date to a specific value.
     *
     * @method setDate
     * @param date It is preferred to give a moment-object as param, but vanilla Dates or strings in the outputFormat work too
     * @returns Object The moment-date that was used to set the date
     */
    var setDate = function(date, format) {
      // If date is null, reset the field
      if (!date) {
        if (obj.pikaday) {
          obj.pikaday.setDate(null);
        } else {
          $input.val(null);
          $input.trigger("change");
        }

        return null;
      }

      // Format date into moment-date
      if (typeof date === "object" && typeof date.format !== "function") {
        date = moment(date);
      }
      if (typeof date === "string") {
        if (typeof format === "undefined" || !format) {
          format = settings.outputFormat;
        }
        date = moment(date, format);
      }
      if (typeof date === "number") {
        date = moment(date);
      }

      if (obj.pikaday) {
        obj.pikaday.setMoment(date);
      } else {
        $input.val(date.format("YYYY-MM-DD"));
        $input.trigger("change");
      }

      return date;
    };

    if ($el.val()) {
      setDate($el.val());
    }

    obj.setDate = setDate;

    return obj;
  }
}));
