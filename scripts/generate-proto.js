const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);
const mkdirAsync = promisify(fs.mkdir);

// Create directory if it doesn't exist
async function ensureDir(dir) {
  try {
    await mkdirAsync(dir, { recursive: true });
    console.log(`Directory created or already exists: ${dir}`);
  } catch (err) {
    console.error(`Error creating directory ${dir}:`, err);
  }
}

// Main function to generate TypeScript files from proto files
async function generateProtoTypes() {
  const outputDir = path.join(__dirname, '../src/grpc/generated');

  // Ensure output directory exists
  await ensureDir(outputDir);

  // Define proto files to process
  const protoFiles = [
    'src/grpc/proto/common/common.proto',
    'src/grpc/proto/flight/flight.proto',
    'src/grpc/proto/booking/booking.proto',
    'src/grpc/proto/aircraft/aircraft.proto',
    'src/grpc/proto/airport/airport.proto',
    'src/grpc/proto/ticket/ticket.proto',
    'src/grpc/proto/ticket-flight/ticket-flight.proto',
  ];

  try {
    console.log('Generating TypeScript files from proto definitions...');

    // Generate command to run protoc with ts-proto plugin
    const command = `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=${outputDir} --ts_proto_opt=nestJs=true --ts_proto_opt=outputServices=grpc-nest,addGrpcServiceClient=true,addNestjsRestParameter=true --proto_path=. ${protoFiles.join(
      ' ',
    )}`;

    console.log(`Running command: ${command}`);
    const { stdout, stderr } = await execAsync(command);

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    console.log('TypeScript generation completed successfully!');
  } catch (error) {
    console.error('Error generating TypeScript files:', error);
    process.exit(1);
  }
}

generateProtoTypes();
