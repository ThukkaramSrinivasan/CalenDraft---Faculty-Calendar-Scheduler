$(function () {
  $(document).ready(function () {
    calendarEl = $("#calendar");

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
            "From : " +
            moment(calEvent.start).format("MMMM Do YYYY, h:mm a") + " to "+  moment(calEvent.end).format("h:mm a"),
            imageUrl: 'https://media.istockphoto.com/vectors/time-management-and-schedule-icon-for-upcoming-event-vector-id870192016?k=6&m=870192016&s=612x612&w=0&h=8GwO5-XleoMJBdz2npIxBMSQh4VqAGy2-tEC9o60QAI=',
            imageAlt: "eventclipart.jpg",
            imageWidth: 200,
            imageHeight: 200,

          showDenyButton:true,
          showCancelButton: true,
          cancelButtonText: "OK",
          cancelButtonColor: "#9ce62a",
          confirmButtonColor: "#ff0000",
          confirmButtonText: "Delete it!",
          denyButtonText: "Modify Event",
          denyButtonColor:"#2778c4",
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
                console.log("right here");
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
          else if(result.isDenied){



            //Here 
            Swal.fire({
              title: "Let's get rescheduling!",
              imageUrl: 'https://media.istockphoto.com/vectors/time-management-and-schedule-icon-for-upcoming-event-vector-id870192016?k=6&m=870192016&s=612x612&w=0&h=8GwO5-XleoMJBdz2npIxBMSQh4VqAGy2-tEC9o60QAI=',
              imageAlt: "eventclipart.jpg",
              imageWidth: 200,
            imageHeight: 200,
              showDenyButton:true,
              denyButtonText: "Update Time",
              denyButtonColor:"#2778c4",

              showCancelButton: true,
              confirmButtonColor: "#63CFDA",
              confirmButtonText: "Update Date",
              cancelButtonColor: "#2778c4",
              cancelButtonText: "Exit",
              cancelButtonColor:"#9ce62a",
              closeOnConfirm: false,
              closeOnCancel: false,
            }).then((result) => {

              if (result.isConfirmed) {//starts here for updating date



                (async () => {

                  const { value: text } = await Swal.fire({
                    input: 'text',
                    imageUrl: 'https://media.istockphoto.com/vectors/time-management-and-schedule-icon-for-upcoming-event-vector-id870192016?k=6&m=870192016&s=612x612&w=0&h=8GwO5-XleoMJBdz2npIxBMSQh4VqAGy2-tEC9o60QAI=',
                    imageAlt: "eventclipart.jpg",
                    imageWidth: 200,
                    imageHeight: 200,
                    inputLabel: 'Enter the new Date',
                    inputPlaceholder: 'YYYY-MM-DD',
                    inputAttributes: {
                      'aria-label': 'Type your message here'
                    },
                    showCancelButton: true
                  })
                  
                  if (text) {
                    Swal.fire("Event rescheduled to "+ text+ "!")
                    //Now text contains the new date
                    var clicked_id = calEvent.id; //gets id manually created by us, not fc id
                    console.log(clicked_id); //returns orignal id of the event (old date and time)
                    
                    console.log(text);
                    
                    
                    updatedStartDate=text+"T"+(moment(calEvent.start).format("HH:mm"))+":00"
                    updatedEndDate=text+"T"+(moment(calEvent.end).format("HH:mm"))+":00"
                    // console.log(moment(calEvent.start).format("hh:mm"))
                    console.log(updatedStartDate)
                    console.log(updatedEndDate)

                    newid=text+(moment(calEvent.start).format("HH:mm"))+(moment(calEvent.end).format("HH:mm"))+calEvent.title;
                    


                    $.ajax({
                      url: "http://localhost:8080/update_event_date_calendar",
                      method: "POST",
                      data: { id: clicked_id, tit:calEvent.title, usd: updatedStartDate,ued: updatedEndDate, new_id:newid},
                      success: function (response) {
                        console.log(response.ret);
                        if (parseInt(response.ret) > 0) {
                          window.location.reload();
    
                          //displayMessage("Successfully updated");
                        }
                      },
                    });
                  }
                  
                  })()
                



                
              }// ends here for updating date
              else if (result.isDenied) {//starts here for updating time



                (async () => {

                  const { value: textstr } = await Swal.fire({
                    input: 'text',
                    imageUrl: 'https://media.istockphoto.com/vectors/time-management-and-schedule-icon-for-upcoming-event-vector-id870192016?k=6&m=870192016&s=612x612&w=0&h=8GwO5-XleoMJBdz2npIxBMSQh4VqAGy2-tEC9o60QAI=',
                    imageAlt: "eventclipart.jpg",
                    imageWidth: 200,
                    imageHeight: 200,
                    inputLabel: 'Enter the new start Time',
                    inputPlaceholder: 'HH:MM (24 hour format)',
                    inputAttributes: {
                      'aria-label': 'Type your message here'
                    },
                    showCancelButton: true
                  })
                  
                  if (textstr) {
                    const { value: textend } = await Swal.fire({
                      input: 'text',
                      imageUrl: 'https://media.istockphoto.com/vectors/time-management-and-schedule-icon-for-upcoming-event-vector-id870192016?k=6&m=870192016&s=612x612&w=0&h=8GwO5-XleoMJBdz2npIxBMSQh4VqAGy2-tEC9o60QAI=',
                      imageAlt: "eventclipart.jpg",
                      imageWidth: 200,
                      imageHeight: 200,
                      inputLabel: 'Enter the new end Time',
                      inputPlaceholder: 'HH:MM (24 hour format)',
                      inputAttributes: {
                        'aria-label': 'Type your message here'
                      },
                      showCancelButton: true
                    })

                    if(textend)
                    {
                      Swal.fire("Event rescheduled to "+ textstr+" to "+textend+ "!")
                    //Now text contains the new date
                    var clicked_id = calEvent.id; //gets id manually created by us, not fc id
                    console.log(clicked_id); //returns orignal id of the event (old date and time)
                    
                    
                    
                    updatedStartTime=(moment(calEvent.start).format("YYYY-MM-DD"))+"T"+textstr+":00"
                    updatedEndTime=(moment(calEvent.start).format("YYYY-MM-DD"))+"T"+textend+":00"
                   
                    console.log(updatedStartTime)
                    console.log(updatedEndTime)

                    newid=(moment(calEvent.start).format("YYYY-MM-DD"))+textstr+textend+calEvent.title;
                    
                    $.ajax({
                      url: "http://localhost:8080/update_event_time_calendar",
                      method: "POST",
                      data: { id: clicked_id, tit:calEvent.title, ust: updatedStartTime,uet: updatedEndTime, new_id:newid},
                      success: function (response) {
                        console.log(response.ret);
                        if (parseInt(response.ret) > 0) {
                          window.location.reload();
    
                          //displayMessage("Successfully updated");
                        }
                      },
                    });
                    }
                    
                  }
                  
                  })()
                



                
              }//ends here for updating time

              
            });
            //to here










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
    var fileUpload = $("#fileUpload_tt")[0].files;
    var fileUploadCal = $("#fileUpload_cal")[0].files;
    fd.append("tt_file", fileUpload[0]);
    fd.append("cal_file", fileUploadCal[0]);

    console.log(fd.get("tt_file"));
    console.log(fd.get("cal_file"));

    tt_file = fd.get("tt_file");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
    if (
      regex.test(tt_file.name.toLowerCase())
    ) {
      if (typeof FileReader != "undefined") {
        var reader_tt = new FileReader();

        if (reader_tt.readAsBinaryString) {
          console.log("Here");

          reader_tt.onload = function (e_tt) {
            console.log("175")
            cal_file = fd.get("cal_file");
            if (regex.test(cal_file.name.toLowerCase())) {
              var reader_cal = new FileReader();

              if (reader_cal.readAsBinaryString) {
                console.log("Here");

                reader_cal.onload = function (e_cal) {
                  console.log("here");
                  $.ajax({
                    url: "http://localhost:8080/populate_calendar",
                    method: "POST",
                    data: { tt: e_tt.target.result, cal: e_cal.target.result },
                    success: function (response) {
                      console.log("INSIDE RESPONSE AJAX");
                      // console.log(response.results);
                      window.location.reload();
                      console.log(response);
                    },
                  });
                };
                reader_cal.readAsBinaryString(cal_file);
              }
              
            }
            
          };
          reader_tt.readAsBinaryString(tt_file);
        } else {
          reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            console.log(data);
            $.ajax({
              url: "http://localhost:8080/populate_calendar",
              method: "POST",
              contentType: "application/json",
              data: { tt: data },
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
