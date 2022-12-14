import 'module-alias/register';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import * as swaggerUi from 'swagger-ui-express';
import * as openapi from "./openapi.json"
import { router } from './routes/v1';

const app: Express = express();
const port = 8008;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    createParentPath: true
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

app.use('/api/v1', router);

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, swaggerOptions));