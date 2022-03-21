import './common/env';
import Server from "./common/server";
import routes from "./routes";
const port = parseInt(
  process.env.NODE_ENV != "test" ? process.env.PORT : process.env.TEST_PORT
);
console.log("Running in port: " + port);
export default new Server().router(routes).listen(port);
