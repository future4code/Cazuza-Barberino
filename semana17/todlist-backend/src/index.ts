import express from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server Started");
});
