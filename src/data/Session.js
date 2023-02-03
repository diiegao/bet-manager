export class Session {
    constructor() {
        this.sessionName = 'bet_users'
    }

    set(id) {
        return sessionStorage.setItem(this.sessionName, id);
    }

    get() {
        const result = sessionStorage.getItem(this.sessionName);
        return Number(result);
    }
}