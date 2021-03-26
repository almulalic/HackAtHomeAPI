"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Entities_1 = require("../../Models/Entities");
require("dotenv").config();
const {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_TABLE_NAME,
  DB_SYNC,
  DB_LOGGING,
} = process.env;
let DbModule = class DbModule {};
DbModule = __decorate(
  [
    common_1.Module({
      imports: [
        typeorm_1.TypeOrmModule.forRoot({
          type: DB_TYPE,
          host: DB_HOST,
          port: Number(DB_PORT),
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_TABLE_NAME,
          synchronize: Boolean(Number(DB_SYNC)),
          logging: Boolean(Number(DB_LOGGING)),
          entities: [Entities_1.Customer, Entities_1.TokenLog],
          cli: {
            entitiesDir: "src/Models/Entities",
            migrationsDir: "src/Models/Migrations",
            subscribersDir: "src/Models/Subscribers",
          },
        }),
      ],
      exports: [typeorm_1.TypeOrmModule],
    }),
  ],
  DbModule
);
exports.DbModule = DbModule;
//# sourceMappingURL=DbModule.js.map
