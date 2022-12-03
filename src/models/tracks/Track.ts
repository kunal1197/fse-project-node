import TrackI from "./TrackI";

export default class Track implements TrackI {
    id: string = "";
    artists: string[];
    images:string[];
    releaseYear: string;
    songDurationInMs: number;
    songLink: string;
    title: string;
    constructor(id: string, artists: string[], images:string[], releaseYear: string, songDurationInMs: number, songLink: string, title: string) {
        this.id = id;
        this.artists = artists;
        this.images = images;
        this.releaseYear = releaseYear;
        this.songDurationInMs = songDurationInMs;
        this.songLink = songLink;
        this.title = title;
    }


}
