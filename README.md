# React-async-mode
react 同步渲染对比异步渲染的 demo

## START
> yarn start

访问：local:8080

## React Fiber asynchronous rendering
1. use React.unstable_ConcurrentMode
```
const ConcurrentMode = React.unstable_ConcurrentMode;

<ConcurrentMode>
  <App /> // Low Priority by default
</ConcurrentMode>
```
`<ConcurrentMode>` 使得它的子组件能异步更新，并且以较低优先级更新。

2. `ReactDOM.flushSync(cb)`
```
ReactDOM.flushSync(() => {
    // do something
});
```
这个方法使得你能进行同步的更新操作