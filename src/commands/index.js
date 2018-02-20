/**
 *
 * * [add](#add)
 * * [get](#get)
 * * [has](#has)
 *
 * You can init the editor with all necessary commands via configuration
 *
 * ```js
 * var editor = grapesjs.init({
 * 	...
 *  commands: {...} // Check below for the properties
 * 	...
 * });
 * ```
 *
 * Before using methods you should get first the module from the editor instance, in this way:
 *
 * ```js
 * var commands = editor.Commands;
 * ```
 *
 * @module Commands
 * @param {Object} config Configurations
 * @param {Array<Object>} [config.defaults=[]] Array of possible commands
 * @example
 * ...
 * commands: {
 * 	defaults: [{
 * 		id: 'helloWorld',
 * 		run:  function(editor, sender){
 * 			alert('Hello world!');
 * 		},
 * 		stop:  function(editor, sender){
 * 			alert('Stop!');
 * 		},
 * 	}],
 * },
 * ...
 */
import { isFunction } from 'underscore';

module.exports = () => {
  let em;
  var c = {},
  commands = {},
  defaultCommands = {},
  defaults = require('./config/config'),
  AbsCommands = require('./view/CommandAbstract');

  // Need it here as it would be used below
  var add = function(id, obj) {
    if (isFunction(obj)) {
      obj = { run: obj };
    }

    delete obj.initialize;
    commands[id] = AbsCommands.extend(obj);
    return this;
  };

  return {

    /**
     * Name of the module
     * @type {String}
     * @private
     */
    name: 'Commands',

    /**
     * Initialize module. Automatically called with a new instance of the editor
     * @param {Object} config Configurations
     * @private
     */
    init(config) {
      c = config || {};
      for (var name in defaults) {
        if (!(name in c))
          c[name] = defaults[name];
      }
      em = c.em;
      var ppfx = c.pStylePrefix;
      if(ppfx)
        c.stylePrefix = ppfx + c.stylePrefix;

      // Load commands passed via configuration
      for( var k in c.defaults) {
        var obj = c.defaults[k];
        if(obj.id)
          this.add(obj.id, obj);
      }

      const ViewCode = require('./view/ExportTemplate');
      defaultCommands['select-comp'] = require('./view/SelectComponent');
      defaultCommands['create-comp'] = require('./view/CreateComponent');
      defaultCommands['delete-comp'] = require('./view/DeleteComponent');
      defaultCommands['image-comp'] = require('./view/ImageComponent');
      defaultCommands['move-comp'] = require('./view/MoveComponent');
      defaultCommands['text-comp'] = require('./view/TextComponent');
      defaultCommands['insert-custom'] = require('./view/InsertCustom');
      defaultCommands['export-template'] = ViewCode;
      defaultCommands['sw-visibility'] = require('./view/SwitchVisibility');
      defaultCommands['open-layers'] = require('./view/OpenLayers');
      defaultCommands['open-sm'] = require('./view/OpenStyleManager');
      defaultCommands['open-tm'] = require('./view/OpenTraitManager');
      defaultCommands['open-blocks'] = require('./view/OpenBlocks');
      defaultCommands['open-assets'] = require('./view/OpenAssets');
      defaultCommands['show-offset'] = require('./view/ShowOffset');
      defaultCommands['select-parent'] = require('./view/SelectParent');
      defaultCommands.fullscreen = require('./view/Fullscreen');
      defaultCommands.preview = require('./view/Preview');
      defaultCommands.resize = require('./view/Resize');
      defaultCommands.drag = require('./view/Drag');

      //custom
      defaultCommands['build-component'] = require('./view/BuildComponent');
      defaultCommands['open-table-editor'] = require('./view/OpenTableEditor');
      defaultCommands['open-region-editor'] = require('./view/OpenRegionEditor');

      defaultCommands['tlb-delete'] = {
        run(ed) {
          var sel = ed.getSelected();

          if(!sel || !sel.get('removable')) {
            console.warn('The element is not removable');
            return;
          }

          ed.select(null);
          sel.destroy();
        },
      };





      defaultCommands['maincolor'] = require('./view/mainColorPicker');

      defaultCommands['save'] = {
        run(editor) {





var assetTemplate = `

<div style="overflow: hidden;">
  <div style="float: left; width: 50%;">
    <h4>New. Layout</h4>

    <form id="NewLayoutForm" enctype="multipart/form-data">
      <div class="form_item">
        <label>Block <i style="color: red;">*</i></label>
        <select name="block_id" required="required">
          <% _.each(blocks, function(block) { %>
            <option value="<%= block.id %>"><%= block.name %></option>
          <% }); %>
        </select>
      </div>
      <div class="form_item">
        <label>Name <i style="color: red;">*</i></label>
        <input type="text" name="name" required="required">
      </div>
      <div class="form_item">
        <label>Name <i style="color: red;">*</i></label>
        <input type="file" name="image" required="required">
      </div>
      <div class="form_item">
        <input type="submit" name="Save Layout">
      </div>
    </form>
  </div>

  <div style="float: left; width: 50%;">
    <h4>New Block</h4>

    <form id="NewBlockForm">
      <div class="form_item">
        <label>Category <i style="color: red;">*</i></label>
        <select name="category_id" required="required">
          <% _.each(categories, function(cat) { %>
            <option value="<%= cat.id %>"><%= cat.name %></option>
          <% }); %>
        </select>
      </div>
      <div class="form_item">
        <label>Name <i style="color: red;">*</i></label>
        <input type="text" name="name" required="required">
      </div>
      <div class="form_item">
        <label>Icon <i style="color: red;">*</i></label>
        <select name="icon" required="required">
<option value="fa-glass">&#xf000 icon-glass</option>
<option value="fa-music">&#xf001 icon-music</option>
<option value="fa-search">&#xf002 icon-search</option>
<option value="fa-envelope-alt">&#xf003 icon-envelope-alt</option>
<option value="fa-heart">&#xf004 icon-heart</option>
<option value="fa-star">&#xf005 icon-star</option>
<option value="fa-star-empty">&#xf006 icon-star-empty</option>
<option value="fa-user">&#xf007 icon-user</option>
<option value="fa-film">&#xf008 icon-film</option>
<option value="fa-th-large">&#xf009 icon-th-large</option>
<option value="fa-th">&#xf00a icon-th</option>
<option value="fa-th-list">&#xf00b icon-th-list</option>
<option value="fa-ok">&#xf00c icon-ok</option>
<option value="fa-remove">&#xf00d icon-remove</option>
<option value="fa-zoom-in">&#xf00e icon-zoom-in</option>
<option value="fa-zoom-out">&#xf010 icon-zoom-out</option>
<option value="fa-off">&#xf011 icon-off</option>
<option value="fa-signal">&#xf012 icon-signal</option>
<option value="fa-cog">&#xf013 icon-cog</option>
<option value="fa-trash">&#xf014 icon-trash</option>
<option value="fa-home">&#xf015 icon-home</option>
<option value="fa-file-alt">&#xf016 icon-file-alt</option>
<option value="fa-time">&#xf017 icon-time</option>
<option value="fa-road">&#xf018 icon-road</option>
<option value="fa-download-alt">&#xf019 icon-download-alt</option>
<option value="fa-download">&#xf01a icon-download</option>
<option value="fa-upload">&#xf01b icon-upload</option>
<option value="fa-inbox">&#xf01c icon-inbox</option>
<option value="fa-play-circle">&#xf01d icon-play-circle</option>
<option value="fa-repeat">&#xf01e icon-repeat</option>
<option value="fa-refresh">&#xf021 icon-refresh</option>
<option value="fa-list-alt">&#xf022 icon-list-alt</option>
<option value="fa-lock">&#xf023 icon-lock</option>
<option value="fa-flag">&#xf024 icon-flag</option>
<option value="fa-headphones">&#xf025 icon-headphones</option>
<option value="fa-volume-off">&#xf026 icon-volume-off</option>
<option value="fa-volume-down">&#xf027 icon-volume-down</option>
<option value="fa-volume-up">&#xf028 icon-volume-up</option>
<option value="fa-qrcode">&#xf029 icon-qrcode</option>
<option value="fa-barcode">&#xf02a icon-barcode</option>
<option value="fa-tag">&#xf02b icon-tag</option>
<option value="fa-tags">&#xf02c icon-tags</option>
<option value="fa-book">&#xf02d icon-book</option>
<option value="fa-bookmark">&#xf02e icon-bookmark</option>
<option value="fa-print">&#xf02f icon-print</option>
<option value="fa-camera">&#xf030 icon-camera</option>
<option value="fa-font">&#xf031 icon-font</option>
<option value="fa-bold">&#xf032 icon-bold</option>
<option value="fa-italic">&#xf033 icon-italic</option>
<option value="fa-text-height">&#xf034 icon-text-height</option>
<option value="fa-text-width">&#xf035 icon-text-width</option>
<option value="fa-align-left">&#xf036 icon-align-left</option>
<option value="fa-align-center">&#xf037 icon-align-center</option>
<option value="fa-align-right">&#xf038 icon-align-right</option>
<option value="fa-align-justify">&#xf039 icon-align-justify</option>
<option value="fa-list">&#xf03a icon-list</option>
<option value="fa-indent-left">&#xf03b icon-indent-left</option>
<option value="fa-indent-right">&#xf03c icon-indent-right</option>
<option value="fa-facetime-video">&#xf03d icon-facetime-video</option>
<option value="fa-picture">&#xf03e icon-picture</option>
<option value="fa-pencil">&#xf040 icon-pencil</option>
<option value="fa-map-marker">&#xf041 icon-map-marker</option>
<option value="fa-adjust">&#xf042 icon-adjust</option>
<option value="fa-tint">&#xf043 icon-tint</option>
<option value="fa-edit">&#xf044 icon-edit</option>
<option value="fa-share">&#xf045 icon-share</option>
<option value="fa-check">&#xf046 icon-check</option>
<option value="fa-move">&#xf047 icon-move</option>
<option value="fa-step-backward">&#xf048 icon-step-backward</option>
<option value="fa-fast-backward">&#xf049 icon-fast-backward</option>
<option value="fa-backward">&#xf04a icon-backward</option>
<option value="fa-play">&#xf04b icon-play</option>
<option value="fa-pause">&#xf04c icon-pause</option>
<option value="fa-stop">&#xf04d icon-stop</option>
<option value="fa-forward">&#xf04e icon-forward</option>
<option value="fa-fast-forward">&#xf050 icon-fast-forward</option>
<option value="fa-step-forward">&#xf051 icon-step-forward</option>
<option value="fa-eject">&#xf052 icon-eject</option>
<option value="fa-chevron-left">&#xf053 icon-chevron-left</option>
<option value="fa-chevron-right">&#xf054 icon-chevron-right</option>
<option value="fa-plus-sign">&#xf055 icon-plus-sign</option>
<option value="fa-minus-sign">&#xf056 icon-minus-sign</option>
<option value="fa-remove-sign">&#xf057 icon-remove-sign</option>
<option value="fa-ok-sign">&#xf058 icon-ok-sign</option>
<option value="fa-question-sign">&#xf059 icon-question-sign</option>
<option value="fa-info-sign">&#xf05a icon-info-sign</option>
<option value="fa-screenshot">&#xf05b icon-screenshot</option>
<option value="fa-remove-circle">&#xf05c icon-remove-circle</option>
<option value="fa-ok-circle">&#xf05d icon-ok-circle</option>
<option value="fa-ban-circle">&#xf05e icon-ban-circle</option>
<option value="fa-arrow-left">&#xf060 icon-arrow-left</option>
<option value="fa-arrow-right">&#xf061 icon-arrow-right</option>
<option value="fa-arrow-up">&#xf062 icon-arrow-up</option>
<option value="fa-arrow-down">&#xf063 icon-arrow-down</option>
<option value="fa-share-alt">&#xf064 icon-share-alt</option>
<option value="fa-resize-full">&#xf065 icon-resize-full</option>
<option value="fa-resize-small">&#xf066 icon-resize-small</option>
<option value="fa-plus">&#xf067 icon-plus</option>
<option value="fa-minus">&#xf068 icon-minus</option>
<option value="fa-asterisk">&#xf069 icon-asterisk</option>
<option value="fa-exclamation-sign">&#xf06a icon-exclamation-sign</option>
<option value="fa-gift">&#xf06b icon-gift</option>
<option value="fa-leaf">&#xf06c icon-leaf</option>
<option value="fa-fire">&#xf06d icon-fire</option>
<option value="fa-eye-open">&#xf06e icon-eye-open</option>
<option value="fa-eye-close">&#xf070 icon-eye-close</option>
<option value="fa-warning-sign">&#xf071 icon-warning-sign</option>
<option value="fa-plane">&#xf072 icon-plane</option>
<option value="fa-calendar">&#xf073 icon-calendar</option>
<option value="fa-random">&#xf074 icon-random</option>
<option value="fa-comment">&#xf075 icon-comment</option>
<option value="fa-magnet">&#xf076 icon-magnet</option>
<option value="fa-chevron-up">&#xf077 icon-chevron-up</option>
<option value="fa-chevron-down">&#xf078 icon-chevron-down</option>
<option value="fa-retweet">&#xf079 icon-retweet</option>
<option value="fa-shopping-cart">&#xf07a icon-shopping-cart</option>
<option value="fa-folder-close">&#xf07b icon-folder-close</option>
<option value="fa-folder-open">&#xf07c icon-folder-open</option>
<option value="fa-resize-vertical">&#xf07d icon-resize-vertical</option>
<option value="fa-resize-horizontal">&#xf07e icon-resize-horizontal</option>
<option value="fa-bar-chart">&#xf080 icon-bar-chart</option>
<option value="fa-twitter-sign">&#xf081 icon-twitter-sign</option>
<option value="fa-facebook-sign">&#xf082 icon-facebook-sign</option>
<option value="fa-camera-retro">&#xf083 icon-camera-retro</option>
<option value="fa-key">&#xf084 icon-key</option>
<option value="fa-cogs">&#xf085 icon-cogs</option>
<option value="fa-comments">&#xf086 icon-comments</option>
<option value="fa-thumbs-up-alt">&#xf087 icon-thumbs-up-alt</option>
<option value="fa-thumbs-down-alt">&#xf088 icon-thumbs-down-alt</option>
<option value="fa-star-half">&#xf089 icon-star-half</option>
<option value="fa-heart-empty">&#xf08a icon-heart-empty</option>
<option value="fa-signout">&#xf08b icon-signout</option>
<option value="fa-linkedin-sign">&#xf08c icon-linkedin-sign</option>
<option value="fa-pushpin">&#xf08d icon-pushpin</option>
<option value="fa-external-link">&#xf08e icon-external-link</option>
<option value="fa-signin">&#xf090 icon-signin</option>
<option value="fa-trophy">&#xf091 icon-trophy</option>
<option value="fa-github-sign">&#xf092 icon-github-sign</option>
<option value="fa-upload-alt">&#xf093 icon-upload-alt</option>
<option value="fa-lemon">&#xf094 icon-lemon</option>
<option value="fa-phone">&#xf095 icon-phone</option>
<option value="fa-check-empty">&#xf096 icon-check-empty</option>
<option value="fa-bookmark-empty">&#xf097 icon-bookmark-empty</option>
<option value="fa-phone-sign">&#xf098 icon-phone-sign</option>
<option value="fa-twitter">&#xf099 icon-twitter</option>
<option value="fa-facebook">&#xf09a icon-facebook</option>
<option value="fa-github">&#xf09b icon-github</option>
<option value="fa-unlock">&#xf09c icon-unlock</option>
<option value="fa-credit-card">&#xf09d icon-credit-card</option>
<option value="fa-rss">&#xf09e icon-rss</option>
<option value="fa-hdd">&#xf0a0 icon-hdd</option>
<option value="fa-bullhorn">&#xf0a1 icon-bullhorn</option>
<option value="fa-bell">&#xf0a2 icon-bell</option>
<option value="fa-certificate">&#xf0a3 icon-certificate</option>
<option value="fa-hand-right">&#xf0a4 icon-hand-right</option>
<option value="fa-hand-left">&#xf0a5 icon-hand-left</option>
<option value="fa-hand-up">&#xf0a6 icon-hand-up</option>
<option value="fa-hand-down">&#xf0a7 icon-hand-down</option>
<option value="fa-circle-arrow-left">&#xf0a8 icon-circle-arrow-left</option>
<option value="fa-circle-arrow-right">&#xf0a9 icon-circle-arrow-right</option>
<option value="fa-circle-arrow-up">&#xf0aa icon-circle-arrow-up</option>
<option value="fa-circle-arrow-down">&#xf0ab icon-circle-arrow-down</option>
<option value="fa-globe">&#xf0ac icon-globe</option>
<option value="fa-wrench">&#xf0ad icon-wrench</option>
<option value="fa-tasks">&#xf0ae icon-tasks</option>
<option value="fa-filter">&#xf0b0 icon-filter</option>
<option value="fa-briefcase">&#xf0b1 icon-briefcase</option>
<option value="fa-fullscreen">&#xf0b2 icon-fullscreen</option>
<option value="fa-group">&#xf0c0 icon-group</option>
<option value="fa-link">&#xf0c1 icon-link</option>
<option value="fa-cloud">&#xf0c2 icon-cloud</option>
<option value="fa-beaker">&#xf0c3 icon-beaker</option>
<option value="fa-cut">&#xf0c4 icon-cut</option>
<option value="fa-copy">&#xf0c5 icon-copy</option>
<option value="fa-paper-clip">&#xf0c6 icon-paper-clip</option>
<option value="fa-save">&#xf0c7 icon-save</option>
<option value="fa-sign-blank">&#xf0c8 icon-sign-blank</option>
<option value="fa-reorder">&#xf0c9 icon-reorder</option>
<option value="fa-list-ul">&#xf0ca icon-list-ul</option>
<option value="fa-list-ol">&#xf0cb icon-list-ol</option>
<option value="fa-strikethrough">&#xf0cc icon-strikethrough</option>
<option value="fa-underline">&#xf0cd icon-underline</option>
<option value="fa-table">&#xf0ce icon-table</option>
<option value="fa-magic">&#xf0d0 icon-magic</option>
<option value="fa-truck">&#xf0d1 icon-truck</option>
<option value="fa-pinterest">&#xf0d2 icon-pinterest</option>
<option value="fa-pinterest-sign">&#xf0d3 icon-pinterest-sign</option>
<option value="fa-google-plus-sign">&#xf0d4 icon-google-plus-sign</option>
<option value="fa-google-plus">&#xf0d5 icon-google-plus</option>
<option value="fa-money">&#xf0d6 icon-money</option>
<option value="fa-caret-down">&#xf0d7 icon-caret-down</option>
<option value="fa-caret-up">&#xf0d8 icon-caret-up</option>
<option value="fa-caret-left">&#xf0d9 icon-caret-left</option>
<option value="fa-caret-right">&#xf0da icon-caret-right</option>
<option value="fa-columns">&#xf0db icon-columns</option>
<option value="fa-sort">&#xf0dc icon-sort</option>
<option value="fa-sort-down">&#xf0dd icon-sort-down</option>
<option value="fa-sort-up">&#xf0de icon-sort-up</option>
<option value="fa-envelope">&#xf0e0 icon-envelope</option>
<option value="fa-linkedin">&#xf0e1 icon-linkedin</option>
<option value="fa-undo">&#xf0e2 icon-undo</option>
<option value="fa-legal">&#xf0e3 icon-legal</option>
<option value="fa-dashboard">&#xf0e4 icon-dashboard</option>
<option value="fa-comment-alt">&#xf0e5 icon-comment-alt</option>
<option value="fa-comments-alt">&#xf0e6 icon-comments-alt</option>
<option value="fa-bolt">&#xf0e7 icon-bolt</option>
<option value="fa-sitemap">&#xf0e8 icon-sitemap</option>
<option value="fa-umbrella">&#xf0e9 icon-umbrella</option>
<option value="fa-paste">&#xf0ea icon-paste</option>
<option value="fa-lightbulb">&#xf0eb icon-lightbulb</option>
<option value="fa-exchange">&#xf0ec icon-exchange</option>
<option value="fa-cloud-download">&#xf0ed icon-cloud-download</option>
<option value="fa-cloud-upload">&#xf0ee icon-cloud-upload</option>
<option value="fa-user-md">&#xf0f0 icon-user-md</option>
<option value="fa-stethoscope">&#xf0f1 icon-stethoscope</option>
<option value="fa-suitcase">&#xf0f2 icon-suitcase</option>
<option value="fa-bell-alt">&#xf0f3 icon-bell-alt</option>
<option value="fa-coffee">&#xf0f4 icon-coffee</option>
<option value="fa-food">&#xf0f5 icon-food</option>
<option value="fa-file-text-alt">&#xf0f6 icon-file-text-alt</option>
<option value="fa-building">&#xf0f7 icon-building</option>
<option value="fa-hospital">&#xf0f8 icon-hospital</option>
<option value="fa-ambulance">&#xf0f9 icon-ambulance</option>
<option value="fa-medkit">&#xf0fa icon-medkit</option>
<option value="fa-fighter-jet">&#xf0fb icon-fighter-jet</option>
<option value="fa-beer">&#xf0fc icon-beer</option>
<option value="fa-h-sign">&#xf0fd icon-h-sign</option>
<option value="fa-plus-sign-alt">&#xf0fe icon-plus-sign-alt</option>
<option value="fa-double-angle-left">&#xf100 icon-double-angle-left</option>
<option value="fa-double-angle-right">&#xf101 icon-double-angle-right</option>
<option value="fa-double-angle-up">&#xf102 icon-double-angle-up</option>
<option value="fa-double-angle-down">&#xf103 icon-double-angle-down</option>
<option value="fa-angle-left">&#xf104 icon-angle-left</option>
<option value="fa-angle-right">&#xf105 icon-angle-right</option>
<option value="fa-angle-up">&#xf106 icon-angle-up</option>
<option value="fa-angle-down">&#xf107 icon-angle-down</option>
<option value="fa-desktop">&#xf108 icon-desktop</option>
<option value="fa-laptop">&#xf109 icon-laptop</option>
<option value="fa-tablet">&#xf10a icon-tablet</option>
<option value="fa-mobile-phone">&#xf10b icon-mobile-phone</option>
<option value="fa-circle-blank">&#xf10c icon-circle-blank</option>
<option value="fa-quote-left">&#xf10d icon-quote-left</option>
<option value="fa-quote-right">&#xf10e icon-quote-right</option>
<option value="fa-spinner">&#xf110 icon-spinner</option>
<option value="fa-circle">&#xf111 icon-circle</option>
<option value="fa-reply">&#xf112 icon-reply</option>
<option value="fa-github-alt">&#xf113 icon-github-alt</option>
<option value="fa-folder-close-alt">&#xf114 icon-folder-close-alt</option>
<option value="fa-folder-open-alt">&#xf115 icon-folder-open-alt</option>
<option value="fa-expand-alt">&#xf116 icon-expand-alt</option>
<option value="fa-collapse-alt">&#xf117 icon-collapse-alt</option>
<option value="fa-smile">&#xf118 icon-smile</option>
<option value="fa-frown">&#xf119 icon-frown</option>
<option value="fa-meh">&#xf11a icon-meh</option>
<option value="fa-gamepad">&#xf11b icon-gamepad</option>
<option value="fa-keyboard">&#xf11c icon-keyboard</option>
<option value="fa-flag-alt">&#xf11d icon-flag-alt</option>
<option value="fa-flag-checkered">&#xf11e icon-flag-checkered</option>
<option value="fa-terminal">&#xf120 icon-terminal</option>
<option value="fa-code">&#xf121 icon-code</option>
<option value="fa-reply-all">&#xf122 icon-reply-all</option>
<option value="fa-mail-reply-all">&#xf122 icon-mail-reply-all</option>
<option value="fa-star-half-empty">&#xf123 icon-star-half-empty</option>
<option value="fa-location-arrow">&#xf124 icon-location-arrow</option>
<option value="fa-crop">&#xf125 icon-crop</option>
<option value="fa-code-fork">&#xf126 icon-code-fork</option>
<option value="fa-unlink">&#xf127 icon-unlink</option>
<option value="fa-question">&#xf128 icon-question</option>
<option value="fa-info">&#xf129 icon-info</option>
<option value="fa-exclamation">&#xf12a icon-exclamation</option>
<option value="fa-superscript">&#xf12b icon-superscript</option>
<option value="fa-subscript">&#xf12c icon-subscript</option>
<option value="fa-eraser">&#xf12d icon-eraser</option>
<option value="fa-puzzle-piece">&#xf12e icon-puzzle-piece</option>
<option value="fa-microphone">&#xf130 icon-microphone</option>
<option value="fa-microphone-off">&#xf131 icon-microphone-off</option>
<option value="fa-shield">&#xf132 icon-shield</option>
<option value="fa-calendar-empty">&#xf133 icon-calendar-empty</option>
<option value="fa-fire-extinguisher">&#xf134 icon-fire-extinguisher</option>
<option value="fa-rocket">&#xf135 icon-rocket</option>
<option value="fa-maxcdn">&#xf136 icon-maxcdn</option>
<option value="fa-chevron-sign-left">&#xf137 icon-chevron-sign-left</option>
<option value="fa-chevron-sign-right">&#xf138 icon-chevron-sign-right</option>
<option value="fa-chevron-sign-up">&#xf139 icon-chevron-sign-up</option>
<option value="fa-chevron-sign-down">&#xf13a icon-chevron-sign-down</option>
<option value="fa-html5">&#xf13b icon-html5</option>
<option value="fa-css3">&#xf13c icon-css3</option>
<option value="fa-anchor">&#xf13d icon-anchor</option>
<option value="fa-unlock-alt">&#xf13e icon-unlock-alt</option>
<option value="fa-bullseye">&#xf140 icon-bullseye</option>
<option value="fa-ellipsis-horizontal">&#xf141 icon-ellipsis-horizontal</option>
<option value="fa-ellipsis-vertical">&#xf142 icon-ellipsis-vertical</option>
<option value="fa-rss-sign">&#xf143 icon-rss-sign</option>
<option value="fa-play-sign">&#xf144 icon-play-sign</option>
<option value="fa-ticket">&#xf145 icon-ticket</option>
<option value="fa-minus-sign-alt">&#xf146 icon-minus-sign-alt</option>
<option value="fa-check-minus">&#xf147 icon-check-minus</option>
<option value="fa-level-up">&#xf148 icon-level-up</option>
<option value="fa-level-down">&#xf149 icon-level-down</option>
<option value="fa-check-sign">&#xf14a icon-check-sign</option>
<option value="fa-edit-sign">&#xf14b icon-edit-sign</option>
<option value="fa-external-link-sign">&#xf14c icon-external-link-sign</option>
<option value="fa-share-sign">&#xf14d icon-share-sign</option>
<option value="fa-compass">&#xf14e icon-compass</option>
<option value="fa-collapse">&#xf150 icon-collapse</option>
<option value="fa-collapse-top">&#xf151 icon-collapse-top</option>
<option value="fa-expand">&#xf152 icon-expand</option>
<option value="fa-eur">&#xf153 icon-eur</option>
<option value="fa-gbp">&#xf154 icon-gbp</option>
<option value="fa-usd">&#xf155 icon-usd</option>
<option value="fa-inr">&#xf156 icon-inr</option>
<option value="fa-jpy">&#xf157 icon-jpy</option>
<option value="fa-cny">&#xf158 icon-cny</option>
<option value="fa-krw">&#xf159 icon-krw</option>
<option value="fa-btc">&#xf15a icon-btc</option>
<option value="fa-file">&#xf15b icon-file</option>
<option value="fa-file-text">&#xf15c icon-file-text</option>
<option value="fa-sort-by-alphabet">&#xf15d icon-sort-by-alphabet</option>
<option value="fa-sort-by-alphabet-alt">&#xf15e icon-sort-by-alphabet-alt</option>
<option value="fa-sort-by-attributes">&#xf160 icon-sort-by-attributes</option>
<option value="fa-sort-by-attributes-alt">&#xf161 icon-sort-by-attributes-alt</option>
<option value="fa-sort-by-order">&#xf162 icon-sort-by-order</option>
<option value="fa-sort-by-order-alt">&#xf163 icon-sort-by-order-alt</option>
<option value="fa-thumbs-up">&#xf164 icon-thumbs-up</option>
<option value="fa-thumbs-down">&#xf165 icon-thumbs-down</option>
<option value="fa-youtube-sign">&#xf166 icon-youtube-sign</option>
<option value="fa-youtube">&#xf167 icon-youtube</option>
<option value="fa-xing">&#xf168 icon-xing</option>
<option value="fa-xing-sign">&#xf169 icon-xing-sign</option>
<option value="fa-youtube-play">&#xf16a icon-youtube-play</option>
<option value="fa-dropbox">&#xf16b icon-dropbox</option>
<option value="fa-stackexchange">&#xf16c icon-stackexchange</option>
<option value="fa-instagram">&#xf16d icon-instagram</option>
<option value="fa-flickr">&#xf16e icon-flickr</option>
<option value="fa-adn">&#xf170 icon-adn</option>
<option value="fa-bitbucket">&#xf171 icon-bitbucket</option>
<option value="fa-bitbucket-sign">&#xf172 icon-bitbucket-sign</option>
<option value="fa-tumblr">&#xf173 icon-tumblr</option>
<option value="fa-tumblr-sign">&#xf174 icon-tumblr-sign</option>
<option value="fa-long-arrow-down">&#xf175 icon-long-arrow-down</option>
<option value="fa-long-arrow-up">&#xf176 icon-long-arrow-up</option>
<option value="fa-long-arrow-left">&#xf177 icon-long-arrow-left</option>
<option value="fa-long-arrow-right">&#xf178 icon-long-arrow-right</option>
<option value="fa-apple">&#xf179 icon-apple</option>
<option value="fa-windows">&#xf17a icon-windows</option>
<option value="fa-android">&#xf17b icon-android</option>
<option value="fa-linux">&#xf17c icon-linux</option>
<option value="fa-dribbble">&#xf17d icon-dribbble</option>
<option value="fa-skype">&#xf17e icon-skype</option>
<option value="fa-foursquare">&#xf180 icon-foursquare</option>
<option value="fa-trello">&#xf181 icon-trello</option>
<option value="fa-female">&#xf182 icon-female</option>
<option value="fa-male">&#xf183 icon-male</option>
<option value="fa-gittip">&#xf184 icon-gittip</option>
<option value="fa-sun">&#xf185 icon-sun</option>
<option value="fa-moon">&#xf186 icon-moon</option>
<option value="fa-archive">&#xf187 icon-archive</option>
<option value="fa-bug">&#xf188 icon-bug</option>
<option value="fa-vk">&#xf189 icon-vk</option>
<option value="fa-weibo">&#xf18a icon-weibo</option>
<option value="fa-renren">&#xf18b icon-renren</option>
        </select>
      </div>
      <div class="form_item">
        <input type="submit" name="Save Block">
      </div>
    </form>
  </div>
</div>
`;

var template = _.template(assetTemplate);

    // var config = editor.getConfig();
    var modal = editor.Modal;

    modal.setTitle('Save Layout Or Block');

    var content = template({
      categories:categories,
      blocks:blocks,
    });


    modal.setContent(content);

    modal.open();

          var sel = editor.getSelected();
          var html = sel.toHTML();

          var allClasses = [];
          var allElements = sel.view.el.querySelectorAll('*');

          for (var i = 0; i < allElements.length; i++) {
            var classes = allElements[i].className.toString().split(/\s+/);
            for (var j = 0; j < classes.length; j++) {
              var cls = classes[j];
              if (cls && allClasses.indexOf(cls) === -1)
                allClasses.push(cls);
            }
          }

          function elem_css(a, o) {
              var iframe = window.$('.gjs-frame')[0];
              var innerDoc = iframe.contentDocument || iframe.contentWindow.document;


          	var a = $(innerDoc).find('.' + a)[0]

              var sheets = innerDoc.styleSheets, o = o || [];
              a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
              for (var i in sheets) {
                if (!sheets[i].href) {
                  var rules = sheets[i].rules || sheets[i].cssRules;
                  if (rules) {
                    for (var r in rules) {
                      if (a.matches(rules[r].selectorText)) {
                        if (rules[r].cssText.indexOf('*') > -1 || rules[r].cssText.indexOf('.gjs') > -1) {
                        	continue;
                        }
                        if (o.indexOf(rules[r].cssText) === -1) {
                        	if (rules[r].cssText[0] == '.' || rules[r].cssText[0] == '#') {
                     		  o.push(rules[r].cssText);
                        	}
                        }

                      }
                    }
                  }
                }
              }
              return o;
          }

          	var result = [];
          for (var i = 0; i < allClasses.length; i++) {
          	elem_css(allClasses[i], result);
          }

          var css = result.join('\n')

          $("#NewLayoutForm").submit(function(e) {
              e.preventDefault();
              var formData = new FormData(this);
              formData.set('html', html)
              formData.set('css', css)

              $.ajax({
                  url: base_url + '/save-layout',
                  type: 'POST',
                  data: formData,
                  success: function (data) {

                      var attr = editor.getSelected().getAttributes();
                      attr['data-layout'] = data.id;
                      editor.getSelected().setAttributes(attr);


                      modal.close();
                  },
                  cache: false,
                  contentType: false,
                  processData: false
              });
          });

          $("form#NewBlockForm").submit(function(e) {
              e.preventDefault();
              var data = {};
              var formData = new FormData(this);

              for (var pair of formData.entries()) {
                data[pair[0]] = pair[1];
              }
              data.html = html;
              data.css = css;

              $.ajax({
                  url: base_url + '/save-block',
                  type: 'POST',
                  data: data,
                  success: function (data) {
                      modal.close();
                  }
              });
          });

        },
      };








      defaultCommands['tlb-clone'] = {
        run(ed) {
          var sel = ed.getSelected();

          if(!sel || !sel.get('copyable')) {
            console.warn('The element is not clonable');
            return;
          }

          var collection = sel.collection;
          var index = collection.indexOf(sel);
          collection.add(sel.clone(), {at: index + 1});
          ed.trigger('component:update', sel);
        },
      };

      defaultCommands['tlb-move'] = {
        run(ed, sender, opts) {
          var sel = ed.getSelected();
          var dragger;

          if(!sel || !sel.get('draggable')) {
            console.warn('The element is not draggable');
            return;
          }

          const onStart = (e, opts) => {
            console.log('start mouse pos ', opts.start);
            console.log('el rect ', opts.elRect);
            var el = opts.el;
            el.style.position = 'absolute';
            el.style.margin = 0;
          };

          const onEnd = (e, opts) => {
            em.runDefault();
            em.set('selectedComponent', sel);
            ed.trigger('component:update', sel);
            dragger && dragger.blur();
          };

          const onDrag = (e, opts) => {
            console.log('Delta ', opts.delta);
            console.log('Current ', opts.current);
          };

          var toolbarEl = ed.Canvas.getToolbarEl();
          toolbarEl.style.display = 'none';
          var em = ed.getModel();
          em.stopDefault();

          if (em.get('designerMode')) {
            // TODO move grabbing func in editor/canvas from the Sorter
            dragger = editor.runCommand('drag', {
              el: sel.view.el,
              options: {
                event: opts && opts.event,
                onStart,
                onDrag,
                onEnd
              }
            });
          } else {
            var cmdMove = ed.Commands.get('move-comp');
            cmdMove.onEndMoveFromModel = onEnd;
            cmdMove.initSorterFromModel(sel);
          }


          sel.set('status', 'selected');
        },
      };

      // Core commands
      defaultCommands['core:undo'] = e => e.UndoManager.undo();
      defaultCommands['core:redo'] = e => e.UndoManager.redo();
      defaultCommands['core:canvas-clear'] = e => {
        e.DomComponents.clear();
        // e.CssComposer.clear();
      };
      defaultCommands['core:copy'] = ed => {
        const em = ed.getModel();
        const model = ed.getSelected();

        if (model && model.get('copyable') && !ed.Canvas.isInputFocused()) {
          em.set('clipboard', model);
        }
      };
      defaultCommands['core:paste'] = ed => {
        const em = ed.getModel();
        const clp = em.get('clipboard');
        const model = ed.getSelected();
        const coll = model && model.collection;

        if (coll && clp && !ed.Canvas.isInputFocused()) {
          const at = coll.indexOf(model) + 1;
          coll.add(clp.clone(), { at });
        }
      };

      if(c.em)
        c.model = c.em.get('Canvas');

      this.loadDefaultCommands()

      return this;
    },

    /**
     * Add new command to the collection
     * @param	{string} id Command's ID
     * @param	{Object|Function} command Object representing your command,
     *  By passing just a function it's intended as a stateless command
     *  (just like passing an object with only `run` method).
     * @return {this}
     * @example
     * commands.add('myCommand', {
     * 	run(editor, sender) {
     * 		alert('Hello world!');
     * 	},
     * 	stop(editor, sender) {
     * 	},
     * });
     * // As a function
     * commands.add('myCommand2', editor => { ... });
     * */
    add,

    /**
     * Get command by ID
     * @param	{string}	id Command's ID
     * @return {Object} Object representing the command
     * @example
     * var myCommand = commands.get('myCommand');
     * myCommand.run();
     * */
    get(id) {
      var el = commands[id];

      if(typeof el == 'function'){
        el = new el(c);
        commands[id]	= el;
      }

      return el;
    },

    /**
     * Check if command exists
     * @param	{string}	id Command's ID
     * @return {Boolean}
     * */
    has(id) {
      return !!commands[id];
    },

    /**
     * Load default commands
     * @return {this}
     * @private
     * */
    loadDefaultCommands() {
      for (var id in defaultCommands) {
          this.add(id, defaultCommands[id]);
      }

      return this;
    },
  };

};
