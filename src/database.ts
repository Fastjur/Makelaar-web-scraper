import { Huis, IHuis, isHuisDTO } from "./Huis";
import { Database } from "sqlite3";

export interface IDatabase {
  connect(): void;

  disconnect(): void;

  saveHouses(houses: IHuis[]): Promise<void>;

  getHouses(): Promise<Map<string, IHuis>>;
}

export class SQLiteDatabase implements IDatabase {
  private db?: Database;

  constructor(private dbPath: string = "db.sqlite") {
    this.db = undefined;
  }

  public connect() {
    this.db = new Database(this.dbPath, (err) => {
      if (err) {
        console.error("Error connecting to database", err);
      } else {
        console.log("Connected to SQLite database");
        this.db?.run(`CREATE TABLE IF NOT EXISTS houses (
          url TEXT PRIMARY KEY,
          straatnaamHuisnummer TEXT,
          plaats TEXT,
          vraagprijs TEXT,
          oppervlakte TEXT,
          kamers TEXT
        )`);
      }
    });
  }

  public disconnect() {
    if (!this.db) {
      console.error("Database is not connected");
      return;
    }
    this.db.close((err) => {
      if (err) {
        console.error("Error disconnecting from database", err);
      } else {
        console.log("Disconnected from SQLite database");
      }
    });
  }

  public async saveHouses(houses: IHuis[]): Promise<void> {
    if (!this.db) {
      return Promise.reject(new Error("Database is not connected"));
    }
    const insertQuery = `INSERT OR REPLACE INTO houses (straatnaamHuisnummer, plaats, vraagprijs, oppervlakte, kamers, url) VALUES (?, ?, ?, ?, ?, ?)`;
    this.db.serialize(() => {
      if (!this.db) {
        console.error("Database is not connected");
        return;
      }
      const stmt = this.db.prepare(insertQuery);
      houses.forEach((house) => {
        stmt.run(
          house.straatnaamHuisnummer,
          house.plaats,
          house.vraagprijs,
          house.oppervlakte,
          house.kamers,
          house.url,
        );
      });
      stmt.finalize();
    });
  }

  public async getHouses(): Promise<Map<string, IHuis>> {
    if (!this.db) {
      return Promise.reject(new Error("Database is not connected"));
    }
    return new Promise((resolve, reject) => {
      this.db?.all(`SELECT * FROM houses`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const houses = new Map<string, IHuis>();
          rows.forEach((row: unknown) => {
            if (!isHuisDTO(row)) {
              console.error("Invalid row in database", row);
              return;
            }
            houses.set(
              row.url,
              new Huis(
                row.straatnaamHuisnummer,
                row.plaats,
                row.vraagprijs,
                row.oppervlakte,
                row.kamers,
                row.url,
              ),
            );
          });
          resolve(houses);
        }
      });
    });
  }
}
