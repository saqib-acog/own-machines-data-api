import express from "express";
import {
  getUptime,
  getUsers,
  getCpuLoadInfo,
  getMemoryInfo,
  getGpuInfo,
} from "./modules.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
  res.status(300).redirect("/api/data")
})

app.get("/api/data", async (req, res) => {
  try {
    // Fetch users, cpu info, and memory info in parallel
    const [users, cpuLoadInfo, memoryInfo, gpuInfo] = await Promise.all([
      getUsers(),
      getCpuLoadInfo(),
      getMemoryInfo(),
      getGpuInfo(),
    ]);

    // Extract necessary information
    const uptimeInSeconds = getUptime();
    const numOfUsers = users.length || 0;
    const currentCpuUsagePercentage = cpuLoadInfo.currentLoad;
    const { total, free, used } = memoryInfo;
    // const { gpuTotal, gpuFree, gpuUsage } = gpuInfo;

    // Prepare response data
    const machineData = {
      uptime: uptimeInSeconds,
      numOfUsers: numOfUsers,
      cpuUsage: currentCpuUsagePercentage,
      totalMemory: total,
      freeMemory: free,
      usedMemory: used,
      gpu: gpuInfo,
      //   gpuTotal: gpuTotal,
      //   gpuFree: gpuFree,
      //   gpuUsage: gpuUsage,
    };

    // Send data
    res.json(machineData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error :/");
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
