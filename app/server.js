/*

  DO NOT MODIFY THIS FILE
  READ ONLY!

  < FAKE Server Module >

 */

const todos = [];

export default {
  get(callback) {
    setTimeout(function () {
      callback(todos)
    }, 1000);
  },
  post(data, callback) {
    setTimeout(function () {
      todos.push(data);
      callback(todos);
    }, 1000);
  }
}
