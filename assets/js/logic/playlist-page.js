let playlistPage=function(pathname){

  // title
  if(pathname=="/") xuliTitle("stealimage.com - share beautiful, high-quality photos. The largest number of photos in the world.","Selection of the best photos, many genres and carefully updated online selection. censored, uncensored, beauty.");
  if(pathname.includes("/page/")){
    let pageNumber=pathname.split('/')[pathname.split("/").length-1];
    xuliTitle(`Photo collections – Page ${pageNumber} – stealimage.com`)
  }

  //add page
  $("#main").append(`<section class="section dashboard">
     <div class="row">
        <div class="col-lg-8" style="background:#f7f8f9">
           <!--   playlist 1   -->
           <div class="col-lg-12" style="background:#f7f8f9">
              <div class="card" style="background:#f7f8f9">
                 <div class="card-body" style="background:#f7f8f9">
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
        <div class="col-lg-4 right-bar">
          <!--   welcome    -->
          <div class="card">
            <div class="card-body welcome solid-5px-top">
              <h5 class="card-title">Welcome</h5>
              <div class="welcome-card" id="welcome-card">
                <div class="textwidget"><p>All resources come from the Internet</p>
                  <p>This is a quality collections, content is handpicked.</p>
                  <p>We don't use annoy pop up ads.</p>
                  <hr>
                  <p>We are developing, please bookmark and visit to support.</p>
                  <p>Buy Origin = visit vendor site.</p>
                  <p>Thanks.</p>
                </div>
              </div>
            </div>
          </div>
           <!--   news    -->
           <div class="card">
             <div class="card-body news solid-5px-top">
               <h5 class="card-title">Recent updated</h5>

               <div class="activity" id="statistic">


               </div>

             </div>
           </div>
           <!--   ads    -->
           <div class="card">
             <div class="card-body ads">
               <img src="https://tpc.googlesyndication.com/simgad/13177358407532545586"/>

             </div>
           </div>

        </div>
     </div>
  </section>
`)



  let page=pathname;
  if(page=="/"){
    page="/page/1"
  }
  $.get(host+page,(data,status)=>{
    data=JSON.parse(data);
    console.log(data)
    for(let i=0;i<data.length;i++){
      $("#list-playlist").append(`
        <div class="col-lg-6 col-md-6 col-sm-6" style="margin-top:10px;">
          <div class="card hover-card">
             <a href="/${data[i]["href"]}">
                <img src="${data[i]["thumbnail"]}" class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${data[i]["title"]}</h5>
                   <i class="bi bi-tags-fill"></i> <a href="" rel="tag">Big tits,</a> <a href="" rel="tag">Big tits,</a> <a href="" rel="tag">Big tits</a><br/>
                   <i class="bi bi-eye-fill"></i> 1234 views <br/>
                   <i class="bi bi-calendar-event"></i> 15/06/2022
                </div>
             </a>
          </div>
       </div>
      `)
    }
  })

  $.get(host+"/createForRandom",(rd,status)=>{
    randomPost=JSON.parse(rd);
    let currentPage=parseInt(pathname.split('page/')[1])
    if (!currentPage)
      currentPage=1;
    for(let i=0;i<Math.ceil(randomPost.length/12);i++){
      if(currentPage==(i+1))
      $("#playlist-pagination").append(
        `  <li class="page-item active"><a class="page-link" href="/page/${i+1}">${i+1}</a></li>`
      )
      else
      $("#playlist-pagination").append(
        `  <li class="page-item"><a class="page-link" href="/page/${i+1}">${i+1}</a></li>`
      )
    }
    $("#sidebar-random").attr({href:`${randomPost[Math.floor(Math.random()*randomPost.length)]["href"]}`})
  });


  $.get(host+"/statistic",(statisticRaw)=>{
    statisticRaw=JSON.parse(statisticRaw);
    let statistic=statisticRaw.reverse();
    let arrColor=["success","danger","info","info","warning","muted"]
    for(let i=0;i<statistic.length-1;i++){
      if(statistic[i]["number_playlist"]>statistic[i+1]["number_playlist"]){
        const d = new Date(statistic[i]["date_create"]);
        var today = new Date();

        var diffMs = (today - d);
        var diffDays = Math.floor(diffMs / 86400000); // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        let number_playlist_added=statistic[i]["number_playlist"]-statistic[i+1]["number_playlist"]
        if(diffDays>0){
          $("#statistic").append(` <div class="activity-item d-flex">
             <div class="activite-label">${diffDays} days</div>
             <i class="bi bi-circle-fill activity-badge text-${arrColor[i%arrColor.length]} align-self-start"></i>
             <div class="activity-content">
               Added ${number_playlist_added} albums to website
             </div>
           </div>`)
        }else if(diffHrs>0){
          $("#statistic").append(` <div class="activity-item d-flex">
             <div class="activite-label">${diffHrs} hours</div>
             <i class="bi bi-circle-fill activity-badge text-${arrColor[i%arrColor.length]} align-self-start"></i>
             <div class="activity-content">
               Added ${number_playlist_added} albums to website
             </div>
           </div>`)
        }else if(diffMins>0){
          $("#statistic").append(` <div class="activity-item d-flex">
             <div class="activite-label">${diffMins} minutes</div>
             <i class="bi bi-circle-fill activity-badge text-${arrColor[i%arrColor.length]} align-self-start"></i>
             <div class="activity-content">
               Added ${number_playlist_added} albums to website
             </div>
           </div>`)
        }
      }
    }
  })
}
