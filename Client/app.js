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
                $("#my-form input[type='text']").val('');
                alert("Successfully Added To Library!");
                showMovies();
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    function updateDetails(e){
        var movie = {
            movieId: parseInt(this["movieId"].value),
            Title: this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
        }
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'text',
            type: 'put',
            contentType: 'application/json', 
            data: JSON.stringify(movie),
            success: function(data){
                alert("Successfully Updated!");
                $("#edit-form input[type='text']").val('');
                showMovies();
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    $('#ShowTable').click(showMovies);
    $('#my-form').submit( processForm );    
    $('#edit-form').submit(updateDetails);

})(jQuery);

function getMovieDetails(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'get', 
        //data: id,
        success: function(data){
            console.log(data);
            $("#edit-form input[name='movieId']").val(data['movieId']);
            $("#edit-form input[name='title']").val(data['title']);
            $("#edit-form input[name='director']").val(data['director']);
            $("#edit-form input[name='genre']").val(data['genre']);
            
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
}

function deleteMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'text',
        type: 'delete',
        contentType: 'application/json', 
        data: JSON.stringify(id),
        success: function(data){
            alert("Deleted Movie from Library")
            showMovies();
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
}

function showMovies(){
    var x = null;
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
                "<td>" + "<button onclick=getMovieDetails("+item['movieId']+") id='editMovie' value='Edit'> Edit</button>" + "</td>"+
                "<td>" + "<button onclick=deleteMovie("+item['movieId']+") id='deleteMovie' value='Edit'> Delete</button>" + "</td>"+
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