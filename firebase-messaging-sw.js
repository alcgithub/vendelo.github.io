importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;

firebase.initializeApp({
  apiKey: 'AIzaSyAyQCPoQoA9zslAO8R6kk6BdxWeZfjhqa8',
  authDomain: 'vendelo-fcm.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'vendelo-fcm',
  storageBucket: 'vendelo-fcm.appspot.com',
  messagingSenderId: '1007264258453',
  appId: '1:1007264258453:web:abae8200d198ac0f967e9c',
  measurementId: 'G-Y8XVDPLMNZ',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                data: payload.notification.data,
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});