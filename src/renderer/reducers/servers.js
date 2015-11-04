import * as types from '../actions/servers';


const INITIAL_STATE = {
  items: [],
};


export default function servers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOAD_SERVERS_SUCCESS:
    return {
      ...state,
      items: action.servers,
    };
  case types.SAVE_SERVER_SUCCESS:
    return {
      ...state,
      items: save(state.items, action.server),
      error: null,
    };
  case types.REMOVE_SERVER_SUCCESS:
    return {
      ...state,
      items: remove(state.items, action.id),
      error: null,
    };
  case types.SAVE_SERVER_FAILURE:
  case types.REMOVE_SERVER_FAILURE: {
    return {
      ...state,
      error: action.error.validationErrors,
    };
  }
  default:
    return state;
  }
}


function save(items, server) {
  const _items = ([...items] || []);
  const index = server.id && _items.findIndex(srv => srv.id === server.id);
  if (index) {
    _items[index] = server;
  } else {
    _items.push(server);
  }
  return _items;
}


function remove(items, id) {
  const index = items.findIndex(srv => srv.id === id);
  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
}