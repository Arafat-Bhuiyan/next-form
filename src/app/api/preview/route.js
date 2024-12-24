import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataDir = path.join(process.cwd(), 'public'); // Directory where records.json is stored

export async function GET(req) {
  try {
    const jsonFilePath = path.join(dataDir, 'records.json');

    if (fs.existsSync(jsonFilePath)) {
      const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
      if (data.length > 0) {
        const lastRecord = data[data.length - 1]; // Get the last submitted record
        return NextResponse.json(lastRecord);
      } else {
        return NextResponse.json({ message: 'No records found.' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: 'No records found.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading records:', error);
    return NextResponse.json({ message: 'Error reading records.' }, { status: 500 });
  }
}
