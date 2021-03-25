const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.disable("x-powered-by"); //Don't show Express' headers
app.set("trust proxy", true);
const STATIC_ROUTE = "/static";

// Optional proxy
if (process.env.USE_SERVER_PROXY === "true") {
  const proxy = require("http-proxy-middleware");
  app.use(
    "/api",
    proxy({
      target: process.env.SERVER_PROXY_URL || "http://localhost:8080/api",
    })
  );
}

console.log(`Using API url ${process.env.REACT_APP_API_URL}`);
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);

console.log("Tettitori-ui serving at port " + PORT + "...");
