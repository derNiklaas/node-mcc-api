import fetch from 'node-fetch';
import throttle from 'fetch-throttle';

const fetchMCC = throttle(fetch, 200, 60 * 1000);

export default class MCCAPI {
    private static BASE_URL = "https://api.mcchampionship.com/v1";

    private static async request(endpoint: string): Promise<unknown> {
        const response = await fetchMCC(`${this.BASE_URL}/${endpoint}`)
        return await response.json()
    }

    /**
     * Returns event information about the current event cycle.
     */
    public static async getEventInformation(): Promise<EventInformationResponse> {
        return await this.request("event") as EventInformationResponse;
    }

    public static async getValidEvents(): Promise<AllEventInformationResponse> {
        return await this.request("events") as AllEventInformationResponse;
    }

    /**
     * @deprecated This endpoint will be removed in the future as the statistics API will be changed in the future.
     * See https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.3.0 for more information
     *
     * Returns all statistics in the legacy Hall of Fame.
     * Updates at the end of each event.
     */
    public static async getHallOfFameStats(): Promise<HallOfFameResponse> {
        return await this.request("halloffame") as HallOfFameResponse;
    }

    /**
     * @deprecated This endpoint will be removed in the future as the statistics API will be changed in the future.
     * See https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.3.0 for more information
     *
     * Returns all statistics in the legacy Hall of Fame for a given game.
     * Updates at the end of each event.
     *
     * @param game The key of the game you want statistics for
     */
    public static async getHallOfFameStatsForGame(game: Game): Promise<HallOfFameGameResponse> {
        return await this.request(`halloffame/${game}`) as HallOfFameGameResponse;
    }

    /**
     * Returns summary data for the last including event scores, participants and the order of games.
     *
     * NOTE: Any event from Season 3 (29 and beyond) gives a full rundown of each game,
     * including its game and individual scores. Events before Season 3 (28 and below) will receive this data "soon".
     */
    public static async getRundown(): Promise<RundownResponse> {
        return await this.request("rundown") as RundownResponse
    }

    /**
     * Returns summary data for the event you give including event scores, participants and the order of games.
     *
     * NOTE: Any event from Season 3 (29 and beyond) gives a full rundown of each game,
     * including its game and individual scores. Events before Season 3 (28 and below) will receive this data "soon".
     *
     * @param event the abbreviation of an event
     */
    public static async getRundownForEvent(event: string): Promise<RundownResponse> {
        return await this.request(`rundown/${event}`) as RundownResponse
    }

    /**
     * Returns a list of all participants in the current event cycle.
     */
    public static async getParticipants(): Promise<ParticipantResponse> {
        return await this.request("participants") as ParticipantResponse
    }

    /**
     * Returns a list of all participants in the given team in the current event cycle.
     *
     * @param team The team you want all participants of
     */
    public static async getParticipantsOnTeam(team: Team): Promise<ParticipantTeamResponse> {
        return await this.request(`participants/${team}`) as ParticipantTeamResponse
    }

    /**
     * Returns a single participant in the current event cycle
     *
     * @param uuid The UUID (dashed or un-dashed) of the participant
     */
    public static async getParticipant(uuid: String): Promise<SingleParticipantResponse> {
        return await this.request(`participant/${uuid}`) as SingleParticipantResponse;
    }
}

export interface BaseResponse {
    /** The HTTP response code (e.g. 200, 429) */
    "code": number,
    /** The reason for the response, if applicable. */
    "reason": string
}

export interface EventInformationResponse extends BaseResponse {
    "data": {
        /** The date of the event in form of a JavaScript Date object. */
        "date": string,
        /** The name of the next MCC. */
        "event": string,
        /** URL to the YouTube embed of the update video published on the Noxcrew Channel. */
        "updateVideo": string
    }
}

export interface AllEventInformationResponse extends BaseResponse {
    "data": String[]
}

export interface HallOfFameResponse extends BaseResponse {
    "data": {
        [key in Game]: HallOfFameGameData
    }
}

