console.log("Loading");
var finWindow = fin.desktop.Window.getCurrent();
document.addEventListener("mouseleave", closeWindow);

function closeWindow(){
    finWindow.close();
}