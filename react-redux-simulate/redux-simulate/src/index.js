const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
};

function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;

}

function renderContent(content) {
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = content.text;
  contentDOM.style.color = content.color;
}

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text;
      break;
    case 'UPDATE_CONTENT_TEXT':
      state.content.text = action.content;
      break;
    case 'CHANGE_TITLE_COLOR':
      state.title.color = action.color;
      break;
    default:
      break;
  }
}

function createStore(state, stateChanger) {
  const getState = () => state;

  // 发布订阅部分的内容
  const listeners = [];
  const subscriber = (listener) => { listeners.push(listener) };
  const dispatch = (action) => {
    // 第一步更新状态
    stateChanger(state, action);
    // 第二步执行订阅函数,如果有必要，可以加上Key去判断，哪些是需要执行的订阅函数哪些不是
    listeners.forEach((listener) => listener());
  };

  return { getState, dispatch, subscriber };
}



let store = createStore(appState, stateChanger);
store.subscriber(() => renderApp(store.getState()));// 监听数据变化

renderApp(store.getState());
store.dispatch({ type: 'UPDATE_TITLE_TEXT',text: 'hello 我被修改了' });
store.dispatch({ type: 'UPDATE_CONTENT_TEXT', content: '我是被修改后的content' });
setTimeout(() => {
  store.dispatch({ type: 'UPDATE_TITLE_TEXT',text: 'hello 我又被修改了' });

}, 3000);
