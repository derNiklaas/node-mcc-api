import MCCAPI from "./index.js"

async function run() {
    let HOF = await MCCAPI.getHallOfFameStats();
    console.log(HOF.data.MG_ROCKET_SPLEEF["Most eliminations"]);
    let HOF_RS = await MCCAPI.getHallOfFameStatsForGame("MG_ROCKET_SPLEEF");
    console.log(HOF_RS.data["Most eliminations"]);

    let red = await MCCAPI.getParticipantsOnTeam("RED");
    console.log(red.data[0].stream);

    let all = await MCCAPI.getParticipants();
    console.log(all.data.RED[0]);

    let rundown = await MCCAPI.getRundown();
    console.log(rundown.data.eventScores.RED);

    let eventInfo = await MCCAPI.getEventInformation();
    console.log(eventInfo.data.updateVideo);
}

run().then();

