import { Event } from "sosamba";

class WarnEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "warn",
        });
    }

    async run(...args) {
        this.log.warn(...args);
    }
}

export default WarnEvent;
