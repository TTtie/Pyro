import { Event, Logger } from "sosamba";
import pkg from "../lib/package.mjs";
import postToDBots from "../dbots.mjs";

const { version } = pkg;

class ReadyEvent extends Event {
    posterLog = new Logger({
        level: this.sosamba.options.log?.level ?? undefined,
        name: "DBLPoster",
    });

    _rdy = false;

    _postInterval;

    constructor(...args) {
        super(...args, {
            name: "ready",
        });
    }

    async _postToDBots() {
        return postToDBots(this.sosamba.guilds.size)
            .then(() => this.posterLog.info("Successfully posted to DBots."))
            .catch(err => {
                this.posterLog.error("Posting to DBots has failed :(");
                this.posterLog.error(err);
            });
    }

    async run() {
        if (!this._rdy) {
            this._postInterval = setInterval(() => this._postToDBots(), 3600_000);
            await this._postToDBots();
            this._rdy = true;
        }
        this.log.info(`Pyro is ready as ${this.sosamba.user.username}#${this.sosamba.user.discriminator}`);
        this.sosamba.editStatus("online", {
            name: `with the rainblower | v${version}`,
            type: 0,
        });
    }
}
export default ReadyEvent;
