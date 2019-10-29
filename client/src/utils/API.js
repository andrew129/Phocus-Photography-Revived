import axios from "axios";

export default {
  // Gets all comments
  getComments: function() {
    return axios.get("/api/comments");
  },
//   // Gets the book with the given id
//   getComment: function(id) {
//     return axios.get("/api/comments/" + id);
//   },
//   // Deletes the book with the given id
//   deleteComment: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
  // Saves a book to the database
  saveComment: function(data) {
    console.log('the data coming in', data);
    return axios.post("/api/comments", data);
  }
};