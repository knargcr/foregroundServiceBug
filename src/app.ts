import { createApp } from "nativescript-vue";
import Antre from "./components/Antre.vue";

require("./services/foregroundService");
createApp(Antre).start();
