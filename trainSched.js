$(document).ready(function(){

  var dataRef = new Firebase("https://shitzu.firebaseio.com/"); 
  // Capture Button Click
  $("#addUser").on("click", function() {

    var name = $('#trainName').val();
    var destination = $('#destination').val();
    var time = $('#firstTrain').val();
    var frequency = $('#frequency').val();

    dataRef.push({
      name: name,         //name on left is a string
      destination: destination,
      time: time,         //Firebase.ServerValue.TIMESTAMP,
      frequency: frequency 
    });

  // Don't refresh the page!
  return false;
  });

  dataRef.on("child_added", function(childsnapshot) {

  console.log(childsnapshot.val().name + ' = name');
  console.log(childsnapshot.val().destination + ' = destination');
  console.log(childsnapshot.val().time + ' = nextArrival');
  console.log(childsnapshot.val().frequency + ' = frequency');


  var name = childsnapshot.val().name;
  var destination = childsnapshot.val().destination;
  var time = childsnapshot.val().time;
  var frequency = childsnapshot.val().frequency;


  var row = $('<tr>');
  row.append('<td> '+ name +'</td>');
  row.append('<td>' + destination +'</td>');
  // row.append('<td>' + time +'</td>');
  row.append('<td>' +frequency +'</td>');
  row.append('<td></td>');
  row.append('<td></td>');


  $('#trainTable').append(row);
   
  },
  function(ErrorObject) {
  console.log(Errorobject)


  // dataRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  //    $('#trainName').html(snapshot.val().name);
  //    $('#destination').html(snapshot.val().destination);
  //    $('#firstTrain').html(snapshot.val().time);
  //    $('#frequency').html(snapshot.val().frequency);
  //    })


   // Moment JS
    var timeHour = moment().format('H');
    var timeMin = moment().format('m');
    var ftHour = moment(firstTrain, "HH:mm").format('H');
    var ftMin = moment(firstTrain, "HH:mm").format('m');

    var ftMoment = (ftHour * 60) + (ftMin * 1);
    var timeMoment = (timeHour * 60) + (timeMin * 1);

  //time passed since the first train
    var diff = timeMoment - ftMoment;
    var afterFirst = Math.floor(diff/frequency);
    var nextArrival = ((afterFirst + 1) * frequency) + ftMoment;

    if (ftMoment < timeMoment) {
      var minTill = nextArrival - timeMoment;
      var nextArrival = moment().add(minTill, 'minutes').format('HH:mm');
    } 
    else {
      var nextArrival = firstTrain;
      var minTill = ftMoment - timeMoment;
    };

    $("#trainTable").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minTill + "</td><td>");

  });
});
