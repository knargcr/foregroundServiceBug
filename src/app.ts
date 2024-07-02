import { createApp } from "nativescript-vue";
import Antre from "./components/Antre.vue";
import DrawerPlugin from "@nativescript-community/ui-drawer/vue3";
import { install } from "@nativescript-community/ui-drawer";

install();

require("./services/foregroundService");

createApp(Antre).use(DrawerPlugin).start();
