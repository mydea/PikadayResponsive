Pikaday Responsive
=================

A responsive datepicker built on top of Pikaday. It shows the native datepicker on mobile devices and a nice JS-picker on desktop. It is realised as a jQuery-Plugin.

Pikaday is a nice and lean datepicker. For more details, see here: https://github.com/dbushell/Pikaday

Try the demo: http://fnovy.com/projects/pikaday-responsive/

Try it on mobile, too:

![PikadayResponsive Demo](https://api.qrserver.com/v1/create-qr-code/?data=http%3A%2F%2Ffnovy.com%2Fprojects%2Fpikaday-responsive%2F&size=220x220&margin=0)

##Why?
Pikaday is a great datepicker, and there are a lot of other datepickers out there that work really well. However, all of them fall short when used on a mobile device, where the native datepickers work best (because they have been specifically optimised for the mobile experience). Native Datepickers have some drawbacks, though:

* The output format cannot be customized
* While they work quite reliably on mobile devices, support on desktop devices is either non-existing (Firefox) or their UX is rather terrible (Chrome).

PikadayResponsive tries to solve this problem.

##How it works
Basically, PikadayResponsive tries to detect if you are on a mobile device. For this, Modernizr is used (altough you can choose to use a different feature detection library if you want). It checks for touch and HTML5 input-type date support, and if one of them is missing, it simply displays a Pikaday-datepicker.

If, however, touch AND HTML5-date support are detected, it will instead display a native input type="date". Over this native input field, another, readonly and click-trough input field is displayed, in which a formatted date is displayed.

##Dependencies
PikadayResponsive needs the following components to work:

* jQuery
* Moment.js (for date formatting)
* Pikaday (https://github.com/dbushell/Pikaday)
* Modernizr or other feature detection library

You can also use pikaday-package.js, which includes Moment.js and Pikaday. It does not, however, contain jQuery and Modernizr - you have to add them manually.

##Usage
You can install PikadayResponsive via Bower:

    bower install pikaday-responsive --save

You will need to include the following scripts at the bottom of your site:

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="pikaday-responsive/pikaday-package.js"></script>

or alternatively:

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/momentjs/moment.js"></script>
    <script src="bower_components/pikaday/pikaday.js"></script>
    <script src="pikaday-responsive/pikaday-responsive.jquery.min.js"></script>


And in the head-section

    <link rel="stylesheet" href="pikaday-responsive/pikaday-package.css">
    <script src="bower_components/modernizr/modernizr.js"></script>

As mentioned above, you can also use head.js or another feature detection library instead of Moderizr.

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
        placeholder: "",
        classes: "",
        pikadayOptions: {},
        showTodayButton: false,
        showClearButton: false,
        todayButtonText: "Today",
        clearButtonText: "Clear"
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

###classes
A string with classes that should be added to the displayed input-fields

###pikadayOptions
An object with options that will be used to initialize Pikaday. Note that ```field``` and ```format``` will be overridden.

###hasTouch / hasNativeDate
You can overwrite this if you don't want to use Modernizr, or to overwrite it if needed. 

###forcePikaday
If set to true, Pikaday will always be displayed, no matter the device type.

###showTodayButton / showClearButton
If set to true, a button will be displayed which enables the user to clear the date or to set it to today.
If both are set to true, two buttons will be displayed. You can style them via CSS.

###todayButtonText / clearButtonText
You can change the text of the clear/today buttons. Defaults are ```Clear``` and ```Today```.

##Changelog
v0.5.3 (August 6th 2015)

* Update dependencies
* Check for windows as operating system to show Pikaday on touch-enabled laptops

v0.5.0 (February 5th 2015)

* Moved dependencies to bower
* Released pikaday-responsive on bower
* Improved demo
* Fixed bug with changing value after initialisation
* Added seperate .scss and .css files with updated pikaday-responsive styles
* Some other minor fixes / restructuring

##Author
PikadayResponsive has been created by Francesco Novy | http://www.fnovy.com | francesconovy@gmail.com | @_fnovy

##Credits
Credits go to David Bushell and Ramiro Rikkert for creating Pikaday.

* David Bushell http://dbushell.com @dbushell
* Ramiro Rikkert GitHub @RamRik

##Copyright
Copyright © 2015 Francesco Novy | MIT license