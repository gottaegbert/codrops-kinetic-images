import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const configDir = path.join(projectRoot, '.sanity-config');

mkdirSync(configDir, { recursive: true });

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const studioDir = path.join(projectRoot, 'studio');

const child = spawn(npmCmd, ['run', 'dev'], {
    cwd: studioDir,
    stdio: 'inherit',
    env: {
        ...process.env,
        XDG_CONFIG_HOME: configDir,
    },
});

child.on('exit', (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal);
        return;
    }

    process.exit(code ?? 0);
});
