// api/status.js
const util = require('minecraft-server-util');

export default async function handler(request, response) {
  // 设置跨域允许 (CORS)，防止前端报错
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');

  // --- 配置区域 ---
  const SERVER_IP = 'mcipv4.akbamboo.fun'; // 填你的 FRP 域名
  const SERVER_PORT = 25565;               // 填你的 FRP 端口 (通常是 25565)
  // ----------------

  try {
    // 尝试查询服务器状态
    const result = await util.status(SERVER_IP, SERVER_PORT, {
      timeout: 5000, // 5秒超时
      enableSRV: true
    });

    // 查询成功，返回数据
    response.status(200).json({
      online: true,
      players_online: result.players.online,
      players_max: result.players.max,
      version: result.version.name,
      motd: result.motd.clean
    });

  } catch (error) {
    // 查询失败（服务器没开，或者超时）
    console.error(error);
    response.status(200).json({ 
      online: false,
      error: "服务器离线或无法连接"
    });
  }
}
