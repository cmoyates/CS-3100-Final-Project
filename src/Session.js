import moment from 'moment';

class Session {
    constructor() {
        this.sessions = [];
    }

    setSessions(sessions) {
        this.sessions = [];
        for(let i=0; i<sessions.length; i++) {

            //monday of week calculation
            let splitDate = sessions[i].date.split("-");
            let monday = moment([parseInt(splitDate[0]), parseInt(splitDate[1])-1, parseInt(splitDate[2])]);
            let today = parseInt(monday.day().toString());
            let dayDiff = today-1;
            if(dayDiff < 0) {dayDiff += 7}
            monday.subtract((dayDiff), "days");

            //row position
            let time = sessions[i].time;
            let splitTime = time.split(":");
            let hour = parseInt(splitTime[0]) * 100;
            let minute = (parseInt(splitTime[1]) / 30) * 50;
            let combinedTime = hour + minute;
            let index = (combinedTime - 800) / 50;

            this.sessions.push({
                id: sessions[i].id,
                tutorId: sessions[i].tutorId,
                tutoreeId: sessions[i].tutoreeId,
                location: sessions[i].location,
                x: dayDiff,
                y: index,
                monday: monday,
                isThisWeek: false
            });
        }
    }

    getTime(index) {
        return this.sessions[index].time;
    }

    getSessionCount() {
        return this.sessions.length;
    }

    setIsThisWeek(index, bool) {
        this.sessions[index].isThisWeek = bool;
    }

    getSession(index) {
        return this.sessions[index];
    }
    
}

export default new Session();