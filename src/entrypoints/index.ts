import 'module-alias/register';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import * as swaggerUi from 'swagger-ui-express';
import * as openapi from "./openapi.json"
import { readFileSync } from "fs";
import MessageBus from '@services/messagebus';
import { CheckElfDuties, MoveCrates, ParseMessage } from '@domain/commands';

const app: Express = express();
const port = 8008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    createParentPath: true
}));

app.post('/elfs/:overlap', (req: Request, res: Response) => {
    try {
        const fullyOverlap = req.params.overlap == 'true';
        const stream =  readFileSync("/home/minirulo/Projects/adventcode/samples/elf_duties.txt", "utf8");
        const bus = new MessageBus();
        res.send({'result': bus.handle(new CheckElfDuties(fullyOverlap, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});

app.post('/stacks/:crateMover', (req: Request, res: Response) => {
    try {
        const crateMover = parseInt(req.params.crateMover);
        const stream =  readFileSync("/home/minirulo/Projects/adventcode/samples/warehouse_stack.txt", "utf8");
        const bus = new MessageBus();
        res.send({'result': bus.handle(new MoveCrates(crateMover, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});

app.post('/device/:buffer', (req: Request, res: Response) => {
    try {
        const bufferLength = parseInt(req.params.buffer)
        const stream =  readFileSync("/home/minirulo/Projects/adventcode/samples/message.txt", "utf8");
        const bus = new MessageBus();
        res.send({'result': bus.handle(new ParseMessage(bufferLength, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));