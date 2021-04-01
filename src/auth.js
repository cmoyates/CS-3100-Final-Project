class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(accountType, cb) {
        this.authenticated = true;
        this.accountType = accountType;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getAccountType() {
        return this.accountType;
    }
}

export default new Auth();