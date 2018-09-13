

async function openMenuRelativeToDiv(buttonID, windowName, url, menuHeight){
    // Calculate the postion of the button relative to the page
    var button = document.getElementById(buttonID) ;
    var buttonPosition = offset(button);
    var buttonheight = button.clientHeight;

    // Use the OpenFin API getBounds() method to discover the window position
    // Most OpenFin Methods are Asynchronous
    let bounds = await new Promise( (resolve, reject) => {
        fin.desktop.Window.getCurrent().getBounds(resolve, reject); 
    });
  
    // Here we add the page co-ords with the buttons relative position to calc the
    // buttons abosilte window position
    var menuLeftCoOrd = buttonPosition.left + bounds.left;;
    var menuTopCoOrd = buttonPosition.top + bounds.top + buttonheight;

    // Now create an OpenFin frameless window that will be the menu/dropdown window.
    // information about all window options can be found at https://developer.openfin.co/jsdocs/stable/fin.desktop.Window.html#~options
        win = new fin.desktop.Window({
            name:  windowName,
            url: url,
            defaultLeft: menuLeftCoOrd,
            defaultTop: menuTopCoOrd,
            defaultWidth: button.offsetWidth,
            defaultHeight: menuHeight,
            resizable: false,
            saveWindowState: false,
            alwaysOnTop: true,
            frame: false
        },function() {
            console.log("Window opened: " + windowName);
            // This OpenFin API method joins the Menu window to the main window, so they move together
            var mainWindow = fin.desktop.Window.getCurrent();
            win.joinGroup(mainWindow);
            win.show();
        },function(error) {
            console.log("Error creating window: " + windowName, error);
        }
    );
}

/*
Standard JS used to determine the position of the button the menu is to be aligned with
This code is taken from https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
*/
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function minimiseWindow(){
    var finWindow = fin.desktop.Window.getCurrent();
    finWindow.minimize();
}

function closeWindow(){
    var finWindow = fin.desktop.Window.getCurrent();
    finWindow.close();
}