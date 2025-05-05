
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import fs from 'fs';



const FileReaderSchema = z.object({
    fileLocation: z.string().nonempty()
});


interface FileReaderSchema {
    fileLocation: string;
}

const fileReaderTool = tool(
  async (input: FileReaderSchema): Promise<string> => {
    // Read the file
    // Import the fs module to read the file
    try {
      // Read the file contents synchronously
      const fileContents = fs.readFileSync(input.fileLocation, 'utf-8');
      
      // Return the file contents
      return fileContents;
    } catch (error) {
      // If an error occurs, log the error and return an empty string
      console.error(`Error reading file ${input.fileLocation}:`, error);
      return '';
    }
  },
  {
    name: "File reader",
    description: "Reads the given file & returns it's contents raw.",
    schema: FileReaderSchema,
  }
);


export {fileReaderTool}