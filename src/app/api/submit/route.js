import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), "public"); // Directory to store JSON and files

export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir); // Ensure data directory exists
    }

    // Save the uploaded file to the file system
    let filePath = null;
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      filePath = path.join(dataDir, file.name);
      fs.writeFileSync(filePath, fileBuffer);
    }

    // Store metadata in JSON
    const record = {
      id: Date.now(),
      title,
      description,
      file: file ? `/${file.name}` : null,
    };

    const jsonFilePath = path.join(dataDir, "records.json");
    const existingData = fs.existsSync(jsonFilePath)
      ? JSON.parse(fs.readFileSync(jsonFilePath, "utf8"))
      : [];
    existingData.push(record);
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Error saving data!" },
      { status: 500 }
    );
  }
}
