import log from 'pino'
import dayjs from 'dayjs'

const logger=log({
    transport: 
    {
        target: "pino-pretty",
        options: 
        {
          levelFirst: true,
          translateTime: true,
          colorize: true,
        },
    },
    base:
    {
        pid: false,
    },
    timestamp: ()=>`, "time": "${dayjs().format()}"`
})
export default logger;