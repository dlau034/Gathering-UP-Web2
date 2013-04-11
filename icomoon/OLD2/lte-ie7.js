/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-datebookcaret-down' : '&#xf0d7;',
			'icon-datebookcaret-up' : '&#xf0d8;',
			'icon-datebookcaret-left' : '&#xf0d9;',
			'icon-datebookcaret-right' : '&#xf0da;',
			'icon-datebookDatebook' : '&#xe000;',
			'icon-datebookDatebook2' : '&#xe001;',
			'icon-datebooktumblr' : '&#xe002;',
			'icon-datebookfacebook' : '&#xe003;',
			'icon-datebookplus' : '&#xe004;',
			'icon-datebookminus' : '&#xe005;',
			'icon-datebookenvelope' : '&#xe006;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-datebook[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};