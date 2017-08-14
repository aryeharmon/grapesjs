var parse_str = require('locutus/php/strings/parse_str');

var Component = function(obj) {
  var that = this;
  that.traits = [{
    "type": "text",
    "label": "JSON URL",
    "name": "src"
  },
  {
    "type": "checkbox",
    "label": "Repeater",
    "name": "Repeater"
  }, {
    "type": "number",
    "label": "Max",
    "name": "Max",
    "default": "0",
    "value": "10"
  }, {
    "type": "select",
    "label": "Each Line",
    "name": "line_count",
    "options": [{
      "value": "col-xs-12",
      "name": "1"
    }, {
      "value": "col-xs-6",
      "name": "2"
    }, {
      "value": "col-xs-4",
      "name": "3"
    }, {
      "value": "col-xs-3",
      "name": "4"
    }, {
      "value": "col-xs-2",
      "name": "6"
    }, {
      "value": "col-xs-1",
      "name": "12"
    }]
  }];

  if (obj) {
    that.traits = obj.traits;
    that.category = obj.category;
    that.icon = obj.icon;
    that.tagName = obj.tagName;
  }

  this.removeTrait = function(index) {
    that.traits.splice(index, 1);
  };
  this.addTrait = function(type) {
    that.traits.push({
      type: type,
      options: [],
      label: '',
      name: '',
      default: '',
      value: '',
    });
  };

  this.addTraitOption = function(index) {
      this.traits[index].options.push({
        name: '',
        value: '',
      });
  };
  this.removeTraitOption = function(index, o_index) {
    that.traits[index].options.splice(o_index, 1);
  };
};


