// $Id$

/**
 * Appends the given items to the given list, optionally inserting a separator
 * between the items in the list.
 *
 * @param {String} list The list to append items to.
 * @param {Array} items The list of items to append to the list.
 * @param {String} [separator] A string to add between the items.
 */
AjaxSolr.theme.prototype.list_items = function (list, items, separator) {
  jQuery(list).empty();
  for (var i = 0, l = items.length; i < l; i++) {
    var li = jQuery('<li/>');
    if (AjaxSolr.isArray(items[i])) {
      for (var j = 0, m = items[i].length; j < m; j++) {
        if (separator && j > 0) {
          li.append(separator);
        }
        li.append(items[i][j]);
      }
    }
    else {
      if (separator && i > 0) {
        li.append(separator);
      }
      li.append(items[i]);
    }
    jQuery(list).append(li);
  }
};

/**
 * Accepts a container (array) and returns a string of option tags. Given a
 * container where the elements are two-element arrays, the first elements
 * serve as option text and the second elements serve as option values. If
 * <tt>selected</tt> is specified, the matching option value or element will
 * get the selected option-tag. <tt>selected</tt> may also be an array of
 * values to be selected when using a multiple select.
 * <p>From Ruby on Rails.</p>
 *
 * @param {Array} container
 * @param {Array|String} selected
 * @returns {String} The option tags.
 */
AjaxSolr.theme.prototype.options_for_select = function (container, selected) {
  var options = [];

  for (var i = 0, l = container.length; i < l; i++) {
    var text, value;

    if (AjaxSolr.isArray(container[i])) {
      text = container[i][0].toString(), value = container[i][1].toString();
    }
    else {
      text = container[i].toString(), value = container[i].toString();
    }

    var selectedAttribute = AjaxSolr.optionValueSelected(value, selected) ? ' selected="selected"' : '';
    options.push('<option value="' + value.htmlEscape() +'"' + selectedAttribute + '>' + text.htmlEscape() + '</option>');
  }

  return options.join('\n');
};

/**
 * <p>From Ruby on Rails.</p>
 */
AjaxSolr.theme.prototype.select_tag = function (name, optionTags, options) {
  options = options || {};
  var htmlName = options.multiple && !name.endsWith('[]') ? name + '[]' : name;
  options.name = options.name || htmlName;
  options.id = options.id || name.sanitizeToId();
  return AjaxSolr.theme('content_tag_string', 'select', optionTags, options);
};

/**
 * <p>From Ruby on Rails.</p>
 */
AjaxSolr.theme.prototype.content_tag_string = function (name, content, options, escape) {
  var tagOptions = '';

  if (escape === undefined) {
    escape = true;
  }

  if (options) {
    tagOptions = AjaxSolr.tagOptions(options, escape)
  }

  return '<' + name + tagOptions + '>' + content + '</' + name + '>';
};

/**
 * <p>From Ruby on Rails.</p>
 *
 * @field
 * @private
 */
AjaxSolr.booleanAttributes = [ 'disabled', 'readonly', 'multiple', 'checked' ];

/**
 * <p>From Ruby on Rails.</p>
 *
 * @static
 */
AjaxSolr.optionValueSelected = function (value, selected) {
  if (AjaxSolr.isArray(selected)) {
    return AjaxSolr.inArray(value, selected) != -1;
  }
  else {
    return selected == value;
  }
};

/**
 * <p>From Ruby on Rails.</p>
 *
 * @static
 */
AjaxSolr.tagOptions = function (options, escape) {
  options = options || {};

  if (escape === undefined) {
    escape = true;
  }

  var attrs = [];

  if (escape) {
    for (var key in options) {
      if (AjaxSolr.inArray(key, AjaxSolr.booleanAttributes) != -1) {
        if (options[key]) {
          attrs.push(key + '="' + key + '"');
        }
      }
      else {
        if (options[key]) {
          attrs.push(key + '="' + options[key].escapeOnce() + '"');
        }
      }
    }
  }
  else {
    for (var key in options) {
      attrs.push(key + '="' + options[key] + '"');
    }
  }

  if (attrs.length) {
    return ' ' + attrs.sort().join(' ');
  }

  return '';
};
