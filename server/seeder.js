Meteor.startup(function() {

    Meteor.users.remove({});
    Messages.remove({});
    Channels.remove({});

    var users = [{
        username: 'admin',
        password: 'admin',
        roles: ['admin']
        }, {
        username: 'mediator',
        password: 'mediator',
        roles: ['mediator']
    }];

    _.each(users, function(d) {
        var userId = Accounts.createUser({
            username: d.username,
            password: d.password
        });

        Roles.addUsersToRoles(userId, d.roles);
    });

    Mediators.insert({
        name: 'request mediator'
    });

    Channels.insert({
        name: 'general chat'
    });

    Channels.insert({
        name: 'random chat'
    });
});