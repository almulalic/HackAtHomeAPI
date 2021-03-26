"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./API/AppModule");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    app.enableCors();
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map