Router.configure({
    layoutTemplate: 'app'
});

Router.route('/', function() {
    this.redirect('/general chat')
});

Router.route('/:channel', function() {
    Session.set('channel', this.params.channel);
    this.render('messages');
});

Router.route('/:mediator', function() {
	this.redirect('/request mediator')
});