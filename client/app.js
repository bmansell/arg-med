Template.messages.helpers({
    messages: Messages.find({})
})

Template.listings.helpers({
    channels: function() {
        return Channels.find();
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

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Meteor.subscribe('messages');
Meteor.subscribe('allUsernames');