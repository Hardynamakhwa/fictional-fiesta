// import { SQLiteDatabase, openDatabaseSync, addDatabaseChangeListener, openDatabaseAsync } from "expo-sqlite/next";


// class DBStore {
//     initiating: boolean = true;
//     #instance: SQLiteDatabase;

//     listeners: { [key: string]: (rowId: number) => void } = {}

//     constructor() {
//         this.#instance = openDatabaseSync('test_1.db');
//         this.#createUserScheme()
//     }
    
//     get instance() { return this.#instance }
    
//     #createUserScheme(){
//         this.#instance.execSync('CREATE TABLE IF NOT EXISTS users (address TEXT PRIMARY KEY, displayName TEXT, publicKey TEXT')
//     }
//     #createMessageScheme(){
//         this.#instance.execSync('CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, sender TEXT, receiver TEXT, timestamp TEXT, txt TEXT')
//     }
// }

// export default new DBStore()