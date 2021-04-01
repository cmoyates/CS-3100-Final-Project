class Availability {
    constructor() {
        this.availabilities = [];
    }

    setAvailabilities(availabilities) {
        this.availabilities = availabilities;
    }

    getAvailability(x, y) {
        return this.availabilities[x][y];
    }
}

export default new Availability();