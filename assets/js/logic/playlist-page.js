let playlistPage=function(pathname){

  // title
  if(pathname=="/") xuliTitle("stealimage.com - share beautiful, high-quality photos. The largest number of photos in the world.","Selection of the best photos, many genres and carefully updated online selection. censored, uncensored, beauty.");
  if(pathname.includes("/page/")){
    let pageNumber=pathname.split('/')[pathname.split("/").length-1];
    xuliTitle(`Photo collections – Page ${pageNumber} – stealimage.com`)
  }
  $("#playlist-page-container").show()


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