module.exports = {
  run(editor, sender) {
    var that = this;

    this.component = new Component;
    this.category_id = '';

    this.render(editor);

    // alert(editor.trigger);
  },
  get_form_data: function() {
    var that = this;

    var form_data = {};

    parse_str($("#saveComponent").serialize(), form_data);

    form_data.traits = $.map(form_data.traits, function(value, index) {
      return [value];
    });

    for (var i = 0; i < form_data.traits.length; i++) {
      var optionsObj = form_data.traits[i].options || {};
      form_data.traits[i].options = $.map(optionsObj, function(value, index) {
          return [value];
      });
    }

    $.extend(that.component, form_data);
  },
  render(editor) {
    var that = this;

    this.modal = editor.Modal || null;
    this.modal.setTitle('Component editor');
    this.modal.setContent(`
      <div>
        <h3 class="component-editor-title">Add a new Category</h3>
        <form id="saveCategory">
          <input type="hidden" name="id" value="` + (this.category_id || '') + `"/>
          <div class="form-group">
            <label>Name</label>
            <input type="label" name="name" class="form-control" value="` + (window.categories[this.category_id] || {name: ''}).name + `">
          </div>
          <button type="submit" class="btn btn-default">Save</button>
        </form>
      </div>

      <div>
        <h3>Existing Categories</h3>
        
        <ul id="categories_container">
        </ul>

      </div>

      <div>
        <h3 class="component-editor-title">Add a new Component</h3>

        <form id="saveComponent">
          <input type="hidden" name="id" value="` + (that.component.id || '') + `"/>

          <div class="form-group">
            <label>Name</label>
            <input type="label" name="tagName" class="form-control" value="` + (that.component.tagName || '') + `">
          </div>

          <div class="form-group">
            <label>Category</label>
            <select id="category-list" name="category" name="category">
              <option></option>
            </select>
          </div>

          <div class="form-group">
            <label>Icon</label>
<select id="icon_list" name="icon" style="font-family:'FontAwesome'">
<option value="icon-glass">&#xf000 icon-glass</option>
<option value="icon-music">&#xf001 icon-music</option>
<option value="icon-search">&#xf002 icon-search</option>
<option value="icon-envelope-alt">&#xf003 icon-envelope-alt</option>
<option value="icon-heart">&#xf004 icon-heart</option>
<option value="icon-star">&#xf005 icon-star</option>
<option value="icon-star-empty">&#xf006 icon-star-empty</option>
<option value="icon-user">&#xf007 icon-user</option>
<option value="icon-film">&#xf008 icon-film</option>
<option value="icon-th-large">&#xf009 icon-th-large</option>
<option value="icon-th">&#xf00a icon-th</option>
<option value="icon-th-list">&#xf00b icon-th-list</option>
<option value="icon-ok">&#xf00c icon-ok</option>
<option value="icon-remove">&#xf00d icon-remove</option>
<option value="icon-zoom-in">&#xf00e icon-zoom-in</option>
<option value="icon-zoom-out">&#xf010 icon-zoom-out</option>
<option value="icon-off">&#xf011 icon-off</option>
<option value="icon-signal">&#xf012 icon-signal</option>
<option value="icon-cog">&#xf013 icon-cog</option>
<option value="icon-trash">&#xf014 icon-trash</option>
<option value="icon-home">&#xf015 icon-home</option>
<option value="icon-file-alt">&#xf016 icon-file-alt</option>
<option value="icon-time">&#xf017 icon-time</option>
<option value="icon-road">&#xf018 icon-road</option>
<option value="icon-download-alt">&#xf019 icon-download-alt</option>
<option value="icon-download">&#xf01a icon-download</option>
<option value="icon-upload">&#xf01b icon-upload</option>
<option value="icon-inbox">&#xf01c icon-inbox</option>
<option value="icon-play-circle">&#xf01d icon-play-circle</option>
<option value="icon-repeat">&#xf01e icon-repeat</option>
<option value="icon-refresh">&#xf021 icon-refresh</option>
<option value="icon-list-alt">&#xf022 icon-list-alt</option>
<option value="icon-lock">&#xf023 icon-lock</option>
<option value="icon-flag">&#xf024 icon-flag</option>
<option value="icon-headphones">&#xf025 icon-headphones</option>
<option value="icon-volume-off">&#xf026 icon-volume-off</option>
<option value="icon-volume-down">&#xf027 icon-volume-down</option>
<option value="icon-volume-up">&#xf028 icon-volume-up</option>
<option value="icon-qrcode">&#xf029 icon-qrcode</option>
<option value="icon-barcode">&#xf02a icon-barcode</option>
<option value="icon-tag">&#xf02b icon-tag</option>
<option value="icon-tags">&#xf02c icon-tags</option>
<option value="icon-book">&#xf02d icon-book</option>
<option value="icon-bookmark">&#xf02e icon-bookmark</option>
<option value="icon-print">&#xf02f icon-print</option>
<option value="icon-camera">&#xf030 icon-camera</option>
<option value="icon-font">&#xf031 icon-font</option>
<option value="icon-bold">&#xf032 icon-bold</option>
<option value="icon-italic">&#xf033 icon-italic</option>
<option value="icon-text-height">&#xf034 icon-text-height</option>
<option value="icon-text-width">&#xf035 icon-text-width</option>
<option value="icon-align-left">&#xf036 icon-align-left</option>
<option value="icon-align-center">&#xf037 icon-align-center</option>
<option value="icon-align-right">&#xf038 icon-align-right</option>
<option value="icon-align-justify">&#xf039 icon-align-justify</option>
<option value="icon-list">&#xf03a icon-list</option>
<option value="icon-indent-left">&#xf03b icon-indent-left</option>
<option value="icon-indent-right">&#xf03c icon-indent-right</option>
<option value="icon-facetime-video">&#xf03d icon-facetime-video</option>
<option value="icon-picture">&#xf03e icon-picture</option>
<option value="icon-pencil">&#xf040 icon-pencil</option>
<option value="icon-map-marker">&#xf041 icon-map-marker</option>
<option value="icon-adjust">&#xf042 icon-adjust</option>
<option value="icon-tint">&#xf043 icon-tint</option>
<option value="icon-edit">&#xf044 icon-edit</option>
<option value="icon-share">&#xf045 icon-share</option>
<option value="icon-check">&#xf046 icon-check</option>
<option value="icon-move">&#xf047 icon-move</option>
<option value="icon-step-backward">&#xf048 icon-step-backward</option>
<option value="icon-fast-backward">&#xf049 icon-fast-backward</option>
<option value="icon-backward">&#xf04a icon-backward</option>
<option value="icon-play">&#xf04b icon-play</option>
<option value="icon-pause">&#xf04c icon-pause</option>
<option value="icon-stop">&#xf04d icon-stop</option>
<option value="icon-forward">&#xf04e icon-forward</option>
<option value="icon-fast-forward">&#xf050 icon-fast-forward</option>
<option value="icon-step-forward">&#xf051 icon-step-forward</option>
<option value="icon-eject">&#xf052 icon-eject</option>
<option value="icon-chevron-left">&#xf053 icon-chevron-left</option>
<option value="icon-chevron-right">&#xf054 icon-chevron-right</option>
<option value="icon-plus-sign">&#xf055 icon-plus-sign</option>
<option value="icon-minus-sign">&#xf056 icon-minus-sign</option>
<option value="icon-remove-sign">&#xf057 icon-remove-sign</option>
<option value="icon-ok-sign">&#xf058 icon-ok-sign</option>
<option value="icon-question-sign">&#xf059 icon-question-sign</option>
<option value="icon-info-sign">&#xf05a icon-info-sign</option>
<option value="icon-screenshot">&#xf05b icon-screenshot</option>
<option value="icon-remove-circle">&#xf05c icon-remove-circle</option>
<option value="icon-ok-circle">&#xf05d icon-ok-circle</option>
<option value="icon-ban-circle">&#xf05e icon-ban-circle</option>
<option value="icon-arrow-left">&#xf060 icon-arrow-left</option>
<option value="icon-arrow-right">&#xf061 icon-arrow-right</option>
<option value="icon-arrow-up">&#xf062 icon-arrow-up</option>
<option value="icon-arrow-down">&#xf063 icon-arrow-down</option>
<option value="icon-share-alt">&#xf064 icon-share-alt</option>
<option value="icon-resize-full">&#xf065 icon-resize-full</option>
<option value="icon-resize-small">&#xf066 icon-resize-small</option>
<option value="icon-plus">&#xf067 icon-plus</option>
<option value="icon-minus">&#xf068 icon-minus</option>
<option value="icon-asterisk">&#xf069 icon-asterisk</option>
<option value="icon-exclamation-sign">&#xf06a icon-exclamation-sign</option>
<option value="icon-gift">&#xf06b icon-gift</option>
<option value="icon-leaf">&#xf06c icon-leaf</option>
<option value="icon-fire">&#xf06d icon-fire</option>
<option value="icon-eye-open">&#xf06e icon-eye-open</option>
<option value="icon-eye-close">&#xf070 icon-eye-close</option>
<option value="icon-warning-sign">&#xf071 icon-warning-sign</option>
<option value="icon-plane">&#xf072 icon-plane</option>
<option value="icon-calendar">&#xf073 icon-calendar</option>
<option value="icon-random">&#xf074 icon-random</option>
<option value="icon-comment">&#xf075 icon-comment</option>
<option value="icon-magnet">&#xf076 icon-magnet</option>
<option value="icon-chevron-up">&#xf077 icon-chevron-up</option>
<option value="icon-chevron-down">&#xf078 icon-chevron-down</option>
<option value="icon-retweet">&#xf079 icon-retweet</option>
<option value="icon-shopping-cart">&#xf07a icon-shopping-cart</option>
<option value="icon-folder-close">&#xf07b icon-folder-close</option>
<option value="icon-folder-open">&#xf07c icon-folder-open</option>
<option value="icon-resize-vertical">&#xf07d icon-resize-vertical</option>
<option value="icon-resize-horizontal">&#xf07e icon-resize-horizontal</option>
<option value="icon-bar-chart">&#xf080 icon-bar-chart</option>
<option value="icon-twitter-sign">&#xf081 icon-twitter-sign</option>
<option value="icon-facebook-sign">&#xf082 icon-facebook-sign</option>
<option value="icon-camera-retro">&#xf083 icon-camera-retro</option>
<option value="icon-key">&#xf084 icon-key</option>
<option value="icon-cogs">&#xf085 icon-cogs</option>
<option value="icon-comments">&#xf086 icon-comments</option>
<option value="icon-thumbs-up-alt">&#xf087 icon-thumbs-up-alt</option>
<option value="icon-thumbs-down-alt">&#xf088 icon-thumbs-down-alt</option>
<option value="icon-star-half">&#xf089 icon-star-half</option>
<option value="icon-heart-empty">&#xf08a icon-heart-empty</option>
<option value="icon-signout">&#xf08b icon-signout</option>
<option value="icon-linkedin-sign">&#xf08c icon-linkedin-sign</option>
<option value="icon-pushpin">&#xf08d icon-pushpin</option>
<option value="icon-external-link">&#xf08e icon-external-link</option>
<option value="icon-signin">&#xf090 icon-signin</option>
<option value="icon-trophy">&#xf091 icon-trophy</option>
<option value="icon-github-sign">&#xf092 icon-github-sign</option>
<option value="icon-upload-alt">&#xf093 icon-upload-alt</option>
<option value="icon-lemon">&#xf094 icon-lemon</option>
<option value="icon-phone">&#xf095 icon-phone</option>
<option value="icon-check-empty">&#xf096 icon-check-empty</option>
<option value="icon-bookmark-empty">&#xf097 icon-bookmark-empty</option>
<option value="icon-phone-sign">&#xf098 icon-phone-sign</option>
<option value="icon-twitter">&#xf099 icon-twitter</option>
<option value="icon-facebook">&#xf09a icon-facebook</option>
<option value="icon-github">&#xf09b icon-github</option>
<option value="icon-unlock">&#xf09c icon-unlock</option>
<option value="icon-credit-card">&#xf09d icon-credit-card</option>
<option value="icon-rss">&#xf09e icon-rss</option>
<option value="icon-hdd">&#xf0a0 icon-hdd</option>
<option value="icon-bullhorn">&#xf0a1 icon-bullhorn</option>
<option value="icon-bell">&#xf0a2 icon-bell</option>
<option value="icon-certificate">&#xf0a3 icon-certificate</option>
<option value="icon-hand-right">&#xf0a4 icon-hand-right</option>
<option value="icon-hand-left">&#xf0a5 icon-hand-left</option>
<option value="icon-hand-up">&#xf0a6 icon-hand-up</option>
<option value="icon-hand-down">&#xf0a7 icon-hand-down</option>
<option value="icon-circle-arrow-left">&#xf0a8 icon-circle-arrow-left</option>
<option value="icon-circle-arrow-right">&#xf0a9 icon-circle-arrow-right</option>
<option value="icon-circle-arrow-up">&#xf0aa icon-circle-arrow-up</option>
<option value="icon-circle-arrow-down">&#xf0ab icon-circle-arrow-down</option>
<option value="icon-globe">&#xf0ac icon-globe</option>
<option value="icon-wrench">&#xf0ad icon-wrench</option>
<option value="icon-tasks">&#xf0ae icon-tasks</option>
<option value="icon-filter">&#xf0b0 icon-filter</option>
<option value="icon-briefcase">&#xf0b1 icon-briefcase</option>
<option value="icon-fullscreen">&#xf0b2 icon-fullscreen</option>
<option value="icon-group">&#xf0c0 icon-group</option>
<option value="icon-link">&#xf0c1 icon-link</option>
<option value="icon-cloud">&#xf0c2 icon-cloud</option>
<option value="icon-beaker">&#xf0c3 icon-beaker</option>
<option value="icon-cut">&#xf0c4 icon-cut</option>
<option value="icon-copy">&#xf0c5 icon-copy</option>
<option value="icon-paper-clip">&#xf0c6 icon-paper-clip</option>
<option value="icon-save">&#xf0c7 icon-save</option>
<option value="icon-sign-blank">&#xf0c8 icon-sign-blank</option>
<option value="icon-reorder">&#xf0c9 icon-reorder</option>
<option value="icon-list-ul">&#xf0ca icon-list-ul</option>
<option value="icon-list-ol">&#xf0cb icon-list-ol</option>
<option value="icon-strikethrough">&#xf0cc icon-strikethrough</option>
<option value="icon-underline">&#xf0cd icon-underline</option>
<option value="icon-table">&#xf0ce icon-table</option>
<option value="icon-magic">&#xf0d0 icon-magic</option>
<option value="icon-truck">&#xf0d1 icon-truck</option>
<option value="icon-pinterest">&#xf0d2 icon-pinterest</option>
<option value="icon-pinterest-sign">&#xf0d3 icon-pinterest-sign</option>
<option value="icon-google-plus-sign">&#xf0d4 icon-google-plus-sign</option>
<option value="icon-google-plus">&#xf0d5 icon-google-plus</option>
<option value="icon-money">&#xf0d6 icon-money</option>
<option value="icon-caret-down">&#xf0d7 icon-caret-down</option>
<option value="icon-caret-up">&#xf0d8 icon-caret-up</option>
<option value="icon-caret-left">&#xf0d9 icon-caret-left</option>
<option value="icon-caret-right">&#xf0da icon-caret-right</option>
<option value="icon-columns">&#xf0db icon-columns</option>
<option value="icon-sort">&#xf0dc icon-sort</option>
<option value="icon-sort-down">&#xf0dd icon-sort-down</option>
<option value="icon-sort-up">&#xf0de icon-sort-up</option>
<option value="icon-envelope">&#xf0e0 icon-envelope</option>
<option value="icon-linkedin">&#xf0e1 icon-linkedin</option>
<option value="icon-undo">&#xf0e2 icon-undo</option>
<option value="icon-legal">&#xf0e3 icon-legal</option>
<option value="icon-dashboard">&#xf0e4 icon-dashboard</option>
<option value="icon-comment-alt">&#xf0e5 icon-comment-alt</option>
<option value="icon-comments-alt">&#xf0e6 icon-comments-alt</option>
<option value="icon-bolt">&#xf0e7 icon-bolt</option>
<option value="icon-sitemap">&#xf0e8 icon-sitemap</option>
<option value="icon-umbrella">&#xf0e9 icon-umbrella</option>
<option value="icon-paste">&#xf0ea icon-paste</option>
<option value="icon-lightbulb">&#xf0eb icon-lightbulb</option>
<option value="icon-exchange">&#xf0ec icon-exchange</option>
<option value="icon-cloud-download">&#xf0ed icon-cloud-download</option>
<option value="icon-cloud-upload">&#xf0ee icon-cloud-upload</option>
<option value="icon-user-md">&#xf0f0 icon-user-md</option>
<option value="icon-stethoscope">&#xf0f1 icon-stethoscope</option>
<option value="icon-suitcase">&#xf0f2 icon-suitcase</option>
<option value="icon-bell-alt">&#xf0f3 icon-bell-alt</option>
<option value="icon-coffee">&#xf0f4 icon-coffee</option>
<option value="icon-food">&#xf0f5 icon-food</option>
<option value="icon-file-text-alt">&#xf0f6 icon-file-text-alt</option>
<option value="icon-building">&#xf0f7 icon-building</option>
<option value="icon-hospital">&#xf0f8 icon-hospital</option>
<option value="icon-ambulance">&#xf0f9 icon-ambulance</option>
<option value="icon-medkit">&#xf0fa icon-medkit</option>
<option value="icon-fighter-jet">&#xf0fb icon-fighter-jet</option>
<option value="icon-beer">&#xf0fc icon-beer</option>
<option value="icon-h-sign">&#xf0fd icon-h-sign</option>
<option value="icon-plus-sign-alt">&#xf0fe icon-plus-sign-alt</option>
<option value="icon-double-angle-left">&#xf100 icon-double-angle-left</option>
<option value="icon-double-angle-right">&#xf101 icon-double-angle-right</option>
<option value="icon-double-angle-up">&#xf102 icon-double-angle-up</option>
<option value="icon-double-angle-down">&#xf103 icon-double-angle-down</option>
<option value="icon-angle-left">&#xf104 icon-angle-left</option>
<option value="icon-angle-right">&#xf105 icon-angle-right</option>
<option value="icon-angle-up">&#xf106 icon-angle-up</option>
<option value="icon-angle-down">&#xf107 icon-angle-down</option>
<option value="icon-desktop">&#xf108 icon-desktop</option>
<option value="icon-laptop">&#xf109 icon-laptop</option>
<option value="icon-tablet">&#xf10a icon-tablet</option>
<option value="icon-mobile-phone">&#xf10b icon-mobile-phone</option>
<option value="icon-circle-blank">&#xf10c icon-circle-blank</option>
<option value="icon-quote-left">&#xf10d icon-quote-left</option>
<option value="icon-quote-right">&#xf10e icon-quote-right</option>
<option value="icon-spinner">&#xf110 icon-spinner</option>
<option value="icon-circle">&#xf111 icon-circle</option>
<option value="icon-reply">&#xf112 icon-reply</option>
<option value="icon-github-alt">&#xf113 icon-github-alt</option>
<option value="icon-folder-close-alt">&#xf114 icon-folder-close-alt</option>
<option value="icon-folder-open-alt">&#xf115 icon-folder-open-alt</option>
<option value="icon-expand-alt">&#xf116 icon-expand-alt</option>
<option value="icon-collapse-alt">&#xf117 icon-collapse-alt</option>
<option value="icon-smile">&#xf118 icon-smile</option>
<option value="icon-frown">&#xf119 icon-frown</option>
<option value="icon-meh">&#xf11a icon-meh</option>
<option value="icon-gamepad">&#xf11b icon-gamepad</option>
<option value="icon-keyboard">&#xf11c icon-keyboard</option>
<option value="icon-flag-alt">&#xf11d icon-flag-alt</option>
<option value="icon-flag-checkered">&#xf11e icon-flag-checkered</option>
<option value="icon-terminal">&#xf120 icon-terminal</option>
<option value="icon-code">&#xf121 icon-code</option>
<option value="icon-reply-all">&#xf122 icon-reply-all</option>
<option value="icon-mail-reply-all">&#xf122 icon-mail-reply-all</option>
<option value="icon-star-half-empty">&#xf123 icon-star-half-empty</option>
<option value="icon-location-arrow">&#xf124 icon-location-arrow</option>
<option value="icon-crop">&#xf125 icon-crop</option>
<option value="icon-code-fork">&#xf126 icon-code-fork</option>
<option value="icon-unlink">&#xf127 icon-unlink</option>
<option value="icon-question">&#xf128 icon-question</option>
<option value="icon-info">&#xf129 icon-info</option>
<option value="icon-exclamation">&#xf12a icon-exclamation</option>
<option value="icon-superscript">&#xf12b icon-superscript</option>
<option value="icon-subscript">&#xf12c icon-subscript</option>
<option value="icon-eraser">&#xf12d icon-eraser</option>
<option value="icon-puzzle-piece">&#xf12e icon-puzzle-piece</option>
<option value="icon-microphone">&#xf130 icon-microphone</option>
<option value="icon-microphone-off">&#xf131 icon-microphone-off</option>
<option value="icon-shield">&#xf132 icon-shield</option>
<option value="icon-calendar-empty">&#xf133 icon-calendar-empty</option>
<option value="icon-fire-extinguisher">&#xf134 icon-fire-extinguisher</option>
<option value="icon-rocket">&#xf135 icon-rocket</option>
<option value="icon-maxcdn">&#xf136 icon-maxcdn</option>
<option value="icon-chevron-sign-left">&#xf137 icon-chevron-sign-left</option>
<option value="icon-chevron-sign-right">&#xf138 icon-chevron-sign-right</option>
<option value="icon-chevron-sign-up">&#xf139 icon-chevron-sign-up</option>
<option value="icon-chevron-sign-down">&#xf13a icon-chevron-sign-down</option>
<option value="icon-html5">&#xf13b icon-html5</option>
<option value="icon-css3">&#xf13c icon-css3</option>
<option value="icon-anchor">&#xf13d icon-anchor</option>
<option value="icon-unlock-alt">&#xf13e icon-unlock-alt</option>
<option value="icon-bullseye">&#xf140 icon-bullseye</option>
<option value="icon-ellipsis-horizontal">&#xf141 icon-ellipsis-horizontal</option>
<option value="icon-ellipsis-vertical">&#xf142 icon-ellipsis-vertical</option>
<option value="icon-rss-sign">&#xf143 icon-rss-sign</option>
<option value="icon-play-sign">&#xf144 icon-play-sign</option>
<option value="icon-ticket">&#xf145 icon-ticket</option>
<option value="icon-minus-sign-alt">&#xf146 icon-minus-sign-alt</option>
<option value="icon-check-minus">&#xf147 icon-check-minus</option>
<option value="icon-level-up">&#xf148 icon-level-up</option>
<option value="icon-level-down">&#xf149 icon-level-down</option>
<option value="icon-check-sign">&#xf14a icon-check-sign</option>
<option value="icon-edit-sign">&#xf14b icon-edit-sign</option>
<option value="icon-external-link-sign">&#xf14c icon-external-link-sign</option>
<option value="icon-share-sign">&#xf14d icon-share-sign</option>
<option value="icon-compass">&#xf14e icon-compass</option>
<option value="icon-collapse">&#xf150 icon-collapse</option>
<option value="icon-collapse-top">&#xf151 icon-collapse-top</option>
<option value="icon-expand">&#xf152 icon-expand</option>
<option value="icon-eur">&#xf153 icon-eur</option>
<option value="icon-gbp">&#xf154 icon-gbp</option>
<option value="icon-usd">&#xf155 icon-usd</option>
<option value="icon-inr">&#xf156 icon-inr</option>
<option value="icon-jpy">&#xf157 icon-jpy</option>
<option value="icon-cny">&#xf158 icon-cny</option>
<option value="icon-krw">&#xf159 icon-krw</option>
<option value="icon-btc">&#xf15a icon-btc</option>
<option value="icon-file">&#xf15b icon-file</option>
<option value="icon-file-text">&#xf15c icon-file-text</option>
<option value="icon-sort-by-alphabet">&#xf15d icon-sort-by-alphabet</option>
<option value="icon-sort-by-alphabet-alt">&#xf15e icon-sort-by-alphabet-alt</option>
<option value="icon-sort-by-attributes">&#xf160 icon-sort-by-attributes</option>
<option value="icon-sort-by-attributes-alt">&#xf161 icon-sort-by-attributes-alt</option>
<option value="icon-sort-by-order">&#xf162 icon-sort-by-order</option>
<option value="icon-sort-by-order-alt">&#xf163 icon-sort-by-order-alt</option>
<option value="icon-thumbs-up">&#xf164 icon-thumbs-up</option>
<option value="icon-thumbs-down">&#xf165 icon-thumbs-down</option>
<option value="icon-youtube-sign">&#xf166 icon-youtube-sign</option>
<option value="icon-youtube">&#xf167 icon-youtube</option>
<option value="icon-xing">&#xf168 icon-xing</option>
<option value="icon-xing-sign">&#xf169 icon-xing-sign</option>
<option value="icon-youtube-play">&#xf16a icon-youtube-play</option>
<option value="icon-dropbox">&#xf16b icon-dropbox</option>
<option value="icon-stackexchange">&#xf16c icon-stackexchange</option>
<option value="icon-instagram">&#xf16d icon-instagram</option>
<option value="icon-flickr">&#xf16e icon-flickr</option>
<option value="icon-adn">&#xf170 icon-adn</option>
<option value="icon-bitbucket">&#xf171 icon-bitbucket</option>
<option value="icon-bitbucket-sign">&#xf172 icon-bitbucket-sign</option>
<option value="icon-tumblr">&#xf173 icon-tumblr</option>
<option value="icon-tumblr-sign">&#xf174 icon-tumblr-sign</option>
<option value="icon-long-arrow-down">&#xf175 icon-long-arrow-down</option>
<option value="icon-long-arrow-up">&#xf176 icon-long-arrow-up</option>
<option value="icon-long-arrow-left">&#xf177 icon-long-arrow-left</option>
<option value="icon-long-arrow-right">&#xf178 icon-long-arrow-right</option>
<option value="icon-apple">&#xf179 icon-apple</option>
<option value="icon-windows">&#xf17a icon-windows</option>
<option value="icon-android">&#xf17b icon-android</option>
<option value="icon-linux">&#xf17c icon-linux</option>
<option value="icon-dribbble">&#xf17d icon-dribbble</option>
<option value="icon-skype">&#xf17e icon-skype</option>
<option value="icon-foursquare">&#xf180 icon-foursquare</option>
<option value="icon-trello">&#xf181 icon-trello</option>
<option value="icon-female">&#xf182 icon-female</option>
<option value="icon-male">&#xf183 icon-male</option>
<option value="icon-gittip">&#xf184 icon-gittip</option>
<option value="icon-sun">&#xf185 icon-sun</option>
<option value="icon-moon">&#xf186 icon-moon</option>
<option value="icon-archive">&#xf187 icon-archive</option>
<option value="icon-bug">&#xf188 icon-bug</option>
<option value="icon-vk">&#xf189 icon-vk</option>
<option value="icon-weibo">&#xf18a icon-weibo</option>
<option value="icon-renren">&#xf18b icon-renren</option>
</select>


          </div>

          <hr>


          <div id="traits"></div>

          <select class="add-type">
            <option>text</option>
            <option>email</option>
            <option>password</option>
            <option>number</option>
            <option>checkbox</option>
            <option>select</option>
          </select>
          <button id="add-settings" type="button" class="btn btn-default">Add Setting</button>
          <hr>

          <button type="submit" class="btn btn-default">Save</button>
        </form>

      </div>



      <div>
        <h3>Existing Component</h3>
        
        <ul id="components_container">
        </ul>

      </div>
    `);
    this.modal.open();

    if (window.components) {    
      for (var id in window.components) {
        $('#components_container').append(`<li class="edit-component-li" data-id="`+id+`">`+ window.components[id].tagName +` <button class="edit-component" data-id="`+id+`">Edit</button> <button class="remove-component" data-id="`+id+`">Delete</button></li>`);
      }
    }
    
    if (window.categories) {    
      for (var id in window.categories) {
        $('#categories_container').append(`<li class="edit-category-li" data-id="`+id+`">`+ window.categories[id].name +` <button class="edit-category" data-id="`+id+`">Edit</button> <button data-id="`+id+`" class="delete-category">Delete</button></li>`);
        $('#category-list').append(`<option value="`+id+`">`+window.categories[id].name+`</option>`);
      }
    }

    $('#category-list').find('option[value="'+ this.component.category +'"]').prop('selected', true); 
    $('#icon_list').find('option[value="'+ this.component.icon +'"]').prop('selected', true); 


    for (var i = 0; i < this.component.traits.length; i++) {
      var trait = this.component.traits[i];
      $('#traits').append('<input type="hidden" name="traits[' + i + '][type]" value="' + trait.type + '"/>');
      $('#traits').append('<div><strong>' + trait.type + '</strong> <button type="button" class="remove-setting" data-i="' + i + '">Remove Setting</button></div>');

      if (trait.type === 'text' || trait.type === 'checkbox' || trait.type === 'number' || trait.type === 'select' || trait.type === 'email' || trait.type === 'password') {
        $('#traits').append(`
          <div class="form-group">
            <label>label</label>
            <input type="label" name="traits[` + i + `][label]" class="form-control" value="` + (trait.label || "") + `">
          </div>
          <div class="form-group">
            <label>name</label>
            <input type="text" name="traits[` + i + `][name]" class="form-control" value="` + (trait.name || "") + `">
          </div>
          <div class="form-group">
            <label>default</label>
            <input type="text" name="traits[` + i + `][default]" class="form-control" value="` + (trait.default || "") + `">
          </div>
          <div class="form-group">
            <label>value</label>
            <input type="text" name="traits[` + i + `][value]" class="form-control" value="` + (trait.value || "") + `">
          </div>
        `);
      }
      if (trait.type === 'select') {
        for (var n = 0; n < trait.options.length; n++) {
          var option = trait.options[n];
          $('#traits').append(`
            <div><strong>Opotion ` + (n + 1) + ` </strong></div>
            <div class="form-group">
              <label>name</label>
              <input type="text" name="traits[` + i + `][options][` + n + `][name]" class="form-control" value="` + (option.name || "") + `">
            </div>
          `);
          $('#traits').append(`
            <div>Opotion 1</div>
            <div class="form-group">
              <label>value</label>
              <input type="text" name="traits[` + i + `][options][` + n + `][value]" class="form-control" value="` + (option.value || "") + `">
            </div>
          `);
          $('#traits').append(`
            <div>
              <button type="button" class="remove-option" data-i="` + i + `" data-n="` + n + `">Remove Option</button>
            </div>
          `);
        }
        
        $('#traits').append(`
          <button type="button" class="add-option" data-i="` + i + `">Add Option</button>
        `);
      }
      $('#traits').append('<hr>');
    }





    $("#add-settings").click(function(e) {
      that.get_form_data();
      that.component.addTrait($('.add-type').val());
      that.render(editor);
    });
    $(".add-option").click(function(e) {
      that.get_form_data();

      var i = $(this).data('i');
      that.component.addTraitOption(i);
      that.render(editor);
    });
    $(".remove-option").click(function(e) {
      that.get_form_data();

      var i = $(this).data('i');
      var n = $(this).data('n');

      that.component.removeTraitOption(i, n);

      that.render(editor);
    });



    $(".edit-component").click(function(e) {
      that.component = new Component(window.components[$(this).data('id')]);

      that.render(editor);
    });

    $(".remove-component").click(function(e) {
      that.category_id = $(this).data('id');

      $.ajax({
       type: "POST",
       url: "/remove-component",
       data: {id: $(this).data('id')},
       success: function(data)
       {
        delete window.components[data];
        that.render(editor);
       }
      });
    });

    $(".edit-category").click(function(e) {
      that.category_id = $(this).data('id');

      that.render(editor);
    });

    $(".delete-category").click(function(e) {
      that.category_id = $(this).data('id');

      $.ajax({
       type: "POST",
       url: "/remove-category",
       data: {id: that.category_id},
       success: function(data)
       {
        delete window.categories[data];
        that.render(editor);
       }
      });
    });


    $(".remove-setting").click(function(e) {
      that.get_form_data();
      var i = $(this).data('i');

      that.component.removeTrait(i);

      that.render(editor);
    });

    $("#saveCategory").submit(function(e) {
      e.preventDefault();

      $.ajax({
       type: "POST",
       url: "/add-category",
       data: $("#saveCategory").serialize(),
       success: function(data)
       {
        window.categories = data;
        that.category_id = '';
        that.render(editor);
       }
      });

    });

    $("#saveComponent").submit(function(e) {
      e.preventDefault();
      that.get_form_data();
      var url = "/save-component";

      $.ajax({
       type: "POST",
       url: url,
       data: $("#saveComponent").serialize(),
       success: function(data)
       {

        var model = defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
              style: {
                "min-height": '40px',
                "display": 'block',
              },
              tagName: that.component.tagName,
              classes: ['cutom-element-type'],
              stylable: 'false',
              draggable: '*',
              droppable: true,
              saveable: true,
              traits: that.component.traits,
            }),
          },
          {
            isComponent: function(el) {
              if(el.tagName == that.component.tagName.toUpperCase()){
                return {type: that.component.tagName};
              }
            },
          });

        if (editor.DomComponents.getType(that.component.tagName)) {
          editor.DomComponents.getType(that.component.tagName).model = model;
        } else {
          editor.DomComponents.addType(that.component.tagName, {
            model: model,
            view: defaultType.view,
          });
        }


        editor.BlockManager.add(data, {
          label: that.component.tagName,
          category: 'Custom Components',
          attributes: {class:'fa fa-thermometer-full'},
          content: {
            type: that.component.tagName,
          },
        });

        that.component = new Component();
        alert('saved');
        that.render(editor);

       }
      });
    });


  },
};
