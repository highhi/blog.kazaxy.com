---
title: "Service Workerを利用するときの2つの配慮"
date: 2017-12-07T21:16:24+09:00
draft: false
---

このブログに`Service Worker`を導入して`css`をキャッシュした。これで`css`に関してはキャッシュさえあればサーバーへリクエストすることなくレスポンスを得ることができる。

![キャッシュされたcss](/img/posts/2017/two-tips-sw/img2.jpg)

ChromeのDevtoolで`Cach Storage`の中を確認すると`css`がちゃんとキャッシュされていることを確認できる。次に`Network`パネルを開きキャッシュから取得できているか確認する。

![キャッシュされたcssがservice workerから返されている様子](/img/posts/2017/two-tips-sw/img1.jpg)

`css`の`size`タブの値を見ると`from Service Worker`なっているのが分かる。よしよし。

さて、実装にあたり配慮した点が2つある

## 配慮1 Service WorkerのインストールはLoadイベント終了後に行う。

これはコードで例を書いたほうが早い。よく紹介されているのは以下のような書き方だが

```javascript
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(registration => {
    //...
  });
}
```

これを以下のように修正する。

```javascript
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(registration => {
      //...
    });
  }
}
```

ユーザーにとって最も必要なのは`HTML`や`CSS`、画像といった画面構成するリソースであって`Service Worer`ではない。限られた帯域幅を有効に使うためにも`Service Worer`のインストールはそれらのリソースのダウンロードが終わった後に実行した方がいい。

## 配慮2 不要なリクエストをService Worerから投げないようにする

この点についても最初にコードを例を書く。

```javascript
self.addEventListener('fetch', event => {
  const fetching = caches.match(event.request).then(response => {
    return response || fetch(event.request);
  });

  event.respondWith(fetching);
});
```

これを以下のように修正する。

```javascript
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // キャッシュ対象外のリクエストの場合はアーリーリターンする
  if (!assets.some(file => url.includes(file))) {
    return;
  }

  const fetching = caches.match(event.request).then(response => {
    return response || fetch(event.request);
  });

  event.respondWith(fetching);
});
```
キャッシュ対象外のリクエストの場合は`fetch()`によるリクエストが発生する前に`return`する。アーリーリターンした場合は通常のリクエストが行われる。なぜこうするかというと`Service Worker`の中から投げたリクエストは通常のリクエストより遅いからだ。

また`Network`パネル中で`Service Worker`によって発生したリクエストが歯車アイコン付きで表示されるが、アーリーリターンしておかないと全てのリクエストに対してこれが表示され非常に見づらくなる。純粋に邪魔なだけなのでアーリーリターンしておくことは重要だと思う。

![開発中のNetworkパネルの様子](/img/posts/2017/two-tips-sw/img3.jpg)

**参考**

+ [Service Worker 登録](https://developers.google.com/web/fundamentals/primers/service-workers/registration?hl=ja)
+ [Service Worker で横取りしたリクエストをネットワークにフォールバックさせたい時はただ return するべき](https://qiita.com/nhiroki/items/6d3f79930bb5c7164d6e)
