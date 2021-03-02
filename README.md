# Gazo-diff-checker
画像の差分比較チェックツール

画像をpuppeteerで取得し、Gazo-sanで画像の比較をおこないます。


### サイトのキャプチャをpuppeteerで取得し保存

```
# docker-compose exec app bash
root@6aa77f406dcb:/# node capture.js
```
### キャプチャの差分をGazo-sanで取得し画像で保存する

```
# docker-compose exec gazosan bash
root@6aa77f406dcb:/# gazosan /screenshots/20210302_top.png /screenshots/20210301_top.png /output/output --create-change-image
```
