            function handleDragStart(e) {
		var refIndex = parseInt(e.target.getAttribute("class").split("fileindex")[1]); 
		var fullPath = require('file').join(desktopPath, filesOnDesktop[refIndex ]);
		var fs = require('file').stat(fullPath);
  		var file = fs.fileRef;
                console.log("Starting drag...");

                // We try to set the drag type in the chrome part 
                // so we do not get a security exception
 		require('misc').setDragData(e,file);

//   e.dataTransfer.setData("text/x-moz-url", fullPath +" test");

                var image = document.createElement("img");
                image.setAttribute("border", "0");
                image.setAttribute("src", "images/question.png");
                image.setAttribute("width", "48");
                image.setAttribute("height", "48");
                e.dataTransfer.setDragImage(image, 25, 25);

            }
            
            function handleDragEnd(e) {
alert(e.dataTransfer.dropEffect);
            }
            
            function dragEnable() {
                var dragItems = document.querySelectorAll("[draggable=true]");
                for (var i = 0, l = dragItems.length; i < l; ++i) {
                    dragItems[i].addEventListener("dragstart", handleDragStart, true);
                    dragItems[i].addEventListener("dragend", handleDragEnd, true);
                }
            }
