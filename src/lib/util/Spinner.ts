class Spinner {
  public loadingId: NodeJS.Timeout | undefined;
  private characters: string[];
  private msg: string;
  private status: number;
  private interval: number;

  constructor(msg: string, interval: number = 100, c: string[] = ['─', '\\', '│', '/']) {
    this.characters = c;
    this.msg = msg;
    this.interval = interval;
    this.status = 0;
    this.loadingId = undefined;
  }

  private next() {
    const len = this.characters.length;
    const c = this.characters;
    const msg = this.msg;

    return `\r${c[this.status++ % len]} ${msg}`;
  }

  start = () => {
    const interval = this.interval;

    if (this.loadingId !== undefined) return;
    this.loadingId = setInterval(() => process.stdout.write(this.next()), interval);
  }

  stop = () => {
    const loadingId = this.loadingId;
    const msg = this.msg;

    if (loadingId === undefined) return;

    clearInterval(loadingId);
    process.stdout.write(`\r${msg.split('').map(_ => ' ').join('')}  \n`);
    this.loadingId = undefined;
  }
}

export default Spinner;
