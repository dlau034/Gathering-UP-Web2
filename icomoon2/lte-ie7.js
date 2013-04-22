/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'brankic1979\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-number' : '&#xe000;',
			'icon-number-2' : '&#xe001;',
			'icon-number-3' : '&#xe002;',
			'icon-number-4' : '&#xe003;',
			'icon-number-5' : '&#xe004;',
			'icon-number-6' : '&#xe005;',
			'icon-number-7' : '&#xe006;',
			'icon-number-8' : '&#xe007;',
			'icon-number-9' : '&#xe008;',
			'icon-number-10' : '&#xe009;',
			'icon-number-11' : '&#xe00a;',
			'icon-number-12' : '&#xe00b;',
			'icon-number-13' : '&#xe00c;',
			'icon-number-14' : '&#xe00d;',
			'icon-number-15' : '&#xe00e;',
			'icon-number-16' : '&#xe00f;',
			'icon-number-17' : '&#xe010;',
			'icon-number-18' : '&#xe011;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};