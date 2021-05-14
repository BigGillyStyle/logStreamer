# logStreamer

## About The Project

logStreamer is an Express server with a single endpoint: `/logs`, which returns the contents of a log file existing within the `/var/log` directory (and subdirectories) on the server. Log file contents are retrieved starting from the bottom of the file and traversing backwards through the file, line-by-line.

## Getting Started

### Prerequisites

1. Node ^14.16.1
1. NPM ^7.12.1

### Installation

1. `npm i`

### Usage

1. Quick run on local machine: `npm run dev` (starts server with Nodemon, watching for file changes to restart)
1. Send a request for a file within `/var/log` on the local machine:
   ```shell
   curl "http://localhost:3000/logs?filename=<some filename>&numEvents=<integer>&search=<search text>"
   ```
   1. Query parameters:
      1. `filename`: (required) Name of log file (can include relative directory path)
      2. `numEvents`: (optional) Number of log file lines to include
      3. `search`: (optiona) Search text to filter out non-matching lines in log file (case sensitive)

### Other Usages

1. `npm run test`: Runs the test suite and provides coverage information
1. `npm run test:watch`: Same as previous, but leaves tests running to allow for continual changes to code and tests and re-runs test suite accordingly
1. Preparing for Production deployment (normally done as part of CI/CD process):
   1. `npm run build`: Compiles the TypeScript code into JavaScript
   1. `npm run start`: Starts the app from the compiled `dist` code directory
