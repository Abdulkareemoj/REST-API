import logger from "pino";
import dayjs from 'dayjs'
import pinoPretty from 'pino-pretty';

const log = logger({
  transport: {
    target: 'pino-pretty'
  },
    base:{
        pid: false,
    },
    timetamp: () => `,"time":"${dayjs().format()}"`,
})
export default log