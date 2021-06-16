$(function () {
    $(document).ready(function () {
      calendarEl = $("#calendar");
        //comment
  
      calendar = new FullCalendar.Calendar(calendarEl, {
        header: {
          left: "prev,next title",
          center: "addEventButton",
          // center: 'title',
          right: "month,basicWeek,basicDay",
        },
        // defaultDate: "2021-05-31",
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        selectable: true,
        selectHelper: true,
        eventLimit: true, // allow "more" link when too many events
        events: [],
        // timeZone: 'IST',
        customButtons: {
          addEventButton: {
            text: "Add Event",
            click: function () {
              console.log("Here");
              var dateStr = prompt("Enter a date in YYYY-MM-DD format");
              var starttimeStr = prompt("Enter a start time in HH:MM format");
              var endtimeStr = prompt("Enter a end time in HH:MM format");
              var titleStr = prompt("Enter event name");
              var startDate = dateStr + "T" + starttimeStr + ":00" // will be in local time
              var endDate = dateStr + "T" + endtimeStr + ":00" // will be in local time
              var sdT = new Date(startDate);
              var edT = new Date(endDate);
  
              added_event = dateStr + starttimeStr + endtimeStr + titleStr;
  
              console.log(startDate);
              console.log(endDate);
              if (!isNaN(sdT.valueOf()) && !isNaN(edT.valueOf())) {
                // valid?
                calendar.addEventSource([
                  {
                    id: added_event,
                    title: titleStr,
                    start: startDate,
                    end: endDate,
                  },
                ]);
  
                $.ajax({
                  url: "http://localhost:8080/add_event_calendar",
                  method: "POST",
                  data: {
                    event: {
                      id: added_event,
                      title: titleStr,
                      start: startDate,
                      end: endDate,
                    },
                  },
                  success: function (response) {
                    console.log("INSIDE RESPONSE AJAX");
                    // console.log(response.results);
                    console.log(response.ret);
                    if (response.ret == 1) alert("Event Created");
                    else alert("Invalid");
                  },
                });
              }
            },
          },
        },
        eventClick: function (calEvent, jsEvent, view, resourceObj) {
          //ADD SWAL AFTER THIS
          Swal.fire({
            title: calEvent.title,
            text:
              "Start From : " +
              moment(calEvent.start).format("MMMM Do YYYY, h:mm a"),
            icon: "success",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "#9ce62a",
            confirmButtonColor: "#ff0000",
            confirmButtonText: "Delete it!",
  
            closeOnConfirm: false,
            closeOnCancel: false,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Are you sure you want to delete this event?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff0000",
                confirmButtonText: "Yes, delete it!",
                cancelButtonColor: "#2778c4",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Deleted", "Your event is deleted", "error");
                  console.log("inga");
                  console.log(calEvent);
                  var clicked_id = calEvent.id; //gets id manually created by us, not fc id
                  console.log(clicked_id);
  
                  $.ajax({
                    url: "http://localhost:8080/remove_event_calendar",
                    method: "POST",
                    data: { id: clicked_id },
                    success: function (response) {
                      console.log(response.ret);
                      if (parseInt(response.ret) > 0) {
                        window.location.reload();
  
                        //displayMessage("Successfully deleted");
                      }
                    },
                  });
                }
              });
            }
          });
          //ADD SWAL BEFORE THIS
        },
      });
      calendar.render();
      //     $(".fc-right .fc-button-group").append(
      //           '<div class="input-group datetimepicker"><input type="text" class="form-control fc-datepicker" placeholder="YYYY-MM-DD" style="padding: 0;width: 0;border: none;margin: 0;"></div>');
      //         $(".fc-datepicker").datepicker({
      //           dateFormat: 'yy-mm-dd',
      //           showOn: "button",
      //           buttonText: '<span class="input-group-addon"><i class="fas fa-calendar-alt"></i></span>'
      //         });
  
      //   });
      $.ajax({
        url: "http://localhost:8080/show_calendar",
        method: "POST",
        contentType: "application/json",
        success: function (response) {
          console.log("INSIDE RESPONSE AJAX");
          // console.log(response.results);
          if (response.events.length == 0) {
            console.log("No events found");
          } else {
            console.log(response);
            calendar.addEventSource(response.events);
            calendar.render();
          }
        },
      });
    });
  
    $("#upload").click(function () {
      var fd = new FormData();
      var fileUploadCal = $("#fileUpload_cal")[0].files;
      fd.append("cal_file", fileUploadCal[0]);
  
      console.log(fd.get("cal_file"));
  
      cal_file = fd.get("cal_file");
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
      if (
        regex.test(cal_file.name.toLowerCase())
      ) {
        if (typeof FileReader != "undefined") {
          var reader_cal = new FileReader();
  
          if (reader_cal.readAsBinaryString) {
            console.log("Here");
  
            reader_cal.onload = function (e_cal) {
              
                    $.ajax({
                      url: "http://localhost:8080/populate_admin_calendar",
                      method: "POST",
                      data: { cal: e_cal.target.result },
                      success: function (response) {
                        console.log("INSIDE RESPONSE AJAX");
                        // console.log(response.results);
                        window.location.reload();
                        console.log(response);
                      },
                    });

              
            };
            reader_cal.readAsBinaryString(cal_file);
          } else {
            reader.onload = function (e) {
              var data = "";
              var bytes = new Uint8Array(e.target.result);
              for (var i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i]);
              }
              console.log(data);
              $.ajax({
                url: "http://localhost:8080/populate_admin__calendar",
                method: "POST",
                contentType: "application/json",
                data: { cal: data },
                success: function (response) {
                  console.log("INSIDE RESPONSE AJAX");
                  // console.log(response.results);
                  console.log(response);
                },
              });
            };
            reader.readAsArrayBuffer(file);
          }
        } else {
          alert("This browser does not support HTML5.");
        }
      } else {
        alert("Please upload a valid CSV file.");
      }
    });
  });
  
