import fetch from 'node-fetch';
import throttle from 'fetch-throttle';
const fetchMCC = throttle(fetch, 40, 60*1000);

export default class MCCAPI {
    private static BASE_URL = "https://api.mcchampionship.com/v1";

    private static async request(endpoint: string): Promise<unknown> {
        const response = await fetchMCC(`${this.BASE_URL}/${endpoint}`)
        return await response.json()
    }

    public static async getEventInformation(): Promise<EventInformationResponse> {
        return await this.request("event") as EventInformationResponse;
    }

    public static async getHallOfFameStats(): Promise<HallOfFameResponse> {
        return await this.request("halloffame") as HallOfFameResponse;
    }

    public static async getHallOfFameStatsForGame(game: Game): Promise<HallOfFameGameResponse> {
        return await this.request(`halloffame/${game}`) as HallOfFameGameResponse;
    }

    public static async getRundown(): Promise<RundownResponse> {
        return await this.request("rundown") as RundownResponse
    }

    public static async getParticipants(): Promise<ParticipantResponse> {
        return await this.request("participants") as ParticipantResponse
    }

    public static async getParticipantsOnTeam(team: Team): Promise<ParticipantTeamResponse> {
        return await this.request(`participants/${team}`) as ParticipantTeamResponse
    }
}

export interface EventInformationResponse {
    "code": number,
    "reason": string,
    "data": {
        "date": string,
        "event": string,
        "updateVideo": string
    }
}

export interface HallOfFameResponse {
    "code": number,
    "reason": string,
    "data": {
        [key in Game]: HallOfFameGameData
    }
}

export interface HallOfFameGameResponse {
    "code": number,
    "reason": string,
    "data": HallOfFameGameData
}

export interface HallOfFameGameData {
    [k: string]: {
        "player": string,
        "value": string,
        "placement": number,
        "changedHands": boolean
    }
}

export interface RundownResponse {
    "code": number,
    "reason": string
    "data": {
        "dodgeboltData": {
            [key in Team]: string
        },
        "eventPlacements": {
            [key in Team]: number
        },
        "eventScores": {
            [key in Team]: number
        },
        "individualScores": {
            [k: string]: number
        }
    }
}

export interface ParticipantResponse {
    "code": number,
    "reason": string,
    "data": {
        [key in Team]: Array<PlayerData>
    }
}

export interface PlayerData {
    "username": string,
    "uuid": string,
    "stream": string
}

export interface ParticipantTeamResponse {
    "code": number,
    "reason": string,
    "data": Array<PlayerData>
}

export type Game =
    "MG_ROCKET_SPLEEF"
    | "MG_SURVIVAL_GAMES"
    | "MG_PARKOUR_WARRIOR"
    | "MG_ACE_RACE"
    | "MG_BINGO_BUT_FAST"
    | "MG_TGTTOSAWAF"
    | "MG_SKYBLOCKLE"
    | "MG_SKY_BATTLE"
    | "MG_HOLE_IN_THE_WALL"
    | "MG_BATTLE_BOX"
    | "MG_BUILD_MART"
    | "MG_SANDS_OF_TIME"
    | "MG_DODGEBOLT"
    | "MG_PARKOUR_TAG"
    | "MG_GRID_RUNNERS"
    | "MG_MELTDOWN"
    | "GLOBAL_STATISTICS"
    | "LEGACY_STATISTICS"

export type Team = "RED" | "ORANGE" | "YELLOW" | "LIME" | "GREEN" | "CYAN" | "AQUA" | "BLUE" | "PURPLE" | "PINK"
