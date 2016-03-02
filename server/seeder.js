Meteor.startup(function() {

    Meteor.users.remove({});
    Messages.remove({});
    Channels.remove({});

    Accounts.createUser({
        username: 'admin',
        password: 'admin'
    });

    Channels.insert({
        name: 'general'
    });

    Channels.insert({
        name: 'random'
    });
});