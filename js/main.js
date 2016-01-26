$(function () {
    'use strict';

    var showMessages = function () {
        $.getJSON('http://users.metropolia.fi/~ilkkamtk/chatApi/messages', function (json) {
            json.reverse();
            $.each(json, function (key, viesti) {
                console.log('key: ' + key);
                console.log(viesti);
                var p = $('<p>' + viesti.name + ': ' + viesti.message + '</p>');
                $('#viestit').append(p);
            });
        });
    }

    $('#loginForm').submit(function (evt) {
        var options = {
            type: 'POST',
            dataType: 'json',
            url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/login',
            success: function (resp) {
                console.log(resp);
                $('input[name=uID]').val(resp.uID);
                $('#profiili h4').text(resp.name);
                $('#profiili img').attr('src', resp.profileImage);
                showMessages();
            }
        };
        evt.preventDefault();
        $(this).ajaxSubmit(options);
    });


    $('#messageForm').submit(function (evt) {
        console.log('viesti');
        var options = {
            type: 'POST',
            dataType: 'json',
            url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/messages',
            success: function (resp) {
                console.log(resp);
                showMessages();
            }
        };
        evt.preventDefault();
        $(this).ajaxSubmit(options);
    });

    $('#imageForm').submit(function (evt) {
        var options = {
            type: 'POST',
            dataType: 'json',
            url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/images',
            success: function (resp) {
                $('#profiili img').attr('src', resp.profileImage);
            }
        };

        evt.preventDefault();
        $(this).ajaxSubmit(options);
    });

});