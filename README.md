# Jotaiに入門する

# 📕Overview
https://jotai.org/

はじめに
JotaiはグローバルなReactの状態管理にアトミックアプローチを採用しています。

アトムを組み合わせて状態を構築し、アトムの依存関係に基づいてレンダリングが自動的に最適化されます。これにより、Reactコンテキストの余分な再レンダリングの問題を解決し、メモ化の必要性を排除し、宣言的なプログラミングモデルを維持しながら、シグナルと同様の開発者体験を提供します。

単純なuseStateの置き換えから、複雑な要件を持つエンタープライズTypeScriptアプリケーションまで拡張できる。さらに、ユーティリティや拡張機能も充実している！

Jotai は、以下のような革新的な企業で信頼されています。


簡単なJotaiアプリケーションの作成手順を説明します。インストールから始まり、コア API の基本を学び、最後に React フレームワークでサーバーサイドレンダリングを行います。

インストール
まず、Jotai を依存関係として React プロジェクトに追加します。
```bash
npm i jotai
```

アトムの作成
状態を構築するために、まずプリミティブ・アトムと派生アトムを作成する。

プリミティブ・アトム
プリミティブ・アトムは、ブーリアン、数値、文字列、オブジェクト、配列、セット、マップなど、どのような型でも構わない。

```ts
import { atom } from 'jotai'

const countAtom = atom(0)

const countryAtom = atom('Japan')

const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])

const animeAtom = atom([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false
  }
])
```

派生アトム
派生アトムは、自身の値を返す前に他のアトムから読み取ることができる。
```ts
const progressAtom = atom((get) => {
  const anime = get(animeAtom)
  return anime.filter((item) => item.watched).length / anime.length
})
```

アトムを使う
次に、Reactコンポーネント内でアトムを使って、状態を読み書きする。

同じコンポーネントから読み書きする
同じコンポーネント内でアトムの読み込みと書き込みを行う場合は、useAtomフックを併用すると簡単です。
```tsx
import { useAtom } from 'jotai'

const AnimeApp = () => {
  const [anime, setAnime] = useAtom(animeAtom)

  return (
    <>
      <ul>
        {anime.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button onClick={() => {
        setAnime((anime) => [
          ...anime,
          {
            title: 'Cowboy Bebop',
            year: 1998,
            watched: false
          }
        ])
      }}>
        Add Cowboy Bebop
      </button>
    <>
  )
}
```

## 🧷summary
ブラウザで動くサンプルコードがあり簡単なカウンターから、ダークモードでへの切り替えができるサンプルが紹介されております。

ReduxToolKitのように、Providerで、App.tsxをラップしなくても状態管理ライブラリを使用することを始めることができます。

簡単ですね。ReduxToolKitだとStoreとSliceが必要でしたね。Reduxだとアクションだとか複数の要素が必要だったはず...

見た目がカッコよくなかったので、CSSで少し見た目変えてみました。

少ないコードでグローバルに状態の管理ができるらしい。グローバルってことは全てのページで状態を共有できるということ。

公式のカウンターのサンプルだと１ページしか使ってないので、`useState`との違いがわからなかった。

atomディレクトリを作成して、`counter.ts`というファイルを作成してください。
そのまま使っても面白くないので、TypeScriptで書いてるから型をジェネリティクスを使ってつけました。

```ts
import { atom } from "jotai";

export const counter = atom<number>(0);
```

こちらはボタンをクリックするとカウントされるコンポーネントです。カウンターの親のコンポーネントとしておきましょう。

親のカウンターのコンポーネント:
```tsx
import { useAtom } from 'jotai';
import { counter } from '../atom/counter';
import './Counter.css';

export default function Counter() {
  const [count, setCounter] = useAtom<number>(counter);
  const onClick = (): void => setCounter(prev => prev + 1);
  return (
    <div className='countContainer'>
      <h1 className='countValue'>{count}</h1>
      <button className='countButton' onClick={onClick}>Click</button>
    </div>
  )
}
```

カウンターのCSS:
```css
.countContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;

}

.countValue {
    font-size: 2rem;
    font-weight: bold;
    color: #000;
    margin: auto;
}

.countButton {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5%;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}
```

状態だけ共有して実験したかったのでボタンなしの子のカウンターのコンポーネントを作成しました。
```tsx
import { useAtom } from 'jotai';
import { counter } from '../atom/counter';
import './Counter.css';

export default function ChildCounter() {
  const [count] = useAtom<number>(counter);
  
  return (
    <div className='countContainer'>
      <h1 className='countValue'>{count}</h1>
    </div>
  )
}
```

`App.tsx`でコンポーネントをimportして、ローカルサーバーを起動してみましょう。
```tsx
import ChildCounter from "./components/ChildCounter"
import Counter from "./components/Counter"

function App() {

  return (
    <>
      <Counter />
      <ChildCounter />
    </>
  )
}

export default App
```

[公式チュートリアル](https://tutorial.jotai.org/quick-start/intro)

## 🧑‍🎓thoughts
Jotaiを使ってみた感想ですが、複数の設定ファイルを作ることなくどこからでも値にアクセスして状態の管理ができました。
どこのページでも使えて、ページAの状態をページBで共有することができたりするので、とても分かりやすくて、使いやすい状態管理のライブラリでした。