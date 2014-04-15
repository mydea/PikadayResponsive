Pikaday Responsive
=================

A responsive datepicker built on top of Pikaday. It shows the native datepicker on mobile devices and a nice JS-picker on desktop. It is realised as a jQuery-Plugin.

Pikaday is a nice and lean datepicker. For more details, see here: https://github.com/dbushell/Pikaday

##Why?
Pikaday is a great datepicker, and there are a lot of other datepickers out there that work really well. However, all of them fall short when used on a mobile device, where the native datepickers work best (because they have been specifically optimised for the mobile experience). Native Datepickers have some drawbacks, though:

* The output format cannot be customized
* While they work quite reliably on mobile devices, support on desktop devices is either non-existing (Firefox) or rather ugly (Chrome).

Because of this, I set out to create a "truly" responsive datepicker. 

##How it works
Basically, PikadayResponsive tries to detect if you are on a mobile device. For this, Modernizr is used (altough you can choose to use a different feature detection library if you want). It checks for touch and HTML5 input-type date support, and if one of them is missing, it simply displays a Pikaday-datepicker.

If, however, touch AND HTML5-date support are detected, it will instead display a native input type="date". Over this native input field, another, readonly and click-trough input field is displayed, in which a formatted date is displayed.

##Dependencies
PikadayResponsive needs the following components to work:

* jQuery
* Moment.js (for date formatting)
* Pikaday (https://github.com/dbushell/Pikaday)
* Modernizr or other feature detection library


##Usage
You will need to include the following scripts at the bottom of your site:


    <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="libs/moment-2.6.0.min.js"></script>
    <script src="pikaday/pikaday.js"></script>
    <script src="pikaday-responsive.jquery.js"></script>


And in the head-section

    <link rel="stylesheet" href="pikaday/pikaday.css">
    <script src="libs/modernizr-custom.js"></script>

As mentioned above, you can also use head.js or another feature detection library instead of Moderizr. If you want, you can also use the pikaday-package.js file, which includes Moment.js, Pikaday and PikadayResponsive (it is also minified):

    <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="pikaday/pikaday-package.js"></script>

The CSS-file contains the basic styles for the Pikaday-Datepicker. You can change/overwrite them as you wish.

To use it, call the following on an input field:

HTML:

    <input id="date" name="date" />

JS:

    $("#date").pikaday();

##Configuration
There are some options to configure PikadayResponsive. Following are the default-values:

    $("#date").pikaday({
        displayFormat: "DD.MM.YYYY",
        outputFormat: "unix",
        hasTouch: Modernizr.touch,
        hasNativeDate: Modernizr.inputtypes.date,
        forcePikaday: false,
        placeholder: ""
    });

###displayFormat
Determines how a date will be displayed in the input-field. Has to be a Moment.js format-string, like ```DD.MM.YYYY```

###outputFormat
Determines the output of the field. Basically, this is what you will get if you call ```$("#date").val()```or if you submit the form. Can be:

* ```unix```(default): The unix-timestamp (note that this is NOT the JavaScript-timestamp. If you want the JS-timestamp, you will need to multiply this with 1000)
* ```input```: This will output the input directly. E.g. for native date-field it will output the format "YYYY-MM-DD", for pikaday it will output the ```displayFormat```.
* If it is neither ```unix``` nor ```input```, it will be parsed as a Moment.js date-format string, e.g. ```Do MMM YYYY```

###placeholder
The placeholder for the input-field.

###hasTouch / hasNativeDate
You can overwrite this if you don't want to use Modernizr, or to overwrite it if needed. 

###forcePikaday
If set to true, Pikaday will always be displayed, no matter the device type.

##Author
PikadayResponsive has been created by Francesco Novy | http://www.fnovy.com | francesconovy@gmail.com | @_fnovy

##Credits
Credits go to David Bushell and Ramiro Rikkert for creating Pikaday.

* David Bushell http://dbushell.com @dbushell
* Ramiro Rikkert GitHub @RamRik

##Copyright
Copyright © 2014 Francesco Novy | MIT license