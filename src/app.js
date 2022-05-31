//#region Element onclick
var element = document.getElementById("creat");
element.onclick = function()
{
  const return_value = addPuzzleBoard();
}
//#endregion

//#region addSticky
async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: 'Hello, World!!!@@##',
  });

  //await miro.board.viewport.zoomTo(stickyNote);
  return stickyNote;
}

//addSticky();
//#endregion

//#region getShapeByContent
async function getShapeByContent(c)
{
  const items = await miro.board.get({type: "shape"});

  for(var i = 0; i < items.length; i++)
  {
    var content = items[i].content;
    if(content.includes(c))
    {
      return items[i];
    }
  }

  return {x:0,y:0, content:'none'};
}
//#endregion

//#region addPuzzleBoard


async function addPuzzleBoard()
{
  const items = await miro.board.get({type: 'image'});

  if(items.length === 0) return;

  const imgsArray= [];
  const origArea = await getShapeByContent('*1');
  const newArea = await miro.board.createShape({
    shape: 'rectangle',
    style: {fillColor: '#000000',},
    x: origArea.x + 2500,
    y: origArea.y,
    width: 2200,
    height: 2400,
  });

  const offset = {x:origArea.x-newArea.x, y:origArea.y-newArea.y};
  
  for(var i = 0; i < items.length; i++)
  { 
    if(items[i].title == "IMG")
    {
      const return_value = copyImage(items[i], offset);
    }
  }
}

async function copyImage(img, offset)
{
  const newImg = await  miro.board.createImage({
    title: 'PuzzleIMG',
    url: img.url,
    x: img.x - offset.x, // Default value: horizontal center of the board
    y: img.y - offset.y, // Default value: vertical center of the board
    width: img.width, // Set either 'width', or 'height'
    rotation: 0.0,
  });
}
//#endregion
