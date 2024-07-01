<template>
  <Page>
    <GridLayout backgroundColor="white" rows="*, *">
      <Button row="0" @tap="startService">Start Service</Button>
      <Button row="1" @tap="stopService">Stop Service</Button>
    </GridLayout>
  </Page>
</template>

<script>
import { Utils } from "@nativescript/core";

export default {
  methods: {
    startService() {
      let context = Utils.android.getApplicationContext();
      let serviceName = com.nativescript.location.ForegroundServiceVue3.class;
      let intent = new android.content.Intent(context, serviceName);

      context.startForegroundService(intent);
    },
    stopService() {
      let context = Utils.android.getApplicationContext();
      let serviceName = com.nativescript.location.ForegroundServiceVue3.class;

      context.stopService(new android.content.Intent(context, serviceName));
    },
  },
};
</script>
