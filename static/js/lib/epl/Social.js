;
define(function() {

var Social = function() {};

Social.postToFeed = function(shareLink, shareImage, shareName, shareCaption, shareDescription) {

        // calling the API ...
        var obj = {
          method: 'feed',
          link: shareLink,
          picture: shareImage,
          name: shareName,
          caption: shareCaption,
          description: shareDescription
        }

        function callback(response) {
            if(response && !response.post_id) {
                alert("error posting to facebook feed");
            }
        }

        FB.ui(obj, callback);
     };

     return Social;
});
