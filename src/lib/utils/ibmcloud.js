import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function run (cmd, token, start, end) {
  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = 0;
  }

  const stdout = await execAsync(cmd);

  let lines = stdout.split('\n');
  lines = lines.slice(start, lines.length - end);

  return lines.map(line => line.split(token));
}

export async function accounts () {
  const lines = await run('ibmcloud account list', '   ', 3, 1)

  console.log(`${lines.length} accounts found`);

  return lines.map(line => {
    const [guid, name, status, owner] = line;

    return {
      guid,
      name,
      status,
      owner
    };
  });
}

export async function orgs () {
  const lines = await run('ibmcloud account orgs', ' ', 5, 2)

  console.log(`${lines.length} orgs found`);

  return lines.map(line => {
    const [name] = line;

    return {
      name
    };
  });
}

export async function spaces () {
  const lines = await run('ibmcloud cf spaces', ' ', 5, 1)

  return lines.map(line => {
    const [name] = line;

    return {
      name
    };
  });
}

export async function groups () {
  const json = await execAsync('ibmcloud resource groups --output json');
  return JSON.parse(json);
}

export async function regions () {
  const lines = await run('ibmcloud regions', ' ', 3, 1)

  console.log(`${lines.length} regions found`);

  return lines.map(line => {
    const [name] = line;

    let subdomain = '';

    switch (name) {
      case 'us-south':
        subdomain = 'ng';
        break;
      case 'us-east':
        subdomain = 'us-east';
        break;
      case 'eu-gb':
        subdomain = 'eu-gb';
        break;
      case 'eu-de':
        subdomain = 'eu-de';
        break;
      case 'au-syd':
        subdomain = 'au-syd';
        break;
      case 'jp-tok':
        subdomain = 'au-syd';
        break;
    }

    return {
      name,
      subdomain
    };
  });
}