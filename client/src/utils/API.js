import axios from "axios";

export default {
  
  getTopics: function() {
    return axios.get("/api/topics");
  },

  getTopicById: function(id) {
    return axios.get("/api/topics/" + id);
  },
//   // Deletes the book with the given id
  deleteTopic: function(id) {
    console.log('data')
    return axios.delete("/api/topics/" +id);
  },
  // Saves a book to the database
  saveTopic: function(data) {
    console.log('the data coming in', data);
    return axios.post("/api/topics", data);
  },

  saveComment: function(data, id) {
    console.log(data)
    return axios.post("/api/comments" + id,  data)
  }
};