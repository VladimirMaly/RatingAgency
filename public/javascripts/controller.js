var app = angular.module('ratingAgency', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
 function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider.state('api', {
    url: '/api',
    templateUrl: 'views/homepage.ejs',
    controller: 'MainCtrl',
  })

  $stateProvider.state('usersSelection', {
    url: '/usersSelection',
    templateUrl: 'views/users.ejs',
    controller: 'UserCtrl',
  })

  $stateProvider.state('storesSelection', {
    url: '/storesSelection',
    templateUrl: 'views/stores.ejs',
    controller: 'StoresCtrl',
  })

   $stateProvider.state('reviewsSelection', {
    url: '/reviewsSelection',
    templateUrl: 'views/reviews.ejs',
    controller: 'ReviewsCtrl',
  })

  $urlRouterProvider.otherwise('usersSelection');
  $locationProvider.html5Mode(true);
}]);

app.controller('UserCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {
  $scope.createUser = function() {
    var reqData = {};
    if ($scope.userCreateId != "") {
      reqData._id = $scope.userCreateId;
    }
    if ($scope.userCreateUsername != "") {
      reqData.username = $scope.userCreateUsername;
    }
    if ($scope.userCreateFirstName != "") {
      reqData.firstname = $scope.userCreateFirstName;
    }
    if ($scope.userCreateLastName != "") {
      reqData.lastname = $scope.userCreateLastName;
    }
    if ($scope.userCreateSex != "") {
      reqData.sex = $scope.userCreateSex;
    }
    if ($scope.userCreateAge != "") {
      reqData.age = parseInt($scope.userCreateAge);
    }
    $http({ method: 'POST', url: '/user', data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getUserByUsername = function() {
    var optionString = "?username=" + $scope.userUsername;
    if ($scope.userUsername == ""){
      optionString = "?username=''";
    }
    $http({ method: 'GET', url: '/user' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getUserById = function() {
    var optionString = "?id=" + $scope.userId;
    if ($scope.userId == ""){
      optionString = "?id=''";
    }
    $http({ method: 'GET', url: '/user' + optionString })
      // .then(function(response) {
      //     $scope.textArea = JSON.stringify(response.data);
      //     document.getElementById("formattedTextArea").innerHTML = syntaxHighlight(response.data);
      // })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.deleteUserbyId = function() {
    var optionString =  "?id=" + $scope.deleteUserId;
    $http({ method: 'DELETE', url: '/user' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getUsers = function() {
    var optionString = "";
    var alreadyAddedOption = false;
    if ($scope.getUserFirstname !== "" ) {
      optionString += "?firstname=" + $scope.getUserFirstname;
      alreadyAddedOption = true;
    }
    if ($scope.getUserLastname !== "" ) {
      if (alreadyAddedOption) {
        optionString += "&";
      }
      else {
        optionString += "?";
      }
      optionString += "lastname=" + $scope.getUserLastname;
      alreadyAddedOption = true;
    }
    if ($scope.getUserAge !== "" ) {
      if (alreadyAddedOption) {
        optionString += "&";
      }
      else {
        optionString += "?";
      }
      optionString += "age=" + $scope.getUserAge;
      alreadyAddedOption = true;
    }
    if ($scope.getUserSex !== "" ) {
      if (alreadyAddedOption) {
        optionString += "&";
      }
      else {
        optionString += "?";
      }
      optionString += "sex=" + $scope.getUserSex;
      alreadyAddedOption = true;
    }
    $http({ method: 'GET', url: '/users' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.modifyUserbyId = function() {
    var optionString =  "?id=" + $scope.userModifyId;
    var reqData = {};
    if ($scope.userModifyFirstName != "") {
      reqData.firstname = $scope.userModifyFirstName;
    }
    if ($scope.userModifyLastName != "") {
      reqData.lastname = $scope.userModifyLastName;
    }
    if ($scope.userModifySex != "") {
      reqData.sex = $scope.userModifySex;
    }
    if ($scope.userModifyAge != "") {
      reqData.age = $scope.userModifyAge;
    }
    $http({ method: 'PUT', url: '/user' + optionString, data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea1").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }
}]);

app.controller('StoresCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.createStore = function() {
    var reqData = {};
    if ($scope.storeCreateStorename != "") {
      reqData.storename = $scope.storeCreateStorename;
    }
    if ($scope.storeCreateCategory != "") {
      reqData.category = $scope.storeCreateCategory;
    }
    if ($scope.storeCreateAddress != "") {
      reqData.address = $scope.storeCreateAddress;
    }
    if ($scope.storeCreateId != "") {
      reqData._id = $scope.storeCreateId;
    }
    $http({ method: 'POST', url: '/store', data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getStoreById = function() {
    var optionString = "?id=" + $scope.storeId;
    $http({ method: 'GET', url: '/store' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.deleteStoreById = function() {
    var optionString =  "?id=" + $scope.deleteStoreId;
    $http({ method: 'DELETE', url: '/store' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getStores = function() {
    var optionString = "";
    var alreadyAddedOption = false;
    if ($scope.storeCategory !== "" ) {
      optionString += "?category=" + $scope.storeCategory;
      alreadyAddedOption = true;
    }
    if ($scope.storeStorename !== "" ) {
      if (alreadyAddedOption) {
        optionString += "&";
      }
      else {
        optionString += "?";
      }
      optionString += "storename=" + $scope.storeStorename;
      alreadyAddedOption = true;
    }
    $http({ method: 'GET', url: '/stores' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.modifyStoreById = function() {
    var optionString =  "?id=" + $scope.storeModifyId;
    var reqData = {};
    if ($scope.storeModifyStorename != "") {
      reqData.storename = $scope.storeModifyStorename;
    }
    if ($scope.storeModifyCategory != "") {
      reqData.category = $scope.storeModifyCategory;
    }
    if ($scope.storeModifyAddress != "") {
      reqData.address = $scope.storeModifyAddress;
    }
    if ($scope.storeModifyId != "") {
      reqData._id = $scope.storeModifyId;
    }
    $http({ method: 'PUT', url: '/store' + optionString, data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea2").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }
}]);

app.controller('ReviewsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.createReview = function() {
    var reqData = {};
    if ($scope.reviewCreateUserID != "") {
      reqData.userID = $scope.reviewCreateUserID;
    }
    if ($scope.reviewCreateStoreID != "") {
      reqData.storeID = $scope.reviewCreateStoreID;
    }
    if ($scope.reviewCreateRating != "") {
      reqData.rating = $scope.reviewCreateRating;
    }
    if ($scope.reviewCreateComment != "") {
      reqData.comment = $scope.reviewCreateComment;
    }
    if ($scope.reviewCreateId != "") {
      reqData._id = $scope.reviewCreateId;
    }
    $http({ method: 'POST', url: '/review', data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.modifyReviewById = function() {
    var optionString =  "?id=" + $scope.reviewModifyId;
    var reqData = {};
    if ($scope.reviewModifyStoreID != "") {
      reqData.storeID = $scope.reviewModifyStoreID;
    }
    if ($scope.reviewModifyUserID != "") {
      reqData.userID = $scope.reviewModifyUserID;
    }
    if ($scope.reviewModifyRating != "") {
      reqData.rating = $scope.reviewModifyRating;
    }
    if ($scope.reviewModifyComment != "") {
      reqData.comment = $scope.reviewModifyComment;
    }
    $http({ method: 'PUT', url: '/review' + optionString, data: angular.toJson(reqData) })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getReviewById = function() {
    var optionString = "?id=" + $scope.reviewId;
    $http({ method: 'GET', url: '/review' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getReviewByStoreID = function() {
    var optionString = "?storeid=" + $scope.reviewStoreID;
    $http({ method: 'GET', url: '/review' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.getReviewByUserID = function() {
    var optionString = "?userid=" + $scope.reviewUserID;
    $http({ method: 'GET', url: '/review' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }  

  $scope.deleteReviewId = function() {
    var optionString =  "?id=" + $scope.deleteReviewIdModel;
    $http({ method: 'DELETE', url: '/review' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.deleteReviewStoreName = function() {
    var optionString =  "?storeid=" + $scope.deleteReviewStoreNameModel;
    $http({ method: 'DELETE', url: '/review' + optionString })
      .success(function (response) {
          $scope.textArea = JSON.stringify(response);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
      })
      .error(function (error, status) {
          var errorJson = { message: error, status: status};
          $scope.textArea = JSON.stringify(errorJson);
          document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
          console.log(errorJson); 
      });
  }

  $scope.deleteReviewUserID = function() {
  var optionString =  "?userid=" + $scope.deleteReviewUserIDModel;
  $http({ method: 'DELETE', url: '/review' + optionString })
    .success(function (response) {
        $scope.textArea = JSON.stringify(response);
        document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(response);
    })
    .error(function (error, status) {
        var errorJson = { message: error, status: status};
        $scope.textArea = JSON.stringify(errorJson);
        document.getElementById("formattedTextArea3").innerHTML = syntaxHighlight(errorJson);
        console.log(errorJson); 
    });
  }
}]);

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        var returnString = '<span class="' + cls + '">' + match + '</span>';
        if (cls != "key"){
          returnString = '<span class="' + cls + '">' + match + '</span><br>';
        }
        return returnString;
    });
}