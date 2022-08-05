import { readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const soundEnum = new Set(await readdir(join(fileURLToPath(import.meta.url), "../../sounds")));
export const resolveSound = sound => join(fileURLToPath(import.meta.url), "../../sounds", sound);

export default soundEnum;
