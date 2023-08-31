class GamesDTO {
  constructor(data, page, size) {
    this.gamesCount = data.length;

    if (page && size) {
      page = +page;
      size = +size;

      data = data.slice((page - 1) * size, (page - 1) * size + size);
    }

    this.games = data.map(el => this.getGame(el));
  }

  getGame(data) {
    return {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      game_url: data.game_url,
      genre: data.genre,
      platform: data.platform,
      publisher: data.publisher,
      release_date: data.release_date,
    }
  }
}

module.exports = GamesDTO;