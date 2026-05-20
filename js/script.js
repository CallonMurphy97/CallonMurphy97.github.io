var mainViews = ['about','filmography','otherProj'];

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

function showView(viewID)
{
   document.getElementById(viewID).style.display = 'inline';
   for( let i = 0; i < mainViews.length; i++ )
   {
     if( mainViews[i] != viewID )
     {
       document.getElementById(mainViews[i]).style.display = 'none';
     }
   }
}

  function showFilm(title)
  {
    film = filmMap.get(title);
    let screenWidth = document.documentElement.clientWidth;
    let filmContainerDef = document.createElement("div");
    let titleContainer = document.createElement("h4");
    titleContainer.innerHTML = `<b>` + film.name + `</b>`;
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
        let videoContainer = document.createElement("div");
        videoContainer.innerHTML = videoContainer.innerHTML + `<div style="`+ divStyle +`"><iframe src="` + film.video[0] + `" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="`+ vidPos + `top:0;left:0;` + vidDim +  `" title="Twin City Twist (2023)"></iframe></div><br>`;
        filmContainerDef.appendChild(videoContainer);
    }  

    filmContainerDef.innerHTML = filmContainerDef.innerHTML + `
      <div class="film">
        <p style="font-size:90%;max-width: 1000px;'">` + film.description + `</p>
        <br>
        <h5><i>` + film.date + ` - ` + film.runtime + ` mins - ` + film.format + `</i></h5><p></div>`;

    let filmContainerVidAndStills = document.createElement("div");                                                                                                     

    let imgScale = "width:25%;height:25%";
    if( screenWidth < 700 )
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

    if( film.screenings != null )
    {
      filmContainerVidAndStills.innerHTML =  filmContainerVidAndStills.innerHTML + `<br><h5><b>Screenings:</b></h5>`;

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
    }
    filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `</div>`;

    // Find the ID 'user-list' and append the userContainer to it.
    // This will cause it to display on the page.
    let filmMain = document.getElementById("filmMain");
    filmMain.innerHTML = '';
    filmMain.appendChild(filmContainerDef);
    filmMain.appendChild(filmContainerVidAndStills);
    if( screeningTable != null )
    {
      filmMain.appendChild(screeningTable);
    }
  }

  
const filmMap = new Map();
for( let i = 0; i < FILMS.length; i++ )
{
  filmMap.set(FILMS[i][0], new Film(FILMS[i][0], FILMS[i][1], FILMS[i][2], FILMS[i][3], FILMS[i][4], FILMS[i][5], FILMS[i][6], FILMS[i][7], FILMS[i][8]) );
}
window.onload = showFilm("Tactile Light Diary");
