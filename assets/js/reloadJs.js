let reload_js = function (src) {
  console.log("reloading")
  $('script[src="' + src + '"]').remove();
  $('<script>').attr({'src': src,"type":"module"}).appendTo('html');
}
