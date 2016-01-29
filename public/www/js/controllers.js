angular.module('starter.controllers', ['starter.services','ngCordova'])

.controller('AppCtrl', function($scope) {
})


.controller('ChatsCtrl', function($scope) {


})

.controller('PlaylistCtrl', function($scope) {
})
.controller('LoginCtrl', function ($scope,$http,Chats) {
 $scope.addUser =function(){
    $http.post('/register', $scope.user).success(function(res){
      socket = Chats.getsocket();
      socket.emit('welcome','welcome');
      Chats.setSenderData($scope.user);
    })
  }
})
.controller('GroupCtrl', function($scope) {
})
  .controller('ChatDetailCtrl',['$scope','Chats','$http',function($scope,Chats){
    var socket = Chats.getsocket();
    $scope.messages = [];
      $scope.refresh =function(){
        senderData = Chats.getSenderData();
          receiverData = Chats.getName();
        $scope.receiver  = receiverData.displayName;
          return true;
      }

    $scope.send = function (u) {
      room = [senderData.phoneNumbers, receiverData.phoneNumbers];

      user ={
        Room : room.sort(),
        msgText : u.msgText,
        receiver_no : receiverData.contact,
        date : Date()
      }
      console.log(u.msgText);
        socket.emit('chatmessage',user);
      u.msgText = '';

    }
    socket.on('showmsg',function(data){
      $('#messages').text('');
      for (i in data) {
        $('#messages').append($('<li>').text(data[i].msgText));
        console.log(data[i].msgText);
      }
    })

  }])

.controller('ContactCtrl', function($scope,$http,$cordovaContacts,Chats) {
  $scope.getContactList = function() {
    $cordovaContacts.find({filter:''}).then(function(response){
      $scope.userList =response;
    }, function(err) {
      console.log ('Error' +err);
    })
  }

  $scope.sendReceiver = function($event, name) {
    console.log(name);
    Chats.setName(name);
  }
  //$scope.getContactList();

  $http.get('/contacts').success(function(response){

    $scope.userList =response;
  })
})
.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
