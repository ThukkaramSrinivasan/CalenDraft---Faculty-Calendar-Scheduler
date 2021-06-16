$(function () {
    $('#add').on('click', function () {
        var temp = $('div#input');
        temp.html('');
        console.log("INSIDE Userhomepage ajax create quiz");           
        temp.append('\
        <br>\
        <div type = "row">\
        <label>Reccuring Reminder</label>\
        <input type="radio" name = "repeat" id = "none" value="none">No Reccurence</input>&emsp;\
        <input type="radio" name = "repeat" id = "hourly" value="hourly">Hourly</input>&emsp;\
        <input type="radio" name = "repeat" id = "daily" value="daily">Daily</input>&emsp;\
        <input type="radio" name = "repeat" id = "weekly" value="weekly">Weekly</input>&emsp;\
        <input type="radio" name = "repeat" id = "monthly" value="monthly">Monthly</input><br>\
        </div>\
        <br>\
        <div type = "row">\
        <label>Enter Date</label>\
        <input type="date" id = "date" name = "date" style = "border-radius: 5px"> </input>&emsp;\
        <label>Enter Time</label>\
        <input type="time" id = "time" name = "time" style = "border-radius: 5px"> </input>\
        </div>\
        <br>\
        <div type = "row">\
        <label>Reminder Message</label>\
        <input type = "text" id = "msg" name = "msg" style = "border-radius: 5px"></input>\
        </div>\
        <br\
        <div type = "row">\
        <label>Notification Type</label>\
        <input type="radio" name = "notification" id = "silent" value="silent">Silent</input>&emsp;\
        <input type="radio" name = "notification" id = "sound" value="sound">Sound</input><br> <br>\
        </div>\
        <br>\
        <input type="submit" value = "Save Reminder" style = "border-radius: 5px"></input>\
        ');
    });
    $('#del').on('click', function () {
        var temp = $('div#input');
        temp.html('');
        console.log("INSIDE Userhomepage ajax create quiz");           
        // temp.append('\
        // <label>Delete</label><input type="date" id = "date" name = "date"> Enter Date </input><br>\
        // <input type="submit">Save Reminder</input>\
        // ');
        // temp.append('\<br><div type = "row"><label>Enter Date</label><input type="date" id = "date" name = "date" style = "border-radius: 5px"> </input>&emsp;<label>Enter Time</label><input type="time" id = "time" name = "time" style = "border-radius: 5px"> </input></div><br><div type = "row"><label>Reminder Message</label><input type = "text" id = "msg" name = "msg" style = "border-radius: 5px"></input></div><br<div type = "row"><label>Notification Type</label><input type="radio" name = "notification" id = "silent" value="silent">Silent</input>&emsp;<input type="radio" name = "notification" id = "sound" value="sound">Sound</input><br> <br></div><br><input type="submit" value = "Save Reminder" style = "border-radius: 5px"></input>');
        console.log("INSIDE AJAX REQUEST");
        $.ajax({
            url: 'http://localhost:8080/del_reminder',
            method: 'POST',
            contentType: 'application/json',
            success: function (response) {
                console.log("INSIDE RESPONSE AJAX");

                // if((response.details=="Password doesn't match")||(response.details=="Username already exists"))
                // {
                //     console.log("Inside error msg");
                //     disp.append(response.details);
                // }
                // else
                // {
                //     console.log("Inside new window");
                //     var w = window.open('about:blank');
                //     w.document.open();
                //     w.document.write(response);
                //     w.document.close();
                // }
                console.log(response.results);
                if(response.results.length == 0){
                    temp.append('<br>\
                    <div type = "row">\
                    <label>No Reminders are currently set</label>\
                    </div>');
                }
                else{
                    // var str = '<br><div type = "row"><input type="checkbox" id="row1" name="reminders" value="2021-04-08#02:29:00"></input><label>2021-04-08#02:29:00</label><br><input type="submit" value = "Delete Reminder" style = "border-radius: 5px"></input></div>';
                    var str = '<br><table style = "border: 1px solid black;"><tr><th style = "text-align: center;border: 1px solid black;">Checkbox</th><th style = "text-align: center;border: 1px solid black;">Date</th><th style = "text-align: center;border: 1px solid black;">Time</th><th style = "text-align: center;border: 1px solid black;">Message</th><th style = "text-align: center;border: 1px solid black;">Sound</th><th style = "text-align: center;border: 1px solid black;">Repeat</th></tr>'
                    for(var i=0;i<response.results.length;i++){
                        var d = new Date(response.results[i].date);
                        str = str + '<tr><td style = "text-align: center;border: 1px solid black;"><input type="checkbox" id="row'+i+'" name="reminders" value="'+response.results[i].date+'#'+response.results[i].time+'"></input></td><td style = "text-align: center;border: 1px solid black;">'+d.toDateString()+'</td><td style = "text-align: center;border: 1px solid black;">'+response.results[i].time+'</td><td style = "text-align: center;border: 1px solid black;">'+response.results[i].msg+'</td><td style = "text-align: center;border: 1px solid black;">'+response.results[i].sound+'</td><td style = "text-align: center;border: 1px solid black;">'+response.results[i].reccurence+'</td></tr>'
                    }
                    str = str + '</table><br><input type="submit" value = "Remove Reminder" style = "border-radius: 5px"></input>'
                    temp.append(str);
                }
            }
        });
    });
});
