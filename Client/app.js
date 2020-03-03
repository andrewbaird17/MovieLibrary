(function($){
    function processForm( e ){
        var dict = {
        	Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'text',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                $('#response').html(data);
                alert("Successfully Added" + data.title + " To Library")
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    function seeDetails(e){
        // get movieId from a movie I want to see details for
        var movie = {
            MovieId: this.value
        }
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json', 
            data: JSON.stringify(movie),
            success: function(data){

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
                $("#DIV").html('');
                var DIV = '';
                $.each(data, function(i, item){
                    var rows = "<tr>" +
                    "<td id = 'Title'>" + item + "</td>" +
                    "</tr>";
                $("#Table").append(rows);
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

    showMovies();
    //$('#showTable').click(showMovies);
    $('#my-form').submit( processForm );
})(jQuery);