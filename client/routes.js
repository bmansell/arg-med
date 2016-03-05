Router.configure({
    layoutTemplate: 'app'
});

Router.route('/', function() {
    this.redirect('/general')
});

Router.route('/:channel', function() {
    Session.set('channel', this.params.channel);
    this.render('messages');
});

Router.route('/:mediator', function() {
	Session.set('mediatorlist', this,params.mediator);
	this.render('mediators');
});