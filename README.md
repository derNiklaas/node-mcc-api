# node-mcc-api
A simple node.js wrapper for the [MC Championship Event API](https://github.com/Noxcrew/mcchampionship-api).

### Getting started
Install the package using ``npm install node-mcc-api`` and import the ``MCCAPI`` class.
```javascript
import MCCAPI from 'node-mcc-api'
```

### Examples 

Output every member on the red team: 
```javascript
MCCAPI.getParticipantsOnTeam("RED").then(response => {
    console.log(response.data);
});
```

Print information about the current event cycle: 
```javascript
MCCAPI.getEventInformation().then(response => {
    console.log(`The current Event is MCC ${response.data.event}.`);
});
```

Print the current holder of the ``Most eliminations`` in Rocket Spleef (Rush):
```javascript
MCCAPI.getHallOfFameStats().then(response => {
    console.log(response.data.MG_ROCKET_SPLEEF["Most eliminations"]);
});
```

Print information about the fourth game in MCC 3:
```javascript
MCCAPI.getRundownForEvent("3").then(response => {
    console.log(response.data.history["3"]);
});
```
