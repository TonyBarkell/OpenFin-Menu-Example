var mainWindow = fin.desktop.Window.getCurrent();
var subMenuOpen = false;
document.addEventListener("mouseleave", closeWindow);

function closeWindow(){
    if(!subMenuOpen){
        var finWindow = fin.desktop.Window.getCurrent();
        finWindow.close();
    }
}

function openMenuRelativeToMouse( windowName, url, menuHeight, menuWidth){
    subMenuOpen = true;
    // Use the OpenFin getMousePosition() kethod to deterine the position of the mouse without using an event listener
    fin.desktop.System.getMousePosition(function (mousePosition) {
        var menuLeftCoOrd = mousePosition.left;
        var menuTopCoOrd = mousePosition.top;

        // Now create the new menu as a 'framless' OpenFin Child window.
        // information about all window options can be found at https://developer.openfin.co/jsdocs/stable/fin.desktop.Window.html#~options
        var win = new fin.desktop.Window({
            name:  windowName,
            url: url,
            defaultLeft: menuLeftCoOrd,
            defaultTop: menuTopCoOrd,
            defaultWidth: menuWidth,
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
            win.addEventListener("closed", function(event){
                subMenuOpen = false;
            });
        },
        function(error) {
            subMenuOpen = false;
            console.log("Error creating window: " + windowName, error);
        }
    );
    
    });

}