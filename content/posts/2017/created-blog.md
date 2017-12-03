---
title: "HugeとNetlifyでブログを作った"
date: 2017-12-03T06:24:34+09:00
draft: false
---

タイトルの通り。
静的サイトジェネレーターには[Hugo](https://gohugo.io/)、ホスティングサービスには[Netlify](https://www.netlify.com/)を採用してブログを作成した。
驚くほど簡単で素早く作成することが出来て驚いた。以前はレン鯖なりVPSを借りてWordpressでブログを書いていたものだが、いい時代になったなー。

## Hugoについて

HugoはGoで書かれた静的サイトジェネレーターだ。Markdownで記事を書けばHTMLに変換してくれる。ドキュメントの充実しているしテンプレートも用意されているので特に迷うことなくサクッと作れてしまう。Hugoの他にはNode.jsで書かれた[Hexo](https://hexo.io/)などもあったが、普段仕事でもJavaScriptを書くことが多くどうせなら違う言語をということでHugoを利用することにした。

テンプレート内容はこんな感じ。

```javascript
{{ partial "header.html" . }}
<article class="hp-List">
  {{ range .Data.Pages }}
    <div class="hp-List_Item">
      <time class="Published" datetime="{{.Date.Format "2006-01-02"}}">{{.Date.Format "2006-01-02"}}</time>
      <h1 class="hp-List_Item-title"><a href="{{.Permalink}}">{{.Title}}</a></h1>
    </div>
  {{ end }}
</article>
{{ partial "footer.html" . }}
```
とくにも珍しくもない。あとはMarkdownで記事をかいて、

```
$ Hugo server -D
```

としてやれば記事が変更される度にビルドが走り画面も更新される。

## Netlifyについて

Netlifyは静的リソースのホスティングサービス。Netlifyがいいのは自身のGithub リポジトリと連携しpushする度にCI/CDができること。つまり連携したリポジトリにMarkdownをpushしてやればそれだけで記事を公開できる。またHttps化も可能。そしてこれらが全て無料で利用できる。すごい。なにげにHttp2だし。

## やらなければいけないこと

RssやAnalyticsの設定もまだしていないしPagenateも用意してないが、まあこの辺りもおいおいやっていく。Service Workerも導入していこう。
