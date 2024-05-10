import express from "express";
import "./connection/db.js";
import routes from "./routes/index.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import "../src/services/passport.js";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
// Load Swagger YAML file
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(cors());

app.use(express.json()); // Parse JSON bodies

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// health checkup route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api", routes);

// swagger documentation route

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
