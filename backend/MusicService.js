const fs = require('fs');
const artistsFolder = 'media/artists';
const mime = require('mime');

class MusicService {
    parseArtists() {
        return fs.readdirSync(artistsFolder)
    }

    parseAlbums(artist) {
        return fs.readdirSync(`${artistsFolder}/${artist}`).map((album) => ({
            title: album,
            smallArt: (`/${artistsFolder}/${artist}/${album}/AlbumArtSmall.jpg`),
            art: (`/${artistsFolder}/${artist}/${album}/Folder.jpg`)
        }))
    }

    parseSongs(artist, album) {
        const regexSong = /^(\d+-?\s?-?\s+)?(?<title>.*)\..*$/
        return fs.readdirSync(`${artistsFolder}/${artist}/${album}`)
            .filter((x) => mime.getType(`${artistsFolder}/${artist}/${album}/${x}`)?.startsWith("audio"))
            .map((song) => {
                console.log(song)
                return {
                    title: song.match(regexSong).groups.title,
                    src: (`/${artistsFolder}/${artist}/${album}/${song}`),
                }
            })
    }

    getAllSongs() {
        const songs = []
        for (let artist of this.parseArtists()) {
            for (let album of this.parseAlbums(artist)) {
                for (let song of this.parseSongs(artist, album.title)) {
                    songs.push({
                        artist,
                        album,
                        ...song
                    })
                }
            }
        }
        return songs
    }
}

module.exports = new MusicService()