import si from "systeminformation";

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
    const gpuInfo = await si.graphics();
    return gpuInfo;
  } catch (err) {
    throw new Error("Error getting gpu info", err);
  }
}
