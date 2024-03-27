import si from "systeminformation";
import { exec } from "child_process";

export function getUptime() {
  return si.time().uptime;
}

export async function getUsers() {
  try {
    const users = await si.users();
    return users;
  } catch (err) {
    throw new Error("Error getting users");
  }
}

export async function getCpuLoadInfo() {
  try {
    const cpuLoadInfo = await si.currentLoad();
    return cpuLoadInfo;
  } catch (err) {
    throw new Error("Error getting CPU load information");
  }
}

export async function getMemoryInfo() {
  try {
    const memoryInfo = await si.mem();
    return memoryInfo;
  } catch (err) {
    throw new Error("Error getting memory info");
  }
}

export async function getGpuInfo() {
  try {
    const gpuCommands = [
      "nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits",
      "nvidia-smi --query-gpu=memory.free --format=csv,noheader,nounits",
      "nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits",
    ];

    // const output = [];
    // gpuCommands.forEach((command) => {
    //   exec(command, (err, stderr, stdout) => {
    //     if (err) {
    //       console.error(`Error executing command: ${err.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Command STDERR: ${stderr}`);
    //       return;
    //     }
    //     output.push(stdout);
    //   });
    // });

    // const gpuInfo = {
    //   gpuTotal: output[0],
    //   gpuFree: output[1],
    //   gpuUsage: output[2],
    // };
    // return gpuInfo;
    let gpuInfo = 0;
    exec(
      "nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits",
      (err, stderr, stdout) => {
        if (err) {
          console.log(err);
          return;
        }
        if (stderr) {
          console.log(stderr);
          return;
        }
        gpuInfo = stdout;
      }
    );
    return gpuInfo;
  } catch (err) {
    throw new Error("Error getting GPU information", err);
  }
}
