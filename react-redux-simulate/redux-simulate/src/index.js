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
  const dispatch = (action) => stateChanger(state, action);

  // 发布订阅部分的内容

  return { getState, dispatch };
}



let store = createStore(appState, stateChanger);
store.dispatch({ type: 'UPDATE_TITLE_TEXT',text: 'hello 我被修改了' });
store.dispatch({ type: 'UPDATE_CONTENT_TEXT', content: '我是被修改后的content' });
renderApp(store.getState());//直接将state通过store的getState方法返回
