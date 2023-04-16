import Client from 'ftp';

/**
 * Streams a remote file via FTP
 * @param path Path to file to be streamed
 * @param host Host name
 * @param user FTP username
 * @param password FTP password
 * @returns Promise containing a readable stream of the file
 */
export const getFTPStream = async (
  path: string,
  host: string,
  user: string | undefined,
  password: string | undefined,
) =>
  // eslint-disable-next-line no-undef
  new Promise<NodeJS.ReadableStream>((resolve, reject) => {
    const ftp = new Client();
    ftp.on('ready', () => {
      ftp.get(path, (err, stream) => {
        if (err) reject(err);
        stream.once('close', () => {
          ftp.end();
        });
        resolve(stream);
      });
    });

    ftp.connect({
      host,
      user,
      password,
    });
  });
