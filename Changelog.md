### 1.7.0
- Updated to [v1.6.0](https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.6.0) of the API
  - Added `getParticipant(uuid)` to get a single participant
  - Added `team` and `platform` to the player information object
- Increased allowed API requests to 200 requests/min

### 1.6.0

- Add new method to retrieve all valid event keys via the ``/events`` endpoint
- Renamed old game history object to ``LegacyGameHistory``, which should be used for all MCCs before the start of Season 4
- Added new game history object which should be used for all Season 4 MCCs

### 1.5.1
- Fix typo in documentation

### 1.5.0

- Added ``icon`` as a field to the ``PlayerData`` interface

### 1.4.0

- Deprecated ``getHallOfFameStats()`` and ``getHallOfFameStatsForGame(Game)`` as they are now deprecated in
  the [v1.3.0](https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.3.0) version of the API

### 1.3.1

- Added missing type definitions for the ``/history`` endpoint

### 1.3.0

- Added the new endpoint and type support for
  the [v1.2.0](https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.2.0) version of the API

### 1.2.0

- Added type support for the [v1.1.0](https://github.com/Noxcrew/mcchampionship-api/releases/tag/v1.1.0) version of the
  API

### 1.1.0

- Throttle requests using [fetch-throttle](https://www.npmjs.com/package/fetch-throttle) (mitchell-merry)

### 1.0.0

- Initial Release