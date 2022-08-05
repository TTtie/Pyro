import { Event } from "sosamba";

class DebugEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "debug",
        });
    }

    async run(...args) {
        this.log.debug(...args);
    }
}

export default DebugEvent;
