import fs from 'fs';
import path from 'path';

const logsDirectory = path.resolve('Backend', 'logs');

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(logsDirectory, 'access.log'),
    { flags: 'a' }
);

export default accessLogStream;
