<template>
  <Page>
    <ActionBar class="bg-blue-gray-500 text-white" flat="true">
      <Button text="Open Drawer" class="bg-red-500" @tap="openDrawer" />
    </ActionBar>

    <Drawer
      ref="drawer"
      :gestureHandlerOptions="{
        failOffsetYStart: -10,
        failOffsetYEnd: 10,
      }"
    >
      <GridLayout
        ref="drawerContent"
        ~leftDrawer
        width="70%"
        rows="*, *, *"
        backgroundColor="white"
      >
        <StackLayout>
          <Button row="0" @tap="startService">Start Service</Button>
          <Button row="1" @tap="stopService">Stop Service</Button>
        </StackLayout>
      </GridLayout>
    </Drawer>
  </Page>
</template>

<script>
import { StackLayout, Utils } from "@nativescript/core";

export default {
  methods: {
    openDrawer() {
      if (!this.$refs.drawer) {
        return;
      }

      this.$refs.drawer.nativeView.toggle();
    },
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
