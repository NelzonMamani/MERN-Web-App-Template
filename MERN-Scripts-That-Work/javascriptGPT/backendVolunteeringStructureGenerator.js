const fs = require("fs");

const backend = "backendVolunteering";

const config = "config";
const controllers = "controllers";
const middleware = "middleware";
const models = "models";
const routes = "routes";

fs.mkdirSync(backend);
fs.mkdirSync(`${backend}/${config}`);
fs.mkdirSync(`${backend}/${controllers}`);
fs.mkdirSync(`${backend}/${middleware}`);
fs.mkdirSync(`${backend}/${models}`);
fs.mkdirSync(`${backend}/${routes}`);

const modelsArr = [
  "Volunteer",
  "Organization",
  "Event",
  "Cause",
  "Skill",
  "Application",
  "Opportunity",
  "Project",
  "Role",
  "Task",
  "Hour",
  "Feedback",
  "Comment",
  "Rating",
  "Achievement",
  "Reward",
  "Badge",
  "News",
  "Article",
  "Photo",
  "Video",
  "Story",
  "Testimonial",
];

modelsArr.forEach((model) => {
  fs.writeFileSync(`${backend}/${models}/${model}.js`, "");
  fs.writeFileSync(
    `${backend}/${controllers}/${model.toLowerCase()}Controller.js`,
    ""
  );
  fs.writeFileSync(`${backend}/${routes}/${model.toLowerCase()}Routes.js`, "");
});

fs.writeFileSync(`${backend}/.env`, "");
fs.writeFileSync(`${backend}/.gitignore`, "");
fs.writeFileSync(`${backend}/sendRequest.rest`, "");
fs.writeFileSync(`${backend}/server.js`, "");
fs.writeFileSync(`${backend}/authServer.js`, "");

