import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as compression from "compression";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
import * as routes from "./routing";
import logger from "./helper/logger";
//Database connexion
import { connect } from "./helper/mongoConnexion";
import { setCors } from "./helper/cors";


connect();

const app = express();

//env check
if (!process.env.UPLOAD_DIR) {
  throw "UPLOAD_DIR env is not set"
}


/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(compression());

//Set CORS headers
app.all("/*", setCors);

// catch 404 and forward to error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    err.status = 404;
    next(err);
  }
);

if (app.get("env") === "development") {
  app.use(errorHandler());
}

//Routing handling
app.use("/api", routes);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  logger.debug(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
