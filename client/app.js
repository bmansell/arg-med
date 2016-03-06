Template.messages.helpers({
    messages: Messages.find({})
})

Template.listings.helpers({
    channels: function() {
        return Channels.find();
    }
});

Template.mediators.helpers({
    mediators: function() {
        return Mediatorlist.find();
    }
});

Template.registerHelper('timestampToTime', function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();

    return hours + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
});

Template.registerHelper('usernameFromId', function (userId) {
    var user = Meteor.users.findOne({_id: userId});

    return user.username;
});

Template.registerHelper('currentChannel', function() {
    return Session.get('channel');
});

Template.channel.helpers({
    active: function() {
        if(Session.get('channel') === this.name) {
            return 'active';
        } else {
            return '';
        } 
    }
});

Template.users.helpers({
    users: function() {
        return Meteor.users.find().fetch();
    }
});

Template.mediator.helpers({
    active: function() {
        if(Session.get('mediator') === this.name) {
            return 'active';
        } else {
            return '';
        }
    }
});

Template.addchannel.events({
    'submit form': function(event, instance) {
        event.preventDefault();
        var name = instance.find('input').value;
        instance.find('input').value = '';

        Channels.insert({name: name});
    }
});

Template.myreveal.onRendered(function () {
  this.myrevealInstance = new Foundation.Reveal($('#myreveal'));
});

Template.myreveal.onDestroyed(function () {
  let reveal = this.myrevealInstance;
  if (reveal) {
    reveal.destroy();
  }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Meteor.subscribe('messages');
Meteor.subscribe('allUsernames');
Meteor.subscribe('mediators');