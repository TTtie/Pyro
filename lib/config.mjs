import { readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

export default JSON.parse(await readFile(join(fileURLToPath(import.meta.url), "../../config.json")));
