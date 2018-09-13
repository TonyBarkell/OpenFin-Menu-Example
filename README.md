# OpenFin-Support-Basic Sub Menu Example using Frameless Windows

This is an example of how the OpenFin API can be used to create 'menu' pop outs that render outside the bounds of the main window.

The first level of menus demonstrate how the OpenFin API and standard JS can be utilised to create a drop-down menu that is docked to the div/button.

The second level menu provides examples a menus that are positioned relative to the mouse click location (without requiring a lister on the mouse move event), This method is commonly used to create custom context menus.

The menus are 'frameless' OpenFin child windows (See [HERE](https://developer.openfin.co/jsdocs/stable/tutorial-window.constructor.html) information on Window construction, positioning is managed using the following OpenFin API methods:

* [Window.getBounds()](https://developer.openfin.co/jsdocs/stable/fin.desktop.Window.html#getBounds)
* [Window.joinGroup()](https://developer.openfin.co/jsdocs/stable/fin.desktop.Window.html#joinGroup)
* [System.getMousePosition()](https://developer.openfin.co/jsdocs/stable/fin.desktop.System.html#.getMousePosition)

## Installing the project

Clone this project locally and run

    npm install
    

# Running

    npm run
    
A local server (live-server) hosts the web app locally.  Then the OpenFin CLI is used to launch OpenFin and render the application.

