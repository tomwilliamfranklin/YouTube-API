// Sample js code for search.list

// See full sample for buildApiRequest() code, which is not 
// specific to a particular API or API method.





$(document).ready(function () {
    var key = 'AIzaSyCl5p4_gAt3s9L9T_9roGWXUl__bCUdsb0';
    var URL = 'https://www.googleapis.com/youtube/v3/search';
    var SearchInput = '';
    var options = {};
    var dataa = 'HELLO';
    function loadVideos() { //takes the URL for api search, options and declares a function with it taking the Data and calling the populateVideos with it
        $.getJSON(URL, options, function (data) {
            populateVideos(data);
        })
    }
    $("#btnClick").click(function () { //When search button is clicked, options values are populated, seachinput is set to the input of the search field, and the videos are loaded.
        SearchInput = document.getElementById("txtSearch").value;
        options = { part: 'snippet', key: key, maxResults: '5', q: SearchInput } //five videos appear
        loadVideos();
    });



    function populateVideos(data) { 
        $('main').html(''); //Clears the html so that previous results are removed
        $.each(data.items, function (i, item) {  //loops through each item, and adds it to the results list 
            var thumb = item.snippet.thumbnails.high.url;
            var Title = item.snippet.title;
            var Description = item.snippet.description.substring(0, 150);
            var id = item.id.videoId;
            if (Description == "") { //if the video doesn't have a description, set description label to "No Description" 
                Description = "No Description";
            }

            $('main').append(`
            <article data-key="${id}">
                <img src = "${thumb}" alt = "images/temp-thumbnail.png" class= "thumb">  </img> 
                <div class="divDetails">
                    <h4>${Title}</h4>
                    <p>${Description}</p>
                </div> 
            </article>  //For each item recieved from the api, a Article is created including the thumbnail, Title and 150 characters of the description
            `);
        });


        $('main').on('click', 'article', function () {
            var getID = $(this).attr('data-key');
            $('#mainvideo').html(`
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${getID}" frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" class="VideoWidget" allowfullscreen></iframe>
            `); //The video clicked the user appears in the iframe slot. 
            console.log(getID);
        }); 

    }


    function replaceTemp(x) {
        $('.head h3').html(x);
    }

});


