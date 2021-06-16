function searchOnClick() {
  ip_name = $("#ip_name").val();
  ip_start_time = $("#startTime").val();
  ip_end_time = $("#endTime").val();
  ip_start_date = $("#startDate").val();
  ip_end_date = $("#endDate").val();
  ip_start = ip_start_date + "T" + ip_start_time;
  ip_end = ip_end_date + "T" + ip_end_time;
  console.log(ip_name, ip_start, ip_end);
  $.ajax({
    url: "http://localhost:8080/search_free_slots",
    method: "POST",
    data: {
      info: {
        Name: ip_name,
        start: ip_start,
        end: ip_end,
      },
    },
    success: function (response) {
      console.log("INSIDE RESPONSE AJAX");
      // console.log(response.results);
      console.log(response.ret);
      if (response.ret == 1) {
        console.log(response.val);
        evs = [];
        response.val.forEach(element => {
          ev = {title:'free', start: element.s,end:element.e};
          evs.push(ev);
        });
        console.log(evs);
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
              text: "Assign Invigilation Duty",
              click: function () {

                //////////////////
                //////////////

                console.log("Here");
                var dateStr = prompt("Enter the date in YYYY-MM-DD format");
                var starttimeStr = prompt("Enter a start time in HH:MM format");
                var endtimeStr = prompt("Enter a end time in HH:MM format");
                var titleStr = prompt("Enter exam title and room number");
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
                  });//ajax
                }//validation checking
              },//end of click
            },//end of add event
          },//end of custom buttons
          eventClick: function (calEvent, jsEvent, view, resourceObj) {
            //ADD SWAL AFTER THIS
            //ADD SWAL BEFORE THIS
          },
        });
        calendar.addEventSource(evs);
        calendar.render();
      } else alert("Invalid");
    },
  });
}
