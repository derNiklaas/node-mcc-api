import MCCAPI from "./index.js"

async function run() {

    let HOF = await MCCAPI.getHallOfFameStats();
    console.log("Most eliminations in RS: " + JSON.stringify(HOF.data.MG_ROCKET_SPLEEF["Most eliminations"]));

    let HOF_RS = await MCCAPI.getHallOfFameStatsForGame("MG_ROCKET_SPLEEF");
    console.log("Most eliminations in RS: " + JSON.stringify(HOF_RS.data["Most eliminations"]));

    let red = await MCCAPI.getParticipantsOnTeam("RED");
    console.log("First player on red: " + red.data[0].username);

    let all = await MCCAPI.getParticipants();
    console.log("The user object of the first player on red: " + JSON.stringify(all.data.RED[0]));

    let rundown = await MCCAPI.getRundown();
    console.log("The amount of coins of red in the last event: " + rundown.data.eventScores.RED);

    let rundownMCC3 = await MCCAPI.getRundownForEvent("3");
    console.log("The 4th game in MCC3: " + JSON.stringify(rundownMCC3.data.history["3"]));

    let eventInfo = await MCCAPI.getEventInformation();
    console.log("The name of the next MCC event: " + eventInfo.data.event);
}

run().then();

