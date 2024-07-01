import { Utils } from "@nativescript/core";

if (__ANDROID__) {
  let timerID = null;

  android.app.job.JobService.extend(
    "com.nativescript.location.ForegroundServiceVue3",
    {
      onStartCommand(intent, flags, startId) {
        super.onStartCommand(intent, flags, startId);

        if (!timerID) {
          timerID = Utils.setInterval((args) => {
            console.log(new Date());
          }, 1000);
        }

        return android.app.Service.START_STICKY;
      },
      onCreate() {
        super.onCreate();
        console.log("service on create");
        this.startForeground(1, this.getNotification());
      },
      onBind(intent) {
        return super.onBind(intent);
      },
      onUnbind(intent) {
        return super.onUnbind(intent);
      },
      onDestroy() {
        console.log("service on destroy");
        Utils.clearInterval(timerID);

        this.stopForeground(true);
      },
      getNotification() {
        const channel = new android.app.NotificationChannel(
          "channel_01",
          "ForegroundService Channel",
          android.app.NotificationManager.IMPORTANCE_DEFAULT
        );
        const notificationManager = this.getSystemService(
          android.content.Context.NOTIFICATION_SERVICE
        );
        notificationManager.createNotificationChannel(channel);
        const builder = new android.app.Notification.Builder(
          this.getApplicationContext(),
          "channel_01"
        )
          .setContentTitle("Title")
          .setContentText("Subtitle")
          .setSmallIcon(
            Utils.android.resources.getDrawableId("ic_stat_notify")
          );

        return builder.build();
      },
    }
  );
}
