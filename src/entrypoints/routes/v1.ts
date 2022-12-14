import 'module-alias/register';
import express, { Request, Response } from 'express';
import MessageBus from '@services/messagebus';
import { CheckElfDuties, MoveCrates, ParseMessage } from '@domain/commands';

export const router = express.Router()

router.post('/elfs/:overlap', (req: Request, res: Response) => {
    try {
        const fullyOverlap = req.params.overlap == 'true';
        const stream =  req.body as string;
        const bus = new MessageBus();
        res.send({'result': bus.handle(new CheckElfDuties(fullyOverlap, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});

router.post('/stacks/:crateMover', (req: Request, res: Response) => {
    try {
        const crateMover = parseInt(req.params.crateMover);
        const stream =  req.body as string;
        const bus = new MessageBus();
        res.send({'result': bus.handle(new MoveCrates(crateMover, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});

router.post('/device/:buffer', (req: Request, res: Response) => {
    try {
        const bufferLength = parseInt(req.params.buffer)
        const stream =  req.body as string;
        const bus = new MessageBus();
        res.send({'result': bus.handle(new ParseMessage(bufferLength, stream))});
    } catch(error){
        res.status(400).send(error);
    }
});