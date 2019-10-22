import axios from 'axios';
import { Command } from 'commander';
import FormData from 'form-data';
import fs from 'graceful-fs';
import { getFileName } from './util';
import logger from './util/logger';
import Spinner from './util/Spinner';
import { promisify } from 'util';

interface Option {
  workspace: string;
  token: string;
  name?: string;
}

interface SlackApiResponse {
  ok: boolean;
  error?: string;
}

const pReadFile = promisify(fs.readFile);

const add = async (src: string, options: Option) => {
  const mspinner = new Spinner('Uploading...');
  try {
    if (options.workspace === undefined || options.token === undefined) {
      logger.error('Missing args');
      return;
    }
    const file = await pReadFile(src);    // TODO: add url feature

    const form = new FormData();
    form.append('image', file);
    form.append('name', options.name ? options.name : getFileName(src));

    mspinner.start();
    const res = await axios.post<SlackApiResponse>(
      `https://${options.workspace}.slack.com/api/emoji.add`,
      form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Length': file.byteLength,
        },
        params: { token: options.token },
        validateStatus: () => false,
      });
    mspinner.stop();

    if (res.data.ok)
      logger.info('Success to uploading emoji!');
    else if (!res.data.ok && res.data.error !== undefined)
      logger.error(res.data.error);
  } catch (e) {
    mspinner.stop();
    logger.error(e);
  }
};

export const attachAddAt = (cli: Command) => {
  cli.command('add <src>')
    .description('Add specified emoji (in url) at domain\'s workspace')
    .option('-w, --workspace <workspace>', 'Set your workspace name (Required)')
    .option('-t, --token <token>', 'Set your xoxs-token (Required)')
    .option('-n, --name <name>', 'Set emoji\'s name (Default, flie name will be emoji name)')
    .action(add);
};
