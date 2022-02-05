import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = await this.createBuffer(salt, password);

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = await this.createBuffer(suppliedPassword, salt);

    return buffer.toString("hex") === hashedPassword;
  }

  static async createBuffer(salt: string, password: string) {
    return (await scryptAsync(password, salt, 64)) as Buffer;
  }
}
