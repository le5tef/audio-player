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
        const regexSong = /^(\d+-?\s?-?\d+?\s+)?(?<title>.*)\..*$/
        return fs.readdirSync(`${artistsFolder}/${artist}/${album}`)
            .filter((x) => mime.getType(`${artistsFolder}/${artist}/${album}/${x}`)?.startsWith("audio"))
            .map((song) => {
                let videoFilename = song.substr(0, song.lastIndexOf(".")) + ".mp4"
                let isVideoExist = fs.existsSync(`${artistsFolder}/${artist}/${album}/${videoFilename}`)
                return {
                    title: song.match(regexSong).groups.title,
                    src: (`/${artistsFolder}/${artist}/${album}/${song}`),
                    video: isVideoExist?`/${artistsFolder}/${artist}/${album}/${videoFilename}`:null
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