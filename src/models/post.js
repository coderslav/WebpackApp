 export default class Post {
    constructor(title, img) {
        this.title = title;
        this.date = new Date();
        this.img = img;
    }
    customToString () {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img,
        }, null, '\t');
    }
    get upperCase () {
        return this.title.toUpperCase();
    }
}
