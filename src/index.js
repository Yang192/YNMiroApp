
var selectedItem = null;
var origColor = 'light_yellow';

async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({url: 'app.html'});
  });

  /*miro.board.ui.on('selection:update', async (event) =>
  {
    const selectedItems = event.items;

    if(selectedItems.length == 1)
    { 
      selectedItem = selectedItems[0];

      if(selectedItem.type === 'sticky_note')
      {
        origColor = selectedItem.style.fillColor;
        selectedItem.style.fillColor = selectedItem.style.fillColor === 'cyan' ? 'light_yellow' : 'cyan' ;
        await selectedItem.sync();
      }
    }
  });*/
}

init();
