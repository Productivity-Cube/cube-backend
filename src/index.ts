import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";

import {EventController} from "./controllers/EventController";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: [
    EventController,
  ]
});

app.listen(8000);
