document.addEventListener('keyup', apiCall);

function apiCall(){
    var domInput = document.getElementById("addWishlist");
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
                    var textnode = document.createTextNode(result.items[item].volumeInfo.title);
                    var btnNode = document.createElement("IMG");
                    btnNode.src = "./add.svg";
                    spanNode.appendChild(textnode);
                    liNode.appendChild(btnNode);
                    liNode.appendChild(spanNode);
                    domUL.appendChild(liNode);
                }
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