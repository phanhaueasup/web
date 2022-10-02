let categoryPage=function(pathname){
  $("#main").append(`
    <div class="container-fluid dashboard">
    <!--   heroes -->

        <!-- data   -->
       <div class="row" style="margin-top:100px;">
        <!--  list image -->
          <div class="col-lg-12"  style="background-color:#fff;">
              <div id="reload-lg">

              </div>
              <!-- Carousel wrapper -->
              <div
                class="carousel slide carousel-dark text-center"
                data-mdb-ride="carousel"
              >
                <!-- Inner -->
                <div class="carousel-inner py-4">
                  <!-- Single item -->
                  <div class="carousel-item active">
                    <div class="container">
                      <div class="row" id="carouse">


                      </div>
                    </div>
                  </div>
                </div>
                <!-- Inner -->
              </div>
              <!-- Carousel wrapper -->

           </div>
       </div>
    </div>
    `)

  let data;
  let innerData=[];
  let imagePerPagination=12;


  $.get(host+"/categoryConfig",(categories,status)=>{
    data=JSON.parse(categories)
    let type=pathname.split("/")[1];
    let page=pathname.split("/")[2];
    let name="";

    if(page==undefined) page=1;

    if(!parseInt(page)) name = page;

    console.log(name);

    innerData;

    if(name==""){//get list
      for(let i=0;i<data.length;i++){
        if(data[i]["type"]==type.toUpperCase()){
          innerData.push(data[i]);
        }
      }
    }

    console.log(innerData)
    for(let i=0;i<innerData.length;i++){
      $("#carouse").append(`
          <div class="col-lg-4">
            <div class="card">
              <a href="/${innerData[i]["href"]}">
                <img
                  src="${innerData[i]["thumbnail"]}"
                  class="card-img-top lazy"
                  alt="${innerData[i]["name"]}"
                />
                <div class="card-body">
                  <h5 class="card-title">${innerData[i]["name"]}</h5>
                </div>
              </a>
            </div>
          </div>
        `)
    }


  });

//random sidebar
  $.get(host+"/createForRandom",(rd,status)=>{
    randomPost=JSON.parse(rd);
    $("#sidebar-random").attr({href:`${randomPost[Math.floor(Math.random()*randomPost.length)]["href"]}`})
  })
}
