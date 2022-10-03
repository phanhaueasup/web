let playlistPage=function(pathname){

  // title
  if(pathname=="/") xuliTitle("stealimage.com - share beautiful, high-quality photos. The largest number of photos in the world.","Selection of the best photos, many genres and carefully updated online selection. censored, uncensored, beauty.");
  if(pathname.includes("/page/")){
    let pageNumber=pathname.split('/')[pathname.split("/").length-1];
    xuliTitle(`Photo collections – Page ${pageNumber} – stealimage.com`)
  }

  //heroes
  if(pathname=="/"){
    $("#main").append(`
      <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg" style="background-color:#f7f8f9; margin-bottom:25px;">
        <div class="col-lg-12 p-3 p-lg-5 pt-lg-3">
          <h1 class="display-4 fw-bold lh-1">We share high quality photos. fresh and beautiful girls to you</h1>
          <p class="lead">We search, curate, and share the best collections with you. Feel free to use the site, please bookmark and share with your friends</p>
        </div>
    </div>
    `)
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
             <div class="card-body ads-card">

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
  function hashCode (str){
    while(str.length<50) str+=" ";
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash%10000+10000;
}
  $.get(host+page,(data,status)=>{
    data=JSON.parse(data);
    console.log(data)
    for(let i=0;i<data.length;i++){
      let k=hashCode(data[i]["title"])
      if(!data[i]["date_added"]){
        data[i]["date_added"]="2022-10-02T19:02:28.446+00:00"
      }
      let view_number=Math.floor(k*Math.log10(Date.now()-Date.parse(data[i]["date_added"])))
      $("#list-playlist").append(`
        <div class="col-lg-6 col-md-6 col-sm-6" style="margin-top:10px;">
          <div class="card hover-card">
             <a href="/${data[i]["href"]}">
                <img src="${data[i]["thumbnail"]}" class="card-img-top" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${data[i]["title"]}</h5>

                   <!--<i class="bi bi-tags-fill"></i><br/>-->
                   <i class="bi bi-eye-fill" style="color:black"> ${view_number} views </i> &#160; &#160;
                   <i class="bi bi-calendar-event" style="color:black"> ${data[i]["date_added"].split("T")[0]}</i>
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
