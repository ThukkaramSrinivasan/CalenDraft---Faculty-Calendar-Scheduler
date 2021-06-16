$(document).ready(function() {
    calendarEl = $('#calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
      header: {
        left: 'prev,next title',
        center: 'addEventButton',
        // center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2021-03-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
           events: [
        {
          title: 'All Day Event',
          start: '2018-03-01',
           backgroundColor:'red'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10',
          backgroundColor:'green'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      ],
      customButtons: {
        addEventButton: {
          text: 'Add Event',
          click: function() {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var timeStr = prompt('Enter a time in HH:MM format');
            var titleStr = prompt('Enter event name');
            var date = new Date(dateStr + 'T'+timeStr+':00'); // will be in local time
  
            if (!isNaN(date.valueOf())) { // valid?
              calendar.addEventSource([{
                title: titleStr,
                start: date,
                allDay: true
              }]);
              alert('Event Created');
            } else {
              alert('Invalid Entry');
            }
          }
        }
      },
      eventClick: function(calEvent, jsEvent, view, resourceObj) {
          swal({
            title: calEvent.title,
            text: "Start From : "+moment(calEvent.start).format("MMMM Do YYYY, h:mm a"),
            icon: "success",
          });
      }
    });
    calendar.render();
    $(".fc-right .fc-button-group").append(
          '<div class="input-group datetimepicker"><input type="text" class="form-control fc-datepicker" placeholder="YYYY-MM-DD" style="padding: 0;width: 0;border: none;margin: 0;"></div>');
        $(".fc-datepicker").datepicker({
          dateFormat: 'yy-mm-dd',
          showOn: "button",
          buttonText: '<span class="input-group-addon"><i class="fas fa-calendar-alt"></i></span>'
        });

  });

// var fs = require('fs');//Library for call files

//Upload Function 
function Upload() {
  //Reference the FileUpload element.
  var fileUpload = document.getElementById("fileUpload");

  //Validate whether File is valid Excel file.
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();

          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                  ProcessExcel(e.target.result);
              };
              reader.readAsBinaryString(fileUpload.files[0]);
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                  var data = "";
                  var bytes = new Uint8Array(e.target.result);
                  for (var i = 0; i < bytes.byteLength; i++) {
                      data += String.fromCharCode(bytes[i]);
                  }
                  console.log(data);
                  ProcessExcel(data);
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
          }
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid Excel file.");
  }
};
function ProcessExcel(data) {
  //Read the Excel File data.
  console.log("Hello");
  var workbook = XLSX.read(data, {
      type: 'binary'
  });

  //Fetch the name of First Sheet.
  var firstSheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

  //Create a HTML Table element.
  var table = document.createElement("table");
  table.border = "1";

  //Add the header row.
  var row = table.insertRow(-1);

  //Add the header cells.
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "Day";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "1";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "2";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "3";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "4";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "5";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "6";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "7";
  row.appendChild(headerCell);

  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "8";
  row.appendChild(headerCell);

  var bgcolors = {'CD': 'green', 'CN':'red', 'POML':'blue', 'CI':'#01BEFE', 'SW':'#8F00FF', 'Open Lab':'#FF006D', 'CIR':'orange', 'Free':'gray', 'Lunch':'gray'}
   var events = []

  //Add the data rows from Excel file.
  for (var i = 0; i < excelRows.length; i++) {
      //Add the data row.
      var row = table.insertRow(-1);

      //Add the data cells.
      var cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i]['Day'];
      var d = new Date('2021-03-15' + 'T09:00:00')
      for(var j =1; j<=8;j++){
          var cell = row.insertCell(-1);
          var subj = excelRows[i][j];
          cell.innerHTML = subj;
          var newDateObj = new Date(d.getTime() + (j-1)*60*60*1000 + (i)*24*60*60*1000);
          console.log(newDateObj)
          events.push({title:subj, start:newDateObj, backgroundColor:bgcolors[subj], borderColor:bgcolors[subj]})
      }
  }
  console.log(events);
  var dvExcel = document.getElementById("dvExcel");
  dvExcel.innerHTML = "";
  dvExcel.appendChild(table);

  console.log(calendar)
  calendar.addEventSource(events);
  calendar.render();
};