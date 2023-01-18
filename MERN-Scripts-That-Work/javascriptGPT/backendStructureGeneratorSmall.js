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
    'user',
    'post',
    'comment',
    'like',
    'friend',
    'message',
    'notification',
    'group',
    'event',
    'hashtag',
    'location',
    'media',
    'album',
    'search',
    'profile',
    'story',
    'ad',
    'analytics',
    'privacy',
    'report',
    'poll',
    'liveStream'
];

modelsArr.forEach(model => {
    fs.writeFileSync(`${backend}/${models}/${model}.js`, '');
    fs.writeFileSync(`${backend}/${controllers}/${model}Controller.js`, '');
    fs.writeFileSync(`${backend}/${routes}/${model}Routes.js`, '');
});

//fs.writeFileSync(`${backend}/${config}/passport.js
fs.writeFileSync(`${backend}/${config}/passport.js`, '');
fs.writeFileSync(`${backend}/${config}/db.js`, '');
fs.writeFileSync(`${backend}/${middleware}/auth.js`, '');
fs.writeFileSync(`${backend}/server.js`, '');
fs.writeFileSync(`${backend}/authServer.js`, '');

fs.writeFileSync(`${backend}/.env`, '');
fs.writeFileSync(`${backend}/.gitignore`, '');
fs.writeFileSync(`${backend}/sendRequest.rest`, '');

