App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://api.mikeandinez.com"
});

App.ApplicationView = Ember.View.extend({
  elementId: 'app'
});

App.Router.map(function() {
  this.route('thanks');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('rsvp');
  }
});
App.Rsvp = DS.Model.extend({
  first: DS.attr('string'),
  last: DS.attr('string'),
  email: DS.attr('string'),
  note: DS.attr('string'),
  ceremony: DS.attr('number', {defaultValue: 0}),
  reception: DS.attr('number', {defaultValue: 0}),
  isAttending: DS.attr('boolean')
});
App.IndexController = Ember.ObjectController.extend({
  isNotAttending: false,
  ceremonyOnly: 0,
  receptionOnly: 0,
  ceremonyAndReception: 0,
  ceremonyCounter: function() {
    var count = parseInt(this.get('ceremonyOnly')) + parseInt(this.get('ceremonyAndReception'));
    this.set('ceremony', count);
  }.observes('ceremonyOnly', 'ceremonyAndReception'),
  receptionCounter: function() {
    var count = parseInt(this.get('receptionOnly')) + parseInt(this.get('ceremonyAndReception'));
    this.set('reception', count);
  }.observes('receptionOnly', 'ceremonyAndReception'),
  actions: {
    willAttend: function(yes) {
      var isAttending = (yes) ? true : false,
          isNotAttending = (yes) ? false : true;
      this.setProperties({
        isAttending: isAttending,
        isNotAttending: isNotAttending,
        ceremony: 0,
        reception: 0
      });
    },
    sendConfirmation: function() {
      this.transitionToRoute('thanks');
    }
  }
});
App.ThanksController = Ember.Controller.extend({
  needs: 'index',
  isAttendingBinding: 'controllers.index.content.isAttending'
});