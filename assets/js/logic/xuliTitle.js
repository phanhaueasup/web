xuliTitle=function(title,description){
    document.title=title
    $('head').append(`<meta name="${description}">`);
}
