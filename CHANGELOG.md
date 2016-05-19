# Changelog

v0.6.9
* Fix bug with incorrect detection of touch events caused by update to Modernizr 3.x

v0.6.8
* Improve structure of repo (thanks to @olets)
* Reformat whitespace

v0.6.7
* Fix bug which set wrong date format on pikaday fields

v0.6.6

* Fix a bug with dayOffset which appeared when setting a date manually via keyboard, where the dayOffset was added twice.

v0.6.5

* Add dayOffset option to work with timezones

v0.6.4

* Update Pikaday dependency to 1.4.0

v0.6.3

* Add optional second parameter `format` to `setDate()`

v0.6.2

* Initial values of inputs should be set when initialising

v0.6.1

* Change jQuery dependency to use v1.11.3 or greater

v0.6.0

* Complete re-write of the library
* Remove integrated today/clear buttons
* Make the function return a dateObject to work with
* Add `change-date` event to input-field which receives the dateObject

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