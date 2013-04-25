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
			'icon-datebookenvelope' : '&#xe006;',
			'icon-datebookpencil' : '&#xe007;',
			'icon-datebookpen-alt-fill' : '&#xe008;',
			'icon-datebookpen' : '&#xe009;'
			'icon-number' : '&#xe000a;',
			'icon-number-2' : '&#xe001a;',
			'icon-number-3' : '&#xe002a;',
			'icon-number-4' : '&#xe003a;',
			'icon-number-5' : '&#xe004a;',
			'icon-number-6' : '&#xe005a;',
			'icon-number-7' : '&#xe006a;',
			'icon-number-8' : '&#xe007a;',
			'icon-number-9' : '&#xe008a;',
			'icon-number-10' : '&#xe009a;',
			'icon-number-11' : '&#xe00aa;',
			'icon-number-12' : '&#xe00ba;',
			'icon-number-13' : '&#xe00ca;',
			'icon-number-14' : '&#xe00da;',
			'icon-number-15' : '&#xe00ea;',
			'icon-number-16' : '&#xe00fa;',
			'icon-number-17' : '&#xe010a;',
			'icon-number-18' : '&#xe011a;'			
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
		c = c.match(/icon-datebook[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};