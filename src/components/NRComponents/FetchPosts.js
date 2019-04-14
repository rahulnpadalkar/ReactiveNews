/** 
 * This non representatonal component will fetch posts form Hacker news based on:
 *      - Category ie Top, Best, New etc.
 *      - By Post ID
 * */

 import axios from 'axios';
 const hackerNews = 'https://hacker-news.firebaseio.com/v0/';

 export const FetchService =  {

    fetchPostsByCategory: function(category) {

        var queryURL = generateQueryURL(category);
        return axios.get(queryURL);
    
     },

     fetchPostsById: function(id) {

        var queryURL = generateQueryURL(id, true);
        return axios.get(queryURL);
    
     },

     fetchBulkPostsById: function(itemsIds) {      
         let promises = [];
         itemsIds.forEach(function(itemId){

            let queryURL = generateQueryURL(itemId, true);
            promises.push(axios.get(queryURL));
         });

         return Promise.all(promises);
     }

 };

 function generateQueryURL(resourceName, IfItem) {
    //Currently on JSON response is supported
    var format = 'json', item = 'item/'
    if(IfItem) {
        return hackerNews + item + resourceName + '.' + format;
    }
    return hackerNews + resourceName + '.' + format;
 }
