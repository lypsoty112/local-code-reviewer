
import { z } from "zod";
import { tool } from "@langchain/core/tools";



const ChecklistToolSchema = z.object({
    fileLocation: z.string().nonempty()
});


interface ChecklistToolSchema {
    fileLocation: string;
}

const readChecklistTool = tool(
  async (input: ChecklistToolSchema): Promise<string> => {
    // Read the file
    // Import the fs module to read the file
    try {
      // Read the file contents synchronously
      return "" // TODO
      
    } catch (error) {
        return ""// TODO
      
    }
  },
  {
    name: "File reader",
    description: "Reads the given file & returns it's contents raw.",
    schema: ChecklistToolSchema,
  }
);
