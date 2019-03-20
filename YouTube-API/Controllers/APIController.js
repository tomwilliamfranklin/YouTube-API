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
        $('main').html(''); //Clears the html so that previous results are removed
        $.each(data.items, function (i, item) {  //loops through each item, and adds it to the results list 
            var thumb = item.snippet.thumbnails.high.url;
            var Title = item.snippet.title;
            var Description = item.snippet.description.substring(0, 150);
            var id = item.id.videoId;
            if (Description == "") {
                Description = "No Description";
            }

            $('main').append(`
            <article data-key="${id}">
                <img src = "${thumb}" alt = "images/temp-thumbnail.png" class= "thumb">  </img> 
                <div class="divDetails">
                    <h4>${Title}</h4>
                    <p>${Description}</p>
                </div> 
            </article>
            `);
        });


        $('main').on('click', 'article', function () {
            var getID = $(this).attr('data-key');
            $('#mainvideo').html(`
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${getID}" frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `);
            console.log(getID);
        }); 

    }


    function replaceTemp(x) {
        $('.head h3').html(x);
    }

});


