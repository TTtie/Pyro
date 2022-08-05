import { Event } from "sosamba";

class ErrorEvent extends Event {
    constructor(...args) {
        super(...args, {
            name: "error",
        });
    }

    async run(...args) {
        this.log.error(...args);
    }
}

export default ErrorEvent;
