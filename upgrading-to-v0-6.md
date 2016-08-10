# Updating to 0.6.0
PikadayResponsive was completely re-written for v0.6.0 and the API changed quite a bit for this version. If you want to update from < 0.6.0 to >= 0.6.0, follow these steps:

* Instead of `$("#my-element").pikaday()`, you have to instantiate it with `var dateInstance = pikadayResponsive(document.getElementById("my-element"), options);`
* The available options changed a bit. See the *Configuration* section for details about the available options. 
* The *clear* and *today* buttons have been removed. If you need this functionality, it is easy to implement it yourself with the new `dateInstance.setDate()` function.
* The `displayFormat` option has been renamed to `format`. Both `format` and `outputFormat` now only take Moment.js-formats as parameters. If you want to use an UNIX-timestamp, you cans imply use `X`.

It is not possible anymore to instantiate pikadayResponsive for a collection. You have to do this in a loop:

```js
$elements = $(".input");
$elements.each(function() {
    pikadayResponsive($(this));
});
```
