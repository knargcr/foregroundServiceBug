I'm using NativeScript with Vue3. My app starts a foreground service to get the location of user. The entry frame (Antre) navigates to a page (Home) and that page starts the service. When app is killed while the service is on it skips Antre and opens Home right away. I think navigation stack is not cleared properly. Afterwards, if you kill the app again while service is still running, it crashes with the following error trace.
You can find the steps and the repo to reproduce the bug below.
Has anyone encountered such a problem before or knows how to solve it? Thanks in advance.

```
System.err: An uncaught Exception occurred on "main" thread.
System.err: Unable to destroy activity {org.nativescript.vue3Template/com.tns.NativeScriptActivity}: com.tns.NativeScriptException: Calling js method onDestroy failed
System.err: TypeError: Cannot read properties of null (reading 'unmount')
System.err:
System.err: StackTrace:
System.err: page.disposeNativeView(file: src/webpack:/vue3Template/node_modules/nativescript-vue/dist/plugins/navigation.js:42:0)
System.err: at \_tearDownUI(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/core/view-base/index.js:814:0)
System.err: at (file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/core/view-base/index.js:789:0)
System.err: at eachChildView(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/frame/frame-common.js:454:0)
System.err: at eachChild(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/core/view/view-common.js:819:0)
System.err: at \_tearDownUI(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/core/view-base/index.js:788:0)
System.err: at onDestroy(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/frame/index.android.js:1073:0)
System.err: at onDestroy(file: src/webpack:/vue3Template/node_modules/@nativescript/core/ui/frame/activity.android.js:36:0)
System.err: at android.app.ActivityThread.performDestroyActivity(ActivityThread.java:5409)
System.err: at android.app.ActivityThread.handleDestroyActivity(ActivityThread.java:5442)
System.err: at android.app.servertransaction.DestroyActivityItem.execute(DestroyActivityItem.java:47)
System.err: at android.app.servertransaction.ActivityTransactionItem.execute(ActivityTransactionItem.java:45)
System.err: at android.app.servertransaction.TransactionExecutor.executeLifecycleState(TransactionExecutor.java:176)
System.err: at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:97)
System.err: at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2307)
  System.err:   at android.os.Handler.dispatchMessage(Handler.java:106)
  System.err:   at android.os.Looper.loopOnce(Looper.java:201)
  System.err:   at android.os.Looper.loop(Looper.java:288)
  System.err:   at android.app.ActivityThread.main(ActivityThread.java:7872)
  System.err:   at java.lang.reflect.Method.invoke(Native Method)
  System.err:   at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:548)
System.err: at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:936)
System.err: Caused by: com.tns.NativeScriptException: Calling js method onDestroy failed
System.err: TypeError: Cannot read properties of null (reading 'unmount')
System.err: at com.tns.Runtime.callJSMethodNative(Native Method)
System.err: at com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:1301)
System.err: at com.tns.Runtime.callJSMethodImpl(Runtime.java:1187)
System.err: at com.tns.Runtime.callJSMethod(Runtime.java:1174)
System.err: at com.tns.Runtime.callJSMethod(Runtime.java:1152)
System.err: at com.tns.Runtime.callJSMethod(Runtime.java:1148)
System.err: at com.tns.NativeScriptActivity.onDestroy(NativeScriptActivity.java:43)
System.err: at android.app.Activity.performDestroy(Activity.java:8562)
System.err: at android.app.Instrumentation.callActivityOnDestroy(Instrumentation.java:1452)
System.err: at android.app.ActivityThread.performDestroyActivity(ActivityThread.java:5396)
System.err: ... 13 more
```

You can reproduce the crash following the steps below:

- Open app
- Click to open the drawer
- Kill the app
- Close the drawer by clicking outside
- You won’t be able to open it again
- Kill the app again
- Crash!
