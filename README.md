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
Output the current event: 
```javascript
MCCAPI.getEventInformation().then(response => {
    console.log(`The current Event is MCC ${response}.`);
});
```

Output the current holder of the ``Most eliminations``
```javascript
MCCAPI.getHallOfFameStats().then(response => {
    console.log(response.data.MG_ROCKET_SPLEEF["Most eliminations"]);
});
```
