/*!
 * PikadayResponsive
 *
 * Copyright © 2014 Francesco Novy | MIT license | https://github.com/mydea/PikadayResponsive
 * Version 0.1
 */
(function($) {

	$.fn.pikaday = function(options) {

		var settings = $.extend({}, $.fn.pikaday.defaults, options);

		return this.each(function() {
			var elem = $(this);
			// Original Input-Field is hidden and will contain the final output value
			elem.attr("type", "hidden");
			// Wrap the input in a container
			elem.wrap("<span class='pikaday-container'></span>");
			var container = elem.parent(".pikaday-container");

			// Check if a native datepicker or pikaday should be displayed
			// Native datepicker is displayed if touch and HTML5 input type date is supported
			if(!settings.forcePikaday && (settings.hasTouch && settings.hasNativeDate)) {
				// Native datepicker
				
				// The following element will be read-only and click-through 
				// and will only be used to display the formatted date
				var display = $("<input type='text' readonly class='pikaday-display pikaday-display-native' placeholder='"+settings.placeholder+"' />");
				container.append(display);
				
				// The actual input field
				var input = $("<input type='date' class='pikaday-invisible' placeholder='"+settings.placeholder+"' />")
				container.append(input);
				
				input.change(function() {
					var date = moment($(this).val(), "YYYY-MM-DD");
					var val;
					
					if (!date.isValid() || date.unix() < 0) {
						// Date is not valid
						display.addClass("is-invalid");
						input.val("");
						display.val("");
						elem.val("");
					} else {
						// Date is valid
						display.removeClass("is-invalid");
						
						display.val(date.format(settings.displayFormat));
						
						// Output format can be unix, input or a Moment.js string
						if(settings.outputFormat === "unix") {
							val = date.unix();
						} else if(settings.outputFormat === "input") {
							val = $(this).val();
						} else {
							val = date.format(settings.outputFormat);
						}
						elem.val(val);
					}
					
					elem.trigger("change");
				});
			} else {
				// pikaday
				var input = $("<input type='text' class='pikaday-display' placeholder='"+settings.placeholder+"' />")
				container.append(input);
				var picker = new Pikaday({
					field: $(input)[0],
					format: settings.displayFormat,
				});
				
				input.change(function() {
					var date = moment($(this).val(), settings.displayFormat);
					var val;
					
					if (!date.isValid() || date.unix() < 0) {
						// Date is not valid
						input.addClass("is-invalid");
						picker.gotoToday();
						input.val("");
						elem.val("");
					} else {
						// Date is valid
						input.removeClass("is-invalid");
						
						// Output format can be unix, input or a Moment.js string
						if(settings.outputFormat === "unix") {
							val = date.unix();
						} else if(settings.outputFormat === "input") {
							val = $(this).val();
						} else {
							val = date.format(settings.outputFormat);
						}
						elem.val(val);
					}
					
					elem.trigger("change");
				});
			}

		});

	};

	$.fn.pikaday.defaults = {
		displayFormat: "DD.MM.YYYY",
		outputFormat: "unix",
		hasTouch: Modernizr.touch,
		hasNativeDate: Modernizr.inputtypes.date,
		forcePikaday: false,
		placeholder: ""
	};

}(jQuery));