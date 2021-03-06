ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
  Views.Form = Marionette.ItemView.extend({
    template: "#contact-form",
    events: {
      "click button.js-submit": "submitClicked"
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);

      this.trigger("form:submit", data);
    },

    onFormDataInvalid: function(errors){

      var $view = this.$el;
      var clearFormErrors = function(){
        var $form = $view.find("form");
        $form.find(".help-inline.control-label").each(function(){
          $(this).remove();
        });
        $form.find(".control-group.has-error").each(function(){
          $(this).removeClass("has-error");
        });
      }

      var markErrors = function(value, key){
        console.log("*key" + key + ":value:" + value);
        var $controlGroup = $view.find("#" + key).parent();
        var $errorEl = $("<span>", { class: "help-inline control-label", text: value });
        $controlGroup.append($errorEl).addClass("has-error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });

});
