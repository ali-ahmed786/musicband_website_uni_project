// this js code is responsible for getting, parsing and displaying the data from the server
window.onload = () => {
    hallOfFame(2021);
    document.getElementById("submitMail").addEventListener("click", validateForm)
};

//Get Hall of fame JS
var hofContainer = document.getElementById('hofContainer');

function validateForm() {
    var currentYear = document.querySelector('#hofYear').value;
    var respBox = document.getElementById("respBox");
    if (currentYear <= 2021 && currentYear != null && currentYear > 1985) {
        respBox.classList.remove('warning'); //removing the warning class, assuming that the user is making another request
        //removing the existing hall of fame results from the html page
        while (hofContainer.firstChild) {
            hofContainer.removeChild(hofContainer.firstChild);
        }
        hallOfFame(currentYear);
    } else if (currentYear == null || currentYear < 1985 || currentYear < 2021 || !parseInt(currentYear)) {
        respBox.className = 'warning';
        respBox.innerHTML = "The Year must be between 1986-2021!";
    } else {
        hallOfFame(2021);
    }
}



function hallOfFame(year) {
    var url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/halloffame?year=" + year;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) { //if the server has sent back the requested data and the data has been downloaded
            const HOFData = JSON.parse(this.responseText);
            console.log(HOFData);
            var displayYear = document.createElement('h1');
            displayYear.className = 'shadow center';
            displayYear.innerHTML = "<br>Hall of Fame Year: " + HOFData.year + "<br><br><br>";
            hofContainer.appendChild(displayYear);
            //this loop is responsible for creating the relevant html elements and inserting data from the server into them
            for (var i = 0; i < HOFData.data.length; i++) {
                var name = document.createElement('p');
                var link = document.createElement('a');
                var hofsubdiv = document.createElement('div');
                var bandImg = document.createElement('img');
                var inductedBy = document.createElement('p');
                var inductedByUrl = document.createElement('a');
                var memberArray = HOFData.data[i].inducted_members;
                var inductedMembers = document.createElement('ul');
                inductedMembers.innerHTML = "Inducted Members: "
                name.innerHTML = "Band Name : " + HOFData.data[i].band.name;
                name.className = "shadow";
                link.href = HOFData.data[i].band.url;
                link.innerHTML = "Band Link";
                hofsubdiv.className = 'hofsubdiv';
                bandImg.src = HOFData.data[i].image.source;
                //alt text has been set to the image title for images that do not load 
                bandImg.alt = "Picture of" + HOFData.data[i].image.title;
                //the following statements have been used so that empty field from the server are not displayed on the webpage
                if (HOFData.data[i].inducted_by.name != "" && HOFData.data[i].inducted_by.name != "undefined" && HOFData.data[i].inducted_by.name != null) {
                    inductedBy.innerHTML = "Inducted By: ";
                    inductedByUrl.href = HOFData.data[i].inducted_by.url;
                    inductedByUrl.innerHTML = HOFData.data[i].inducted_by.name;
                } else {
                    inductedBy.innerHTML = "";
                    inductedByUrl.innerHTML = "";
                }
                if (memberArray.length == 0) {
                    inductedMembers.innerHTML = "";
                }
                //this loop is responsible for creating a hyperlink list for the inducted members of the band
                for (var j = 0; j < memberArray.length; j++) {
                    var li = document.createElement('li');
                    var urlmem = document.createElement('a');
                    urlmem.href = memberArray[j].url;
                    urlmem.innerHTML = memberArray[j].name + ", ";
                    li.append(urlmem)
                    inductedMembers.appendChild(li);

                }
                //adding the elements that have been created to the html webpage
                hofsubdiv.appendChild(name);
                hofsubdiv.appendChild(bandImg);
                hofsubdiv.appendChild(link);
                hofsubdiv.appendChild(inductedBy);
                hofsubdiv.appendChild(inductedByUrl);
                hofsubdiv.appendChild(inductedMembers);
                hofContainer.appendChild(hofsubdiv);

            }
        } 
    }

    request.send();
}