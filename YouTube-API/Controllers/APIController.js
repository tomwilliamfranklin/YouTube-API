// Sample js code for search.list

// See full sample for buildApiRequest() code, which is not 
// specific to a particular API or API method.





$(document).ready(function () {
    var key = 'AIzaSyCl5p4_gAt3s9L9T_9roGWXUl__bCUdsb0';
    var URL = 'https://www.googleapis.com/youtube/v3/search';
    var SearchInput = '';
    var options = {};
    var dataa = 'HELLO';
    function loadVideos() {
        $.getJSON(URL, options, function (data) {
            console.log(data);
            populateVideos(data);
        })
    }
    $("#btnClick").click(function () {
        SearchInput = document.getElementById("txtSearch").value;
        options = { part: 'snippet', key: key, maxResults: '20', q: SearchInput }
        loadVideos();


    });

    function populateVideos(data) {
        $('main').html('');
        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.high.url;
            var Title = item.snippet.title;
            var Description = item.snippet.description;
            if (Description == "") {
                Description = "No Description";
            }

            $('main').append(`
            <article class>
                <img src = "${thumb}" alt = "images/temp-thumbnail.png" class= "thumb">  </img> 
                <div class="divDetails">
                    <h4>${Title}</h4>
                    <p>${Description}</p>
                </div> 
            </article>
            `);
        });


    }


    function replaceTemp(x) {
        $('.head h3').html(x);
    }

});


