import chalk from "chalk";
import moment from "moment";
export default function RequestLogger(req: any, res:any, next : any){
    if(req.id){
        return next();
    }
    req.time = moment();
    req.id = moment().unix();

    const resDotSendInterceptor = (res:any, send:any) => (content:any) => {
        res.contentBody = content;
        res.send = send;
        res.send(content);
    };
    console.log("\n\n")
    const startTime = moment();
    console.log(`-----------REQUEST START`, chalk.bgRed(" ID:", req.id,), "-----------");
    console.log(chalk.bgGreenBright(chalk.bgYellowBright(req.method), req.originalUrl));
    console.log(chalk.blue("HEADER"), ": ",req.headers);
    console.log(chalk.blue("PARAMS"), ": ",req.params);
    console.log(chalk.blue("QUERY "), ": ",req.query);
    console.log(chalk.blue("BODY  "), ": ",req.body);
    res.send = resDotSendInterceptor(res, res.send);
    res.on("finish", () => {
        console.log(chalk.blue(`RESPONSE`), `${moment.duration(moment().diff(req.time)).asMilliseconds()}ms`);
        try{
            console.log(JSON.stringify(JSON.parse(res.contentBody), null, 2))
        } catch (e){
            console.log(res.contentBody);
        }
        console.log(`-----------REQUEST END IN`, moment().diff(startTime)+"ms", chalk.bgRed(" ID:", req.id,), "-----------");
    });
    next();
};