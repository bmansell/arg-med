Meteor.startup(function() {
    /* Clear all collections */
    Meteor.users.remove({});
    Messages.remove({});
    Channels.remove({});
    Mediators.remove({});
    Mediatorlist.remove({});

    /* Set up default users */
    var users = [{
        username: 'mediator',
        password: 'mediator',
        roles: ['mediator']
        }, {
        username: 'user1',
        password: 'user',
        roles: ['user']
        }, {
        username: 'user2',
        password: 'user',
        roles: ['user']
    }];

    _.each(users, function(d) {
        var userId = Accounts.createUser({
            username: d.username,
            password: d.password
        });

        Roles.addUsersToRoles(userId, d.roles);
    });

    /* Seed with a few test messages */
    if(Messages.find().count() === 0) {
        for(var i=0; i<10; i++) {
            Messages.insert({text: "Message 1", user: Meteor.users.findOne({'username': 'user1' })._id, timestamp: Date.now(), channel: 'general'});
            Messages.insert({text: "Message 2", user: Meteor.users.findOne({'username': 'mediator' })._id, timestamp: Date.now(), channel: 'general'});
            Messages.insert({text: "Message 3", user: Meteor.users.findOne({'username': 'user2' })._id, timestamp: Date.now(), channel: 'general'});
            Messages.insert({text: "Message 4", user: Meteor.users.findOne({'username': 'user1' })._id, timestamp: Date.now(), channel: 'random'});
            Messages.insert({text: "Message 5", user: Meteor.users.findOne({'username': 'mediator' })._id, timestamp: Date.now(), channel: 'random'});
            Messages.insert({text: "Message 6", user: Meteor.users.findOne({'username': 'user2' })._id, timestamp: Date.now(), channel: 'random'});
        }   
    }

    /* Seed collections */
    Mediators.insert({
        name: 'Mediator 1', text: "Some random text about this mediator"
    });

    Mediatorlist.insert({
        name: 'Request Mediator'
    });

    Channels.insert({
        name: 'general'
    });

    Channels.insert({
        name: 'random'
    });
});