const defaultState = {
  event: '',
  todos : [],
  dones : [],
}

// state 是store仓库存储的数据
// action 是对数据的操作
export default (state = defaultState, action) => {
  // action while typing
  if(action.type ===  'newEvent'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.event = action.value;
    return newState;
  }
  // action while adding todo
  if(action.type === 'addTodo'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.todos.push(newState.event);
    newState.event = '';
    return newState;
  }

  // if you can't finish the work
  if(action.type == 'giveup'){
    const newState = JSON.parse(JSON.stringify(state));
    const theDone = newState.todos.splice(action.index,1)[0];
    return newState;
  }
  // action while done
  if(action.type === 'done'){
    const newState = JSON.parse(JSON.stringify(state));
    const theDone = newState.todos.splice(action.index,1)[0];
    newState.dones.push(theDone);
    return newState;
  }

  // action undo
  if(action.type === 'undo'){
    const newState = JSON.parse(JSON.stringify(state));
    const theDone = newState.dones.splice(action.index,1)[0];
    newState.todos.push(theDone);
    return newState;
  }
  // action delete
  if(action.type === 'delete'){
    const newState = JSON.parse(JSON.stringify(state));
    const theDone = newState.dones.splice(action.index,1)[0];
    return newState;
  }
  return state;
}
