/*!
 * PikadayResponsive
 *
 * Copyright © 2014 Francesco Novy | MIT license | https://github.com/mydea/PikadayResponsive
 * Version 0.5
 */
(function($) {

	$.fn.pikaday = function(options) {
		var settings = $.extend({}, $.fn.pikaday.defaults, options);

		return this.each(function() {
			var elem, input, container, self, picker, isPikaday;
			elem = $(this);
			self = this;

			this.clearDate = function() {
				$(this).parent(".pikaday-container").children("input").each(function() {
					$(this).val("").trigger("change");
				});
			};

			this.gotoToday = function() {
				if(isPikaday) {
					$(this).siblings(".pikaday-display").val(moment().format(settings.displayFormat)).trigger("change");
					picker.gotoToday();
				} else {
					$(this).siblings(".pikaday-invisible").val(moment().format("YYYY-MM-DD")).trigger("change");
				}
			};

			// Check if is input-field
			if(elem.prop("tagName") !== "INPUT") {
				console.error("Pikaday can only be intitialized on input-fields! Tried to initialized on: ");
				console.error(elem);
				return;
			}

			// Original Input-Field is hidden and will contain the final output value
			elem.attr("type", "hidden");
			// Wrap the input in a container
			elem.wrap("<span class='pikaday-container'></span>");
			container = elem.parent(".pikaday-container");

			// Check if a native datepicker or pikaday should be displayed
			// Native datepicker is displayed if touch and HTML5 input type date is supported
			if(!settings.forcePikaday && (settings.hasTouch && settings.hasNativeDate)) {
				// Native datepicker
				isPikaday = false;

				// The following element will be read-only and click-through 
				// and will only be used to display the formatted date
				var display = $("<input type='text' readonly class='pikaday-display pikaday-display-native "+settings.classes+"' placeholder='"+settings.placeholder+"' />");
				container.append(display);

				// The actual input field
				input = $("<input type='date' class='pikaday-invisible' />");
				container.append(input);

				input.change(function() {
					// If is empty
					if($(this).val() === "") {
						display.removeClass("");
						elem.val("");
						input.val("");
						display.val("");
						elem.val("");
						elem.trigger("change");
						return;
					}

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
				isPikaday = true;
				var pikadayChanged = false;

				input = $("<input type='text' class='pikaday-display "+settings.classes+"' placeholder='"+settings.placeholder+"' />");
				container.append(input);
				picker = new Pikaday($.extend({}, settings.pikadayOptions, {
					field: $(input)[0],
					format: settings.displayFormat
					//setDefaultDate: elem.val() ? moment.unix(elem.val()).format("YYYY-MM-DD") :
				}));

				if(elem.val()) {
					picker.setMoment(moment.unix(elem.val()));
				}

				elem.on("change", function() {
					if(pikadayChanged) {
						pikadayChanged = false;
						return;
					}
					pikadayChanged = false;
					var val = $(this).val();
					if(!val) {
						return;
					}

					//input.val(moment.unix(val).format(settings.displayFormat));
					picker.setMoment(moment.unix(val));
				});

				input.change(function() {
					pikadayChanged = true;
					// If is empty
					if($(this).val() === "" || $(this).val() === 0) {
						input.removeClass("is-invalid");
						elem.val("");
						input.val("");
						elem.val("");
						elem.trigger("change");
						elem.addClass("is-empty");
						elem.parent().addClass("is-empty");
						return;
					}

					elem.removeClass("is-empty");
					elem.parent().removeClass("is-empty");

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

			// Add clear or today buttons
			if(settings.showClearButton) {
				var clearBtn = $("<button class='pikaday-clear-btn'></button>");
				clearBtn.html(settings.clearButtonText);
				container.append(clearBtn);
				input.trigger("change");
				clearBtn.click(function(e) {
					self.clearDate();
					e.preventDefault();
					return false;
				});
			}

			if(settings.showTodayButton) {
				var todayBtn = $("<button class='pikaday-today-btn' ></button>");
				todayBtn.html(settings.todayButtonText);
				container.append(todayBtn);
				todayBtn.click(function() {
					self.gotoToday();
					e.preventDefault();
					return false;
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
		placeholder: "",
		classes: "",
		pikadayOptions: {},
		showTodayButton: false,
		showClearButton: false,
		todayButtonText: "Today",
		clearButtonText: "Clear"
	};

}(jQuery));