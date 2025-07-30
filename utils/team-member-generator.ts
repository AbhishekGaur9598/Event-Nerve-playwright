// utils/data-generator.ts
import fs from 'fs';
import path from 'path';

export function generateRandomData() {
    const timestamp = Date.now();
    const data = 
    {
        role: 'eventAdmin',
        name: `Abhishek-${Date.now().toString().slice(-5)}`,
        mobile: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        email: `abhi${timestamp}@test.com`,
        userId: `Habilelabs${Date.now().toString().slice(-5)}`
    };

    const filePath = path.join(__dirname, '..', 'data', 'ui-data', 'team-member-data.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return data;
}

