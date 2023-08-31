class GameDTO {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.release_date = data.release_date;
        this.thumbnail = data.thumbnail;
        this.genre = data.genre;
        this.publisher = data.publisher;
        this.developer = data.developer;
        this.minimum_system_requirements = data.minimum_system_requirements;
        this.screenshots = data.screenshots;
    }
}

module.exports = GameDTO;