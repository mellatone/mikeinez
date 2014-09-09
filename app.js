App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  // Application specific overrides go here
  host: "http://api.mikeandinez.com"
});

App.ApplicationView = Ember.View.extend({
  classNames: ['app']
});

Ember.RadioButton = Ember.View.extend({  
  tagName : "input",
  type : "radio",
  attributeBindings : [ "name", "type", "value", "checked:checked:" ],
  click : function() {
      this.set("selection", this.$().val())
  },
  checked : function() {
      return this.get("value") == this.get("selection");   
  }.property()
});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('rsvp', {
      first: 'Johnny',
      last: 'Appledseed',
      email: 'jaseed@yahoo.com',
      note: 'Hi, congratulations!',
      ceremony: true,
      reception: true,
      guests: 10
    });
  }
});

App.Rsvp = DS.Model.extend({
  first: DS.attr('string'),
  last: DS.attr('string'),
  email: DS.attr('string'),
  note: DS.attr('string'),
  ceremony: DS.attr('boolean'),
  reception: DS.attr('boolean'),
  guests: DS.attr('number')
});