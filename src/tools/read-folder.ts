import { readdirSync, statSync } from "fs";
import { join } from "path";

interface ReadFolderOptions {
  // Regex pattern to exclude files/folders
  excludePattern?: RegExp;
  // Whether to read recursively through subdirectories
  recursive?: boolean;
}

interface File {
  name: string;
  done: boolean;
}

interface Folder {
  name: string;
  done: boolean;
  files: File[];
  folders: Folder[];
}

/**
 * Reads all files in a given folder with optional exclusion pattern
 * @param path - The path to read files from
 * @param options - Configuration options for reading
 * @returns Folder object containing files and subfolders
 */
function read_folder(
  path: string = "",
  options: ReadFolderOptions = {}
): Folder {
  const { excludePattern, recursive = true } = options;

  try {
    // Initialize empty folder structure
    const result: Folder = {
      name: path, // Add the name property with the value of the path argument
      done: false,
      files: [],
      folders: [],
    };

    // Get all items in the directory
    const items = readdirSync(path);

    for (const item of items) {
      const fullPath = join(path, item);

      // Skip if path matches exclusion pattern
      if (excludePattern && excludePattern.test(fullPath)) {
        continue;
      }

      const stats = statSync(fullPath);

      if (stats.isFile()) {
        // Add file to results
        result.files.push({
          name: fullPath,
          done: false, // Default value, could be determined by other logic
        });
      } else if (stats.isDirectory() && recursive) {
        // Recursively read subdirectories
        const subFolder = read_folder(fullPath, options);
        result.folders.push(subFolder);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error reading folder ${path}:`, error);
    // Return empty folder structure on error
    return {
      name: path, // Add the name property with the value of the path argument
      done: false,
      files: [],
      folders: [],
    };
  }
}
/**
 * Converts a folder structure to a checklist format
 * (Implementation to be added based on requirements)
 */

function print_folder(folder: Folder, level: number = 0): void {
  if (!folder) {
    console.log("Invalid folder structure");
    return;
  }

  // Characters for better visual representation
  const FOLDER_ICON = "📁";
  const FILE_ICON = "📄";
  const COMPLETED = "✅";
  const PENDING = "⬜";
  const INDENT = "  ";
  const PIPE = "│ ";
  const TEE = "├─";
  const CORNER = "└─";

  // Print folder info with appropriate indentation
  const indentation = INDENT.repeat(level);
  const statusIcon = folder.done ? COMPLETED : PENDING;
  
  console.log(`${indentation}${FOLDER_ICON} ${folder.name} ${statusIcon}`);

  // Print files
  const fileCount = folder.files.length;
  const folderCount = folder.folders.length;
  
  folder.files.forEach((file, index) => {
    const isLast = index === fileCount - 1 && folderCount === 0;
    const prefix = isLast ? CORNER : TEE;
    const fileStatus = file.done ? COMPLETED : PENDING;
    console.log(`${indentation}${prefix} ${FILE_ICON} ${file.name} ${fileStatus}`);
  });

  // Print subfolders recursively
  folder.folders.forEach((subfolder, index) => {
    print_folder(subfolder, level + 1);
  });
}
export { read_folder, print_folder };
export { type Folder, type File}