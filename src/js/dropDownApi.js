document.addEventListener('keyup', function (){
    var domInput = document.getElementById("addWishlist");
    if(domInput == null){
        domInput = document.getElementById("addOwnedlist");
    }
    if(domInput){
        var domUL = document.getElementById("dropDownList");
        var input = domInput.value;

        if(input.length > 3){
            fetch("https://www.googleapis.com/books/v1/volumes?q=" + input)
            .then(res => res.json())
            .then(
                (result) => {
                    var numOfBooks = result.totalItems;
                    console.log("Found " + numOfBooks + " books");
                    domUL.innerHTML = "";
                    for (var item in result.items){
                        var liNode = document.createElement("LI");
                        var spanNode = document.createElement("P");
                        var textnode = document.createTextNode(result.items[item].volumeInfo.title + 
                        " by " + result.items[item].volumeInfo.authors);
                        var btnNode = document.createElement("IMG");
                        btnNode.src = "./add.svg";
                        btnNode.id = result.items[item].id;
                        btnNode.className = "dropAdd";
                        btnNode.cameFrom = window.location.pathname;
                        spanNode.appendChild(textnode);
                        liNode.appendChild(btnNode);
                        liNode.appendChild(spanNode);
                        domUL.appendChild(liNode);
                    }
                    addEventListeners();
                }
            )

            domUL.classList.add("dropDown");
            domInput.classList.add("borderUpdate");
        } else {
            domUL.classList.remove("dropDown");
            domInput.classList.remove("borderUpdate");
            domUL.innerHTML = "";
        }
    }
});

function addEventListeners () {
    var addBtns = document.getElementsByClassName("dropAdd");
    // Reactas for some fucked up reason neleidzia man uzdet eventListenerius tiesiog ant klases
    // Bet ant vieno leidzia, taaaaaaaaai
    // literaliai praloopinau visa objekta:DD Ir kiekvienam individualiai idejau po eventListeneri
    for(var element in addBtns){
        addBtns[element].onclick = function(){
            // Su sitais dviem galima issiaiskint knygos ID, ir clickas is kurio puslapio atejo
            console.log(this.id, "came from", this.cameFrom);
        };
    }
} 