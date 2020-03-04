(function($){
    function processForm( e ){
        var dict = {
        	Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                $('#response').html(data);
                alert("Successfully Added To Library!");
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    function getMovieDetails(){
        var id = item['movieId'];
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json', 
            data: id,
            success: function(data){
                $('#edit-form').html(data);
                console.log(data);
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    function updateDetails(e){
        // get movieId from a movie I want to see details for
        var movie = {
            
        }
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json', 
            data: JSON.stringify(movie),
            success: function(data){
                alert("Successfully Updated!")
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    function showMovies(){
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                $("#row").empty();
                $.each(data, function(i,item){
                    var rows = "<tr>" +
                    "<td>" + item['title'] + "</td>" +
                    "<td>" + item['director'] + "</td>" +
                    "<td>" + item['genre'] + "</td>" +
                    "<td>" + "<button id='edit' data-id=" + item['movieId'] + "> Edit</button>"+"</td>"+
                    "</tr>";
                $("#row").append(rows);
                });
                console.log(data);
            },
            failure: function(data){
                alert(data.responseText);
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    };

    $('#ShowTable').click(showMovies);
    $('#my-form').submit( processForm );    
    //$('#edit-form').submit(updateDetails);
    $('#edit').click(getMovieDetails);
})(jQuery);