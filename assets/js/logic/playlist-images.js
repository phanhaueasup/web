let playlistImagesPage=function(pathname){
  $("#playlist-images-container").show();
  
  let data;
  let imagePerPagination=24;
  //change_pagination_images
  change_data_images=function(k){
    let listImage=document.getElementsByClassName("gallery-item");
    for(let i=0;i<listImage.length;i++){//display none all
      document.getElementsByClassName("gallery-item")[i].getElementsByTagName("img")[0].style.display="none"
    }
    for(let i=k*imagePerPagination;i<(k+1)*imagePerPagination&&i<listImage.length;i++){
      document.getElementsByClassName("gallery-item")[i].getElementsByTagName("img")[0].style.display="block"
    }
    window.scrollTo(0, 0);
  }
  change_pagination_images=function(k){
    $(".images-pagination").empty();
    for(let i=0;i<Math.ceil(data["imgs"].length/imagePerPagination);i++){
      if(i==k){
        $(".images-pagination").append(`
          <li class="page-item active"><a class="page-link" href="#${i+1}" onclick=change_pagination_images(${i})>${i+1}</a></li>
        `)
      }
      else{
        $(".images-pagination").append(`
          <li class="page-item"><a class="page-link" href="#${i+1}" onclick=change_pagination_images(${i})>${i+1}</a></li>
        `)
      }
    }
    change_data_images(k);
  }

  $.get(host+pathname,(data1,status)=>{
    data=JSON.parse(data1)
    console.log(data)
    xuliTitle(data["title"],`${data["title"]} collection - stealimage.com`)
    // load thumbnail
    $("#playlist-thumbnail").attr({"src":data["thumbnail"],"alt":data["title"]})

    //title
    $("#playlist-title").append(`<h1 style="font-size:18px">${data["title"]}</h1>`)
      //load data
     for(let i=0;i<data["imgs"].length;i++){
      $("#gallery-container").append(`
        <a class="col-lg-2 col-md-6 col-sm-12 gallery-item" style="padding:1px" href="${data["imgs"][i]}">
          <img class="img-responsive lazy" width="100%" style="display:none;"src="${data["imgs"][i]}"/>
        </a>
      `)
      }
      for(let i=0;i<data["imgs"].length;i++){
        let url = document.getElementsByClassName('img-responsive')[i].src;
        $("<img/>").attr('src', url)
        .on('load', function() {
            let width=this.width;
            let height=this.height;
            document.getElementsByClassName('gallery-item')[i].setAttribute("data-pswp-width",width)
            document.getElementsByClassName('gallery-item')[i].setAttribute("data-pswp-height",height)
        });
      }


      // $("#gallery-container").append(`
      //   <a
      //     href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg"
      //     data-pswp-width="1875"
      //     data-pswp-height="2500"
      //     target="_blank"
      //   >
      //     <img
      //       src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg"
      //       alt=""
      //     />
      //   </a>
      // `)

      //create pagination
      $(".images-pagination").append(`
        <li class="page-item active"><a class="page-link" href="#${1}" onclick=change_pagination_images(0)>${1}</a></li>
      `)
      for(let i=1;i<Math.ceil(data["imgs"].length/imagePerPagination);i++){
        $(".images-pagination").append(`
          <li class="page-item"><a class="page-link" href="#${i+1}" onclick=change_pagination_images(${i})>${i+1}</a></li>
        `)
      }
      change_data_images(0)
      // reload_js("/assets/js/gallery.js")



  });

  $.get(host+"/createForRandom",(rd,status)=>{
    randomPost=JSON.parse(rd);
    //random sidebar
    $("#sidebar-random").attr({href:`${randomPost[Math.floor(Math.random()*randomPost.length)]["href"]}`})
    let showRandom=getRandom(randomPost,8)
      //load data
    for(let i=0;i<showRandom.length;i++){



      $("#make_random_post").append(`
        <div class="col-lg-3 hover-card-random" style="border-left:0.5px solid #ddd">
          <a href="/${showRandom[i].href}">
           <img style="margin-top: 10px" src="${showRandom[i].thumbnail}" class="card-img-bottom"><br/>
          </a>
        </div>
        `)
    }

  });

  function getRandom(arr, n) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
  }


  let editPlaylist=function(){
    $("#main").empty();
    $("#main").append(`
      <form action="/api-admin/edit-post/${data._id}" method="post">
        <p>Tên bài viết</p>
        <input style="width: 100%" type="text" name="title" value="${data.title}"><br><br><br>
        <p> link </p>
        <input style="width: 100%"  type="text" name="href" value="${data.href}"><br>
        <input type="submit" value="Sửa">
      </form>
      <a href="/api-admin/delete-post/${data._id}"">Xoá bài viết</a>
    `)
  }

}
