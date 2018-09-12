var mainWindow = fin.desktop.Window.getCurrent();


function openMenuRelativeToDiv(buttonID, windowName, url, menuHeight){
    // Calculate the postion of the button
    var button = document.getElementById(buttonID) ;
    var buttonPosition = offset(button);
    var buttonheight = button.clientHeight;
  
    // Use the OpenFin API getBounds() method to discover the window position
    fin.desktop.Window.getCurrent().getBounds(function (bounds) {
        // Use the Window postion and the button postion on the page to calculate the sub menus window position
        var menuLeftCoOrd = buttonPosition.left + bounds.left;;
        var menuTopCoOrd = buttonPosition.top + bounds.top + buttonheight;

        // Now create the new menu as a 'framless' OpenFin Child window.
        // information about all window options can be found at https://developer.openfin.co/jsdocs/stable/fin.desktop.Window.html#~options
        var win = new fin.desktop.Window({
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
            },
            function() {
                console.log("Window opened: " + windowName);
                // This OpenFin API method joins the Menu window to the main window, so they move together
                win.joinGroup(mainWindow);
                win.show();
            },
            function(error) {
                console.log("Error creating window: " + windowName, error);
            }
        );
    });
}

/* 
Code taken from https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
Strandard JS used to determine the position of the button the menu is to be aligned with
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