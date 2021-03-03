# Gazo-diff-checker

サイトのキャプチャをpuppeteerで取得し、Gazo-sanで画像の比較をおこないます。


### サイトのキャプチャをpuppeteerで取得し保存

```
# docker-compose exec app bash
root@6aa77f406dcb:/# node capture.js https://www.yahoo.co.jp
```
### キャプチャの差分をGazo-sanで取得

```
# docker-compose exec gazosan bash
root@6aa77f406dcb:/# gazosan /screenshots/20210302_top.png /screenshots/20210301_top.png /output/output --create-change-image
```
