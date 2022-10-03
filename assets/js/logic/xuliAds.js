setTimeout(()=>{
  $(".ads-card").eq(0).append(`
    <script type="text/javascript">
        atOptions = {
          'key' : '49f5d0a0cba27e3349bde680da73453e',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
        document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.highperformancedisplayformat.com/49f5d0a0cba27e3349bde680da73453e/invoke.js"></scr' + 'ipt>');
      </script>
  `)
},10000)
