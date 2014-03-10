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
  routes: {
    "":"index",
    ":params": "index_with_params"
  },
  index: function(){
    var view = new App.Views.Index();
    $("#container").html(view.render().el);
  },

  index_with_params: function(params){
    // console.log("hello");
    
    var view = new App.Views.Index();
    $("#container").html(view.render().el);
    setTimeout(function(){
      view.start_with_params(params);
    },1000);


  }
});

App.Views.Index = Backbone.View.extend({
  id: "index",
  // template: HandlebarsTemplates,
  events: {
    "keyup #search": "start"
  },
  render: function(){
    // this.$el.html(this.template());
    $(this.el).html("<input id=\"search\" type=\"text\">Search</input>");

    return this;
  },

  start: function(){
    console.log(this.model);
    var search = $("#search").val();
    var result = App.autocompleter.complete(search);
    var list = "";
    $.each(result, function(index, res){
      list += "<li><a href=\"http://en.wikipedia.org/wiki/"+res+"\">"+res+"</a></li>";

    });
    $("#results").html(list);
  },

  start_with_params: function(params){
    console.log(this.model);
    var search = $("#search").val();
    var result = App.autocompleter.complete(params);
    var list = "";
    $.each(result, function(index, res){
      list += "<li><a href=\"http://en.wikipedia.org/wiki/"+res+"\">"+res+"</a></li>";

    });
    $("#results").html(list);
  }
});

// App.Views.Result = Backbone.Router.extend({
  
//   render: function(){
//     $(this.el).html("<div>")
//     return this;
//   };


// });

