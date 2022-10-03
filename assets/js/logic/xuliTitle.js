xuliTitle=function(pathname){
  if(pathname=="/"){
    document.title="stealimage.com - share beautiful, high-quality photos. The largest number of photos in the world."
    $('head').append(`<meta name="Selection of the best photos, many genres and carefully updated online selection. censored, uncensored, beauty.">`);
  }else if(pathname=="/studio"||
          pathname=="/model"||
          pathname=="/category"||
          pathname=="/studio/"||
          pathname=="/model/"||
          pathname=="/category/"){
          categoryPage(pathname)
  }else if(pathname.includes("/studio")||
          pathname.includes("/model")||
          pathname.includes("/category")){
          categoryPlaylistPage(pathname)

  }else{
    playlistImagesPage(pathname)
  }
}
