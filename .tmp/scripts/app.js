(function() {
  var converter;

  window.App = Em.Application.create({
    log_transitions: true
  });

  App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
  });

  App.Router.map(function() {
    this.route('about');
    return this.resource('posts', function() {
      return this.resource('post', {
        path: ':post_id'
      });
    });
  });

  App.PostsRoute = Em.Route.extend({
    model: function() {
      return App.Post.find();
    }
  });

  App.PostController = Em.ObjectController.extend({
    isEditing: false,
    edit: function() {
      return this.set('isEditing', true);
    },
    doneEditing: function() {
      return this.set('isEditing', false);
    }
  });

  App.Post = DS.Model.extend({
    title: DS.attr('string'),
    author: DS.attr('string'),
    intro: DS.attr('string'),
    description: DS.attr('string'),
    publishedat: DS.attr('date')
  });

  App.Post.FIXTURES = [
    {
      id: 1,
      title: "I've send you a birthday greeting by email",
      author: 'Lin',
      intro: "Today really a *good day*, because you are around",
      publishedAt: new Date(1985, 3, 14),
      description: "ay** before, I was still jerking off in my car, in the middle noon Thursday. There is a old lady who trying to park her car in the block next to me, when I was about to move my luggage in the front row. I thought she is too old to notice the unusual activity was going on, but unfortunitily she does. so they maybe report a suspected car was parking outside the community parking lot and propbly sleeping there for the night."
    }, {
      id: 2,
      title: "I've received a bithday greeting by email",
      author: 'Sheepsheep',
      intro: "Today I'm not happy, because you are not near",
      publishedAt: new Date(1984, 9, 1),
      description: "It should be the day before, I was still jerking off in my car, in the middle noon Thursday. There is a old lady who trying to park her car in the block next to me, when I was about to move my luggage in the front row. I thought she is too old to notice the unusual activity was going on, but unfortunitily she does. so they maybe report a suspected car was parking outside the community parking lot and propbly sleeping there for the night."
    }
  ];

  App.ApplicationController = Em.Controller.extend({
    title: 'MakLog'
  });

  Em.Handlebars.registerBoundHelper('date', function(date) {
    return moment(date).fromNow();
  });

  converter = new Showdown.converter();

  Em.Handlebars.registerBoundHelper('markdown', function(input) {
    return new Handlebars.SafeString(converter.makeHtml(input));
  });

  Em.Handlebars.registerBoundHelper('highlight', function(input) {
    return new Handlebars.SafeString("<span class='highlight'>" + input + "</span>");
  });

}).call(this);
