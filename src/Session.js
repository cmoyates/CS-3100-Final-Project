import moment from 'moment';

class Session {
    constructor() {
        this.sessions = [];
        this.currMonday = moment();
        this.tutoreeId = 0;
        this.tutorId = 0;
    }

    addSession(location, x, y) {
        let tempId;
        tempId = Math.floor(Math.random() * 99000000) + 1000000;
        const newSession = {
            id: tempId,
            tutorId: this.tutorId,
            tutoreeId: this.tutoreeId,
            location: location,
            x: x,
            y: y,
            monday: moment([this.currMonday.year(), this.currMonday.month(), this.currMonday.date()]),
            isThisWeek: true
        }
        this.sessions.push(newSession);
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

    getFormattedSessions() {
        let formattedSessions = [];
        for(let i=0; i<this.sessions.length; i++) {
            let time = (this.sessions[i].y * 50) + 800;
            time = time.toString();
            let hour = time.slice(0, time.length-2);
            let minute = time.slice(time.length-2, time.length);
            if(minute=="50") {
                minute = "30";
            }
            let finalTime = hour + ":" + minute;

            let tempDay = moment([this.sessions[i].monday.year(), this.sessions[i].monday.month(), this.sessions[i].monday.date()]).add(this.sessions[i].x, "days");
            console.log(tempDay);
            let year = tempDay.year();
            let month = tempDay.month() + 1;
            let day = tempDay.date();
            let dayOfWeek = tempDay.day() + 2;
            console.log(dayOfWeek);
            console.log(year, month, day);
            console.log(this.sessions[i].x);
            let finalDate = year + "-" + month + "-" + day;

            let tempSession = {
                id: this.sessions[i].id,
                tutorId: this.sessions[i].tutorId,
                tutoreeId: this.sessions[i].tutoreeId,
                location: this.sessions[i].location,
                time: finalTime,
                date: finalDate
            };
            formattedSessions.push(tempSession);
        }
        return formattedSessions;
    }
    
}

export default new Session();