Meteor.startup(function() {
    /* Clear all collections */
    Meteor.users.remove({});
    Messages.remove({});
    Channels.remove({});
    Mediators.remove({});

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
        Messages.insert({text: "Message 1", user: 'user1', timestamp: Date.now(), channel: 'general'});
        Messages.insert({text: "Message 2", user: 'user2', timestamp: Date.now(), channel: 'general'});
        Messages.insert({text: "Message 3", user: 'mediator', timestamp: Date.now(), channel: 'general'});
        Messages.insert({text: "Message 4", user: 'user1', timestamp: Date.now(), channel: 'random'});
        Messages.insert({text: "Message 5", username: 'user2', timestamp: Date.now(), channel: 'random'});
        Messages.insert({text: "Message 6", username: 'mediator', timestamp: Date.now(), channel: 'random'});
        Messages.insert({text: "Random stuff about mediator", channel: 'request mediator'})
    }

    /* Seed collections */
    Mediators.insert({
        name: 'request mediator'
    });

    Channels.insert({
        name: 'general'
    });

    Channels.insert({
        name: 'random'
    });
});