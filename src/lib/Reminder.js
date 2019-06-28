import uuidv4 from 'uuid/v4';

export class Reminder {
  constructor(opts) {
    if (opts.startTime) {
      this.uuid = opts.uuid || uuidv4();
      this.startTime = opts.startTime;
      this.duration = opts.duration;
      this.setColor(opts.color.hex);
      this.setDescription(opts.description || 'Unnamed reminder');
    } else {
      throw new Error('Undefined date or startTime');
    }
  }

  setColor(color) {
    const hexa = /#[0-9A-Fa-f]{6}/g;
    this.color = hexa.test(color) ? color : 'red';
  }

  setDescription(description) {
    const MAX_CHAR_SIZE = 30;
    this.description = description.substring(0, MAX_CHAR_SIZE);
  }
}
