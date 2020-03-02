(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
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
                    "</tr";
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
    $('#my-form').submit( processForm );
})(jQuery);