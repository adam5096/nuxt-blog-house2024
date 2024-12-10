// 建立與 neon: postgresSQL 資料庫的連線
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
// 設定 neon 使用 websocket 
neonConfig.webSocketConstructor = ws

// 使用 neondatabase 套件所提供的 pool 類別並實例化
// 連線使用的資訊來源為 process.env.DATABASE_URL => /.env
export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export default {
    pool
}