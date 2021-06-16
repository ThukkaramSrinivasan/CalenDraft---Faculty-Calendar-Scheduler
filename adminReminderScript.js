$(function () {
    $(document).ready( function () {
        var temp = $('div#input');
        temp.html('');
        console.log("INSIDE Userhomepage ajax create quiz");           
        console.log("INSIDE AJAX REQUEST");
        $.ajax({
            url: 'http://localhost:8080/get_user_names',
            method: 'POST',
            contentType: 'application/json',
            success: function (response) {
                console.log("INSIDE RESPONSE AJAX");
                console.log(response.results);
                if(response.results.length == 0){
                    temp.append('<option value="User1">No Users with reminders</option>');
                }
                else{
                    console.log('Here Reminder Script');
                    
                    var str = '<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" name="userSel" id="userSel">';
                    for(var i=0;i<response.results.length;i++){
                        str = str + '<option value="'+response.results[i].Name+'">'+response.results[i].Name+'</option>';
                    }
                    str = str + '</select>';
                    temp.append(str)
                    console.log('Str',str);
                }
            }
        });
    });
});