export interface HallOfFameGameResponse extends BaseResponse {
    "data": HallOfFameGameData
}

export interface HallOfFameGameData {
    [k: string]: {
        /** The player who currently holds this record. */
        "player": string,
        /** The value of this record (e.g. most eliminations). */
        "value": string,
        // Internal mcc.live value (?)
        "placement": number,
        /** Whether the record has changed hands in the last MCC. */
        "changedHands": boolean
    }
}

export interface RundownResponse extends BaseResponse {
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
        },
        "history": LegacyGameHistory | GameHistory,
        "creators": {
            [key in Team]: Array<String>
        }
    }
}

export interface ParticipantResponse extends BaseResponse {
    "data": {
        [key in Team]: Array<PlayerData>
    }
}

export interface SingleParticipantResponse extends BaseResponse {
    "data": PlayerData
}

export interface PlayerData {
    /** The players Minecraft username. */
    "username": string,
    /** The players Minecraft UUID. */
    "uuid": string,
    /** The link to the players stream. */
    "stream": string,
    /** A link to an icon for the player. */
    "icon": string,
    /** The team the player is on. */
    "team": Team,
    /** The platform the player is streaming on. */
    "platform": string,
}

export interface ParticipantTeamResponse extends BaseResponse {
    "data": Array<PlayerData>
}

/** Internal keys for every MCC game */
export type Game =
    "MG_ROCKET_SPLEEF"
    | "MG_SURVIVAL_GAMES"
    /** This key does not hold any statistics. */
    | "MG_PARKOUR_WARRIOR"
    | "MG_ACE_RACE"
    | "MG_BINGO_BUT_FAST"
    | "MG_TGTTOSAWAF"
    | "MG_SKYBLOCKLE"
    | "MG_SKY_BATTLE"
    | "MG_HOLE_IN_THE_WALL"
    | "MG_BATTLE_BOX"
    | "MG_BUILD_MART"
    /** This key does not hold any statistics. */
    | "MG_SANDS_OF_TIME"
    | "MG_DODGEBOLT"
    | "MG_PARKOUR_TAG"
    /** This key does not hold any statistics. */
    | "MG_GRID_RUNNERS"
    /** This key does not hold any statistics. */
    | "MG_MELTDOWN"
    | "GLOBAL_STATISTICS"
    | "LEGACY_STATISTICS"
    /** This key does not hold any statistics. */
    | "MG_LOCKOUT_BINGO"
    /** This key does not hold any statistics. */
    | "MG_FOOT_RACE"
    /** This key does not hold any statistics.  */
    | "MG_ROCKET_SPLEEF_OLD"
    /** This key does not hold any statistics.  */
    | "MG_RAILROAD_RUSH"

export type Team = "RED" | "ORANGE" | "YELLOW" | "LIME" | "GREEN" | "CYAN" | "AQUA" | "BLUE" | "PURPLE" | "PINK"

/** This should be used for events before Season 4 */
export type LegacyGameHistory = {
    /** The first game played. */
    "0": GameInformation,
    /** The second game played. */
    "1": GameInformation,
    /** The third game played. */
    "2": GameInformation,
    /** The forth game played. */
    "3": GameInformation,
    /** The fifth game played. */
    "4": GameInformation,
    /** The sixth game played. */
    "5": GameInformation,
    /** The seventh game played. */
    "6": GameInformation,
    /** The eighth game played. */
    "7": GameInformation
}

/** This should be used for events after the start of Season 4 */
export type GameHistory = {
    [key in string]: GameInformation
}

export type GameInformation = {
    /** The score multiplier of the game. Values can be 1, 1.5, 2, 2.5 and 3. */
    "multiplier": number,
    /** The key of the game played. */
    "game": Game,
    /** A zero based index of when the game was played in the event. */
    "index": number,
    "eventScores": {
        [key in Team]: number
    },
    "gamePlacements": {
        [key in Team]: number
    },
    "individualScores": {
        [k: string]: number
    },
    "eventPlacements": {
        [key in Team]: number
    }
}
