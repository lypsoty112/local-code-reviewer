import { Command } from 'commander';
import { setup } from './config/setup';
import { Folder, print_folder, read_folder } from './tools/read-folder';

const program = new Command();

program
  .name('local code reviewer')
  .description('CLI tool to review Code')
  .argument('<path>', 'project path')
  .action(async (path) => {
    // Print "Hello World" to the CLI
    setup();
    const folder: Folder = read_folder(
        path
    );
    print_folder(folder)

});

program.parse();