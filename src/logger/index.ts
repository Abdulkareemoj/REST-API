// @deno-types="npm:"@types/pino2@^7.0.5",
import logger from "npm:pino@^8.14.1";
import dayjs from "npm:dayjs@^1.11.8";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timetamp: () => `,"time":"${dayjs().format()}"`,
});
export default log;
