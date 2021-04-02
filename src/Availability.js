class Availability {
    constructor() {
        this.availabilities = [];
    }

    setAvailabilities(availabilities) {
        this.availabilities = availabilities;
    }

    setAvailability(x, y, avail) {
        this.availabilities[x][y] = avail;
        console.log(this.availabilities[x][y]);
    }

    getAvailabilities(availabilities) {
        return this.availabilities;
    }

    getAvailability(x, y) {
        return this.availabilities[x][y];
    }

    getAvailabilityCount() {
        return this.availabilities.length;
    }
    
}

export default new Availability();