const dvb = require("dvbjs");

const origin = "33000742"; // Helmholtzstraße
const dohn = "33000803"; // Dohnaer Straße
//const destination = "33000037"; // Postplatz
const isArrivalTime = false;

getRoute("Hauptbahnhof");
getDepartures("33000803");
getNextLine("85", "33000742")


function getRoute(destination) {
  let answer;
  const startTime = new Date();

  //destinationID = destinationList[destination.toLowerCase()];
  dvb.findStop(destination).then((data) => {
    dvb.route(origin, data[0].id, startTime, isArrivalTime).then((data) => {
      answer = data.trips[0];
      //console.dir(answer);
    });
  });
}


function getDepartures(origin){
  dvb.monitor(origin, 0, 2).then((data) => {    
    //console.dir(data);
    let departureList = [];
    data.forEach(element => {
      departureList.push({"line": element.line, "arrivalTimeRelative": element.arrivalTimeRelative, "platform": element.platform.name}) 
    });
    console.log(departureList);
  });
}

function getNextLine(line, origin){
  let timeToNextBus;
  dvb.monitor(origin, 0, 2).then((data) => {   
    //console.dir(data);     
    data.forEach(element => {
      if(element.line === line && element.platform.name === "1"){
        timeToNextBus = element.arrivalTimeRelative;
        console.log(timeToNextBus);    
        return;
      }      
    });
    
  });
}


