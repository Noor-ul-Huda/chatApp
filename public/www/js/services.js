angular.module('starter.services', [])

.service('Chats', function() {
    // Might use a resource here that returns a JSON array
  //gets and sets receiver name
    this.getName = function() {
      return this.receiverName;
    }
    this.setName = function(receiver){
      this.receiverName = receiver;
    }

  //gets and sets sender data

  this.getSenderData = function(){
    return this.senderName;
  }

  this.setSenderData = function(sender){
    this.senderName = sender;
  }
  this.getsocket = function(){
    this.socket =  io.connect('http://192.168.15.34:3000');
    return this.socket;
  }
  })
