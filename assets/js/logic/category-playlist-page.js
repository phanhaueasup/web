let categoryPlaylistPage=function(pathname){
  //add page
  $("#main").append(`<section class="section dashboard">

     <div class="row">
        <div class="col-lg-12" style="background:#f3f3f3">
           <!--   playlist 1   -->
           <div class="col-lg-12" style="background:#f3f3f3">
              <div class="card" style="background:#f3f3f3">
                 <div class="card-body" style="background:#f3f3f3">
                    <div class="row" id="list-playlist" >

                    </div>
                 </div>
              </div>
           </div>
           <div class="col-lg-12">
              <div class="card">
                 <div class="card-body">
                   <ul class="pagination flex-wrap" style="margin-top:38px" id="playlist-pagination">

                   </ul>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </section>
  `)



  let page=pathname;

  let type=page.split('/')[1].toLowerCase();
  let name=page.split('/')[2].toLowerCase();
  let pageNumber=parseInt(page.split("/")[page.split('/').length-1]);
  if(!pageNumber) pageNumber=1;
  console.log(pageNumber)

  $.get(`${host}/${type}/${name}`,(data,status)=>{
    data=JSON.parse(data)
    console.log(data.length)
    for(let i=playlistPerPage*(pageNumber-1);i<data.length&&i<pageNumber*playlistPerPage;i++){
      $("#list-playlist").append(`
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top:10px;">
          <div class="card hover-card">
             <a href="/${data[i]["href"]}">
                <img src="${data[i]["thumbnail"]}" class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${data[i]["title"]}</h5>
                </div>
             </a>
          </div>
       </div>
      `)
    }

    //random sidebar
      $.get(host+"/createForRandom",(rd,status)=>{
        randomPost=JSON.parse(rd);
        $("#sidebar-random").attr({href:`${randomPost[Math.floor(Math.random()*randomPost.length)]["href"]}`})
      })

    // pagination
    for(let i=pageNumber-7;i<Math.ceil(data.length/playlistPerPage)&&i<pageNumber+7;i++){
      if(i+1>0){
        if(pageNumber==(i+1))
        $("#playlist-pagination").append(
          `  <li class="page-item active"><a class="page-link" href="/${type}/${name}/${i+1}">${i+1}</a></li>`
        )
        else
        $("#playlist-pagination").append(
          `  <li class="page-item"><a class="page-link" href="/${type}/${name}/${i+1}">${i+1}</a></li>`
        )
      }
    }
    $("#playlist-pagination").append(
      `  <li class="page-item disabled"><a class="page-link">...</a></li>`
    )
  })
}
