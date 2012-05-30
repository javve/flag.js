var reloadTimeout = null;
function changeValue(name, value) {
	$('#value-'+name+'').text(value);
	reloadTimeout = setTimeout(reloadFlags, 200);
}
function reloadFlags() {
	var options = {
	    class: "flag",
	    width: $('#value-width').text(),
	    height: $('#value-height').text(),
	    gradient: {
	        opacity: $('#value-gradient').text()
	    },
	    light: {
	        opacity:$('#value-light-opacity').text(),
	        width: $('#value-light').text()
	    },
	    border: {
	        opacity:$('#value-border-opacity').text(),
	        width: $('#value-border').text()
	    }
	};
	new Flag(options);
}

$('#width').range({
	range: false,
	change: function(values) {
		changeValue('width', values);
	}
});
$('#height').range({
	range: false,
	change: function(values) {
		changeValue('height', values);
	}
});
$('#gradient').range({
	range: false,
	change: function(values) {
		changeValue('gradient', values/100);
	}
});
$('#border').range({
	range: false,
	change: function(values) {
		changeValue('border', values);
	}
});
$('#border-opacity').range({
	range: false,
	change: function(values) {
		changeValue('border-opacity', values/100);
	}
});
$('#light').range({
	range: false,
	change: function(values) {
		changeValue('light', values);
	}
});
$('#light-opacity').range({
	range: false,
	change: function(values) {
		changeValue('light-opacity', values/100);
	}
});


$('.code .number').click(function() {
	var me = $(this);
	var inp = $('<input>');
	me.html(inp);
	inp.focus();

	inp.blur(function() {
		me.html(inp.val());
		reloadFlags();
	});

	inp.keydown(function(e) {
		if(e.keyCode == 13) {
			me.html(inp.val());
			reloadFlags();
	    }
	});
});