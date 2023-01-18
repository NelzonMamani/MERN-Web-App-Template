const fs = require('fs');

const backend = 'backend';

const config = 'config';
const controllers = 'controllers';
const middleware = 'middleware';
const models = 'models';
const routes = 'routes';

fs.mkdirSync(backend);
fs.mkdirSync(`${backend}/${config}`);
fs.mkdirSync(`${backend}/${controllers}`);
fs.mkdirSync(`${backend}/${middleware}`);
fs.mkdirSync(`${backend}/${models}`);
fs.mkdirSync(`${backend}/${routes}`);

const modelsArr = [
    'User',
    'Match',
    'LikeDislike',
    'Message',
    'Chat',
    'Location',
    'Interest',
    'Photo',
    'Video',
    'Notification',
    'Search',
    'Profile',
    'Questionnaire',
    'Compatibility',
    'Subscription',
    'Payment',
    'Gift',
    'Verification',
    'ReportFlag',
    'Feedback',
    'Blog',
    'News',
    'SocialMedia',
    'Advertising',
    'Analytics',
    'Log',
    'Security',
    'Backup',
    'PrivacySettings',
    'VirtualEvent'
];

modelsArr.forEach(model => {
    fs.writeFileSync(`${backend}/${models}/${model}.js`, '');
    fs.writeFileSync(`${backend}/${controllers}/${model.toLowerCase()}Controller.js`, '');
    fs.writeFileSync(`${backend}/${routes}/${model.toLowerCase()}Routes.js`, '');
});

fs.writeFileSync(`${backend}/${config}/passport.js`, '');
fs.writeFileSync(`${backend}/${config}/db.js`, '');
fs.writeFileSync(`${backend}/${middleware}/auth.js`, '');
fs.writeFileSync(`${backend}/server.js`, '');

fs.writeFileSync(`${backend}/.env`, '');
fs.writeFileSync(`${backend}/.gitignore`, '');
fs.writeFileSync(`${backend}/sendRequest.rest`, '');
fs.writeFileSync(`${backend}/authServer.js`, '');

console.log("Backend file and folder structure for the online dating application is ready!");
