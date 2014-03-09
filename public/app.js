window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };

  }
};
$(document).ready(function(){
  App.initialize();
});

App.Routers.Main = Backbone.Router.extend({
  routes: {"":"index"},
  index: function(){
    var view = new App.Views.Index();
    $("#container").html(view.render().el);
  }
});

App.Views.Index = Backbone.View.extend({
  id: "index",
  // template: HandlebarsTemplates,
  events: {
    'onkeypress #search_bar': "start"
  },
  render: function(){
    // this.$el.html(this.template());
    $(this.el).html("<input id=\"search\" type=\"text\">Search</input>");

    return this;
  },

  start: function(event){
    event.preventDefault();

    var search = $("#search").val();
    var view = new App.Views.Result({});
    this.$el.append(view.render().el);

  }

});

App.Views.Result = Backbone.Router.extend({
  
  
});

