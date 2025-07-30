// utils/EventUtils.ts
import fs from 'fs';

export class EventUtils {
  private static filePath = 'data/ui-data/AddEvent-data.json';

  static baseNames = [
    "Habilelabs Jaipur Meetup", "Habilelabs Tech Talk", "Jaipur Tech Conference",
    "Habilelabs Annual Summit", "Rajasthan Developers Day", "Habilelabs Hackathon",
    "Habilelabs Internal Review", "Jaipur Innovation Expo",
    "Habilelabs Engineering Sync", "Jaipur Developer Bootcamp"
  ];

  static generateUniqueEventName(): string {
    const base = this.baseNames[Math.floor(Math.random() * this.baseNames.length)];
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${base} - ${timestamp}_${random}`;
  }

  static saveEventName(name: string) {
    fs.writeFileSync(this.filePath, JSON.stringify({ eventName: name }, null, 2));
  }

  static getSavedEventName(): string {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8')).eventName;
  }
}
