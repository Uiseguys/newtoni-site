import { createStore as reduxCreateStore, combineReducers } from "redux";

const windowGlobal = typeof window !== "undefined" && window;
const defaultState = {
  count: 0,
  total: 0,
  shipping: 0,
  grandTotal: 0,
  items: []
};

const save = state =>
  windowGlobal && localStorage.setItem("cart", JSON.stringify(state));
const load = () => windowGlobal && JSON.parse(localStorage.getItem("cart"));
const cartStateValid = cartState =>
  cartState &&
  cartState.items &&
  cartState.count != undefined &&
  cartState.grandTotal != undefined;

const sum = (accumulator, value) => accumulator + value;
const countFunc = (items = []) =>
  items.map(item => item.quantity).reduce(sum, 0);
const totalFunc = (items = []) => items.map(item => item.total).reduce(sum, 0);
const shippingFunc = count => (count < 12 ? 5.5 : 0);

const rootReducer = (state = defaultState, { type, payload = {} }) => {
  const { quantity = 1, item } = payload;
  let newState, newItem, filteredItems;
  let count, items, shipping, total, grandTotal;
  console.log(type, payload);
  switch (type) {
    case "ADD":
      items = state.items.filter(i => i.id == item.id);
      newItem = items[0] || item;
      newItem.quantity = newItem.quantity || 0;
      newItem.quantity += quantity;
      newItem.total = item.price * newItem.quantity;

      filteredItems = state.items.filter(i => i.id != item.id);

      items = [newItem, ...filteredItems];
      count = countFunc(items);
      shipping = shippingFunc(count);
      total = totalFunc(items);
      grandTotal = total + shipping;
      newState = { count, items, shipping, total, grandTotal };
      save(newState);
      console.log(newState);
      return newState;

    case "REMOVE":
      item.quantity -= quantity;
      item.total = item.price * item.quantity;
      let pos = state.items.indexOf(item);

      //items = state.items.filter((i) => i.id != item.id)
      items = state.items;
      item.quantity <= 0 ? items.splice(pos, 1) : items.splice(pos, 1, item);
      count = countFunc(items);
      shipping = shippingFunc(count);
      total = totalFunc(items);
      grandTotal = total + shipping;
      newState = { count, items, shipping, total, grandTotal };
      console.log(newState);
      save(newState);
      return newState;

    case "CLEAR":
      save(defaultState);
      return defaultState;
  }

  return state;
};

let cartState = load();
if (!cartStateValid(cartState)) {
  cartState = defaultState;
  save(cartState);
}

const initialState = cartState;

const createStore = () => reduxCreateStore(rootReducer, initialState);
export default createStore;
