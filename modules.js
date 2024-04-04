import si from "systeminformation";
import util from 'util';
import { exec } from 'child_process';
import { parseString } from 'xml2js';

const execPromise = util.promisify(exec);

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
    const { stdout, stderr } = await execPromise('nvidia-smi -q -x');
    
    if (stderr) {
      throw new Error(`Error executing command: ${stderr}`);
    }
    
    let gpuInfo = '';
    parseString(stdout, (err, result) => {
      if (err) {
        throw new Error('Error parsing XML:', err);
      }
      gpuInfo = JSON.stringify(result, null, 2);
    });
    console.log(gpuInfo.nvidia_smi_log)
    return gpuInfo;
  } catch(err) {
    throw new Error("Error getting gpu info", err);
  }
}

// export async function getGpuInfo() {
//   try {
//     const gpuInfo = await si.graphics();
//     return gpuInfo;
//   } catch (err) {
//     throw new Error("Error getting gpu info", err);
//   }
// }
