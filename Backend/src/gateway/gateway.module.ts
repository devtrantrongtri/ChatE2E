import { Module } from "@nestjs/common";
import { MyGateWay } from "./gateway";

@Module({
    imports: [],
    controllers: [],
    providers: [MyGateWay],
    exports: [],
})
export class GatewayModule {

}