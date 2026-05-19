  var mainViews = ['about','filmography','otherProj'];

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

  function showFilm(title, date, runtime, format, description, screenings, videoLink, videoWidth, videoHeight, laurels, ...images)
  {
    let screenWidth = document.documentElement.clientWidth;
    let filmContainerDef = document.createElement("div");
    let titleContainer = document.createElement("h4");
    titleContainer.innerHTML = `<b>` + title + `</b>`;
    filmContainerDef.appendChild(titleContainer);

    if( videoLink != null )
    {
      let divStyle = "";
      let vidDim = "width:1024px;height:768px;";
      let vidPos = "position:relative;";
      if( videoWidth != null && videoHeight != null )
      {
        vidDim = "width:" + videoWidth + "px;height:" + videoHeight + "px;";
      }
      if( screenWidth < 1024 )
      {
        vidDim = "width:100%;height:100%;";
        divStyle = "padding: 75% 0 0 0;position:relative;";
        vidPos = "position:absolute;";
      }
        let videoContainer = document.createElement("div");
        videoContainer.innerHTML = videoContainer.innerHTML + `<div style="`+ divStyle +`"><iframe src="` + videoLink + `" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="`+ vidPos + `top:0;left:0;` + vidDim + `" title="Twin City Twist (2023)"></iframe></div><br>`;
        filmContainerDef.appendChild(videoContainer);
    }  

    filmContainerDef.innerHTML = filmContainerDef.innerHTML + `
      <div class="film">
        <p style="font-size:90%;max-width: 1000px;'">` + description + `</p>
        <br>
        <h5><i>` + date + ` - ` + runtime + ` mins - ` + format + `</i></h5><p></div>`;

    let filmContainerVidAndStills = document.createElement("div");                                                                                                     

    let imgScale = "width:25%;height:25%";
    if( screenWidth < 700 )
    {
      imgScale = "width:50%;height:50%;"
    }
    for(let i = 0; i < images.length; i++ )
    {
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<img src="` + images[i] + `" style='` + imgScale + `object-fit: contain'>`;
    } 

    if( laurels != null )
    {
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<p>`;
      for(let i = 0; i < laurels.length; i++)
      {
        filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `<img src="` + laurels[i] + `" style='width: 25vw;max-width:150px;object-fit: contain'>`;
      }
      filmContainerVidAndStills.innerHTML = filmContainerVidAndStills.innerHTML + `</p>`;
    }
    else
    {
      filmContainerVidAndStills.innerHTML =  filmContainerVidAndStills.innerHTML + `<br>`;
    }

    if( screenings != null )
    {
      filmContainerVidAndStills.innerHTML =  filmContainerVidAndStills.innerHTML + `<br><h5><b>Screenings:</b></h5>`;

      var screeningTable = document.createElement("TABLE");
      for( let i = 0; i < screenings.length; i++ )
      {
        var row = screeningTable.insertRow(i);
        row.insertCell(0).innerHTML = `<b><i>` + screenings[i][0] + `&nbsp;&nbsp;</i></b>`;
        for( let j = 1; j < screenings[i].length; j++ )
        {
          row.insertCell(j).innerHTML = `<i>` + screenings[i][j] + `&nbsp;&nbsp;</i>`;
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

  window.onload = showFilm('Tactile Light Diary', '2025', '6', '8mm', 'Touch replicated through audiovisual means.<br>Fabric structures exposed and magnified.<br>Textiles dance over microphone and screen.<br>Images burst to the forefront.<br>First a beach, then an unclean pool.<br>Summer slips into fall.<br>Details are forgotten or misremembered.<br>The retained memory of tactile objects.',[['Montreal Underground Film Festival','May 16, 2026','Montreal,QC'],['the8fest','Nov. 29, 2025','Toronto, ON'],['Écran Libre New Media Festival','Nov. 22 2025','Chelsea, QC']],'https://player.vimeo.com/video/1158925433?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','360','360',['https://drive.google.com/thumbnail?id=1EMFUKa5ryD4XQozvvX495ZTmRbmLw0SV&sz=w1000'],'https://drive.google.com/thumbnail?id=1PRKJmR_qRXkBF4JEuF5snTzqT96oidyy&sz=w1000','https://drive.google.com/thumbnail?id=1jATnTlPLi9hX2g1ZjWzIpBLS1whQHn7C&sz=w1000','https://drive.google.com/thumbnail?id=1WdOQkoOmC8Uz2UOFzQNO-rSSZwyLNBbd&sz=w1000','https://drive.google.com/thumbnail?id=11Tb36rmGKUKzEbomhnEvW5QF8zNsylD5&sz=w1000','https://drive.google.com/thumbnail?id=1B2rxzP7xyTw-LX9tYPlCnzP6_1poU4fn&sz=w1000','https://drive.google.com/thumbnail?id=1bc1j6R3KyK2vCd5ZcIw15Ek77yvCRN5Z&sz=w1000','https://drive.google.com/thumbnail?id=1ZxjbGLm2Hj6sdschGL90cOBacycbZvFm&sz=w1000','https://drive.google.com/thumbnail?id=1KfoMYC7dWZQJ8NLU4ve-0UA-5NS_2lbl&sz=w1000');