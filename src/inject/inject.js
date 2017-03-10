chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			var shareOfflineCheckInterval = setInterval(function() {
				if ($("#share-offline-link").length) {
					clearInterval(shareOfflineCheckInterval);
					$("label .input-placeholder").html("支持http/https/ftp/电驴/磁力链协议/<strong>迅雷/快车/旋风</strong>");
					$("#share-offline-link").on("change paste keyup", function() {
						if ($(this).val().match(/thunder:\/\//g)) {
							$(this).val(decodeThunder($(this).val()));
						}
						else if ($(this).val().match(/Flashget:\/\//g)) {
							$(this).val(decodeFlashget($(this).val()));
						}
						else if ($(this).val().match(/qqdl:\/\//g)) {
							$(this).val(decodeQQ($(this).val()));
						}
					});
				};
			}, 800);
		}
	}, 10);
});

function decodeThunder(url) {
	url = url.replace('thunder://','');
	thunderUrl = Base64.decode(url);
	return thunderUrl.substr(2,thunderUrl.length-4);
}

function decodeFlashget(url){
	url = url.replace('Flashget://','');
	if (url.indexOf('&') >= 0) {
		url = url.substr(0, url.indexOf('&'));	 
	}
	url = Base64.decode(url);
	flashgeturl = url.replace(/\[FLASHGET\]/g,'');
	return flashgeturl;
}

function decodeQQ(url){
	return Base64.decode(url.replace('qqdl://',''));
}

// Reference: https://jsfiddle.net/gabrieleromanato/qaght/
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	decode: function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},
	_utf8_decode: function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}

}