var mainViews = ['about','filmography','performances'];

class Film {
  constructor(name, date, runtime, format, description, screenings, video, laurels, images)
  {
    this.name = name;
    this.date = date;
    this.runtime = runtime;
    this.format = format;
    this.description = description;
    this.screenings = screenings;
    this.video = video;
    this.laurels = laurels;
    this.images = images;
  }
}

class Performance {
  constructor(name, date, desc, video)
  {
    this.name = name;
    this.date = date;
    this.desc = desc;
    this.video = video;
  }
}

function showView(viewID)
{
   document.getElementById(viewID).style.display = 'inline';
   document.getElementById(viewID + "A").classList.add("active");
   for( let i = 0; i < mainViews.length; i++ )
   {
     if( mainViews[i] != viewID )
     {
       document.getElementById(mainViews[i] + "A").classList.remove("active");
       document.getElementById(mainViews[i]).style.display = 'none';
     }
   }
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openNav() {
  document.getElementById("mySideNav").style.width = "250px";
  document.getElementById("filmMain").style.marginLeft = "260px";
}

function closeNav() {
  document.getElementById("mySideNav").style.width = "0px";
  document.getElementById("filmMain").style.marginLeft = "10px";
}

function showFilmography(title)
{
  showFilm(title);
  showView("filmography");
}

function createFilmCard(title)
{
  film = filmMap.get(title);
  let filmCardDef = document.createElement("div");
  filmCardDef.style = "display: flex;justify-content: center;";
  //filmCardDef.onClick
  filmCardDef.innerHTML = filmCardDef.innerHTML + `
  <div class="card">
    <a href="#" onclick="showFilmography('` + title + `')">
      <img class="cardImg" src=` + film.images[0] + `>
      <div class="cardMiddle"> 
        <div class="cardText">` + title + `</div>
      </div>
    </a>
  </div>`;
  return filmCardDef;
}

function buildFilmCards()
{
    let filmCards = document.createElement("div");
    filmCards.style = "display: flex;justify-content: center;flex-wrap: wrap;";
    filmCards.innerHTML = "";

    let maxFilms = 6;
    let filmCount = 0;
    for (let [key, value] of filmMap.entries())
    {
      if( filmCount < maxFilms)
      {
        let filmCard = createFilmCard(key);
        filmCards.appendChild(filmCard);
      }
      filmCount++;
    }
    
    let cardDiv = document.getElementById("filmCards");
    cardDiv.innerHTML = '';
    cardDiv.appendChild(filmCards);
    cardDiv.innerHTML = cardDiv.innerHTML + `<br></div>`;
}

  function showFilm(title)
  {
    film = filmMap.get(title);
    let screenWidth = document.documentElement.clientWidth;
    let filmContainerDef = document.createElement("div");
    filmContainerDef.style = "min-width: 25vw;";
    let titleContainer = document.createElement("h4");
    titleContainer.innerHTML = `<b><i>` + film.name + `</i></b>`;
    filmContainerDef.appendChild(titleContainer);

    if( film.video != null && film.video.length == 3 )
    {
      let divStyle = "";
      let vidPos = "position:relative;";
      let vidDim = "width:" + film.video[1] + "px;height:" + film.video[2] + "px;";
      if( screenWidth < 1024 )
      {
        vidDim = "width:100%;height:100%;";
        divStyle = "padding: 75% 0 0 0;position:relative;";
        vidPos = "position:absolute;";
      }
      else if( film.video[1]  > 400)
      {
        let descWidth = film.video[1];
        filmContainerDef.style = "min-width: " + descWidth + "px;";
      }
        let videoContainer = document.createElement("div");
        videoContainer.innerHTML = videoContainer.innerHTML + `<div style="`+ divStyle +`"><iframe src="` + film.video[0] + `" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="`+ vidPos + `top:0;left:0;` + vidDim +  `" title="Twin City Twist (2023)"></iframe></div><br>`;
        filmContainerDef.appendChild(videoContainer);
    }  

    filmContainerDef.innerHTML = filmContainerDef.innerHTML + `
      <div class="film" style="font-size: 90%;max-width: 1000px;">
        <p>` + film.description + `</p>
        <br>
        <h5><i>` + film.date + ` - ` + film.runtime + ` mins - ` + film.format + `</i></h5></div>`;

    let filmContainerVidAndStills = document.createElement("div");                                                                                                     
    let imgScale = "width:25%;height:25%";
    if( screenWidth < 700 || film.images.length <= 4)
    {
      imgScale = "width:50%;height:50%;"
    }
    for(let i = 0; i < film.images.length; i++ )
    {
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<img src="` + film.images[i] + `" style='` + imgScale + `object-fit: contain'>`;
    } 

    if( film.laurels != null )
    {
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<p>`;
      for(let i = 0; i < film.laurels.length; i++)
      {
        filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<img src="` + film.laurels[i] + `" style='width: 25vw;max-width:150px;object-fit: contain'>`;
      }
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `</p>`;
    }
    else
    {
      filmContainerVidAndStills.innerHTML =  filmContainerVidAndStills.innerHTML + `<br>`;
    }
    filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `</div>`;

    let filmScreenings = document.createElement("div");
    if( film.screenings != null )
    {
      filmScreenings.innerHTML = filmScreenings.innerHTML +  `<br><h5><b>Screenings:</b></h5>`;

      var screeningTable = document.createElement("TABLE");
      for( let i = 0; i < film.screenings.length; i++ )
      {
        var row = screeningTable.insertRow(i);
        row.insertCell(0).innerHTML = `<b><i>` + film.screenings[i][0] + `&nbsp;&nbsp;</i></b>`;
        for( let j = 1; j < film.screenings[i].length; j++ )
        {
          row.insertCell(j).innerHTML = `<i>` + film.screenings[i][j] + `&nbsp;&nbsp;</i>`;
          row.cells[j].style.textAlign = 'right';
        }
      }
      filmScreenings.appendChild(screeningTable);
    }
    filmScreenings.innerHTML = filmScreenings.innerHTML +  `<br></div>`;
    filmContainerDef.appendChild(filmScreenings);

    // Find the ID 'user-list' and append the userContainer to it.
    // This will cause it to display on the page.
    let filmMain = document.getElementById("filmMain");

    let filmInfoAndStills = document.createElement("div");
    if( screenWidth > 700 )
    {
      filmInfoAndStills.style = "display: flex;justify-content: center;align-items: start;";
      filmContainerVidAndStills.style = "margin-left: 20px;margin-top: 50px;";
    }
    filmInfoAndStills.innerHTML = '';
    filmInfoAndStills.appendChild(filmContainerDef);
    filmInfoAndStills.appendChild(filmContainerVidAndStills);

    filmMain.innerHTML = '';
    filmMain.appendChild(filmInfoAndStills);

    closeNav();
  }

  function showPerformances()
  {
    showView("performances");

      let performancesDef = document.getElementById("performances");
      performancesDef.style = "text-align: center;align-content: center;width: 100%;margin: 0 auto; max-width: 800px;";
      performancesDef.innerHTML = "";
      for( let [key, value] of perfMap.entries() )
      {
        perf = value;
        let perfDef = document.createElement("div");
        perfDef.innerHTML = "";
        perfDef.innerHTML = perfDef.innerHTML + `<h2>` + perf.name + `</h2>` 
                            + `<h4>` + perf.date + `</h4><p>` + perf.desc + `</p>`
                            + perf.video + `<br></div>`;
        performancesDef.appendChild(perfDef);
      }
  }


const filmMap = new Map();
for( let i = 0; i < FILMS.length; i++ )
{
  filmMap.set(FILMS[i][0], new Film(FILMS[i][0], FILMS[i][1], FILMS[i][2], FILMS[i][3], FILMS[i][4], FILMS[i][5], FILMS[i][6], FILMS[i][7], FILMS[i][8]) );
}
const perfMap = new Map();
for( let i = 0; i < PERFORMANCES.length; i++ )
{
  perfMap.set(PERFORMANCES[i][0], new Performance(PERFORMANCES[i][0], PERFORMANCES[i][1], PERFORMANCES[i][2], PERFORMANCES[i][3]) );
}
window.onload = showFilm("Tactile Light Diary");
window.onload = buildFilmCards();
