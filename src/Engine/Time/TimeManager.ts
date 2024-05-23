export class TimeManager {
  private readonly start = Date.now();
  private now = Date.now();
  private prev = Date.now();

  public update() {
    this.prev = this.now;
    this.now = Date.now();
  }

  public get delta() {
    const delta = this.now - this.prev;
    return delta / 1000;
  }

  public get deltaMS() {
    return this.now - this.prev;
  }

  public get uptime() {
    const now = Date.now();
    return (this.start - now) / 1000;
  }
}

export const timeManager = new TimeManager();
