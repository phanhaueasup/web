console.log(`I'm controller router`)




let pathname=window.location.pathname;
if(pathname=="/"||pathname.includes("/page/")){
  playlistPage(pathname)
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
