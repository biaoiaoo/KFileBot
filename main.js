$(document).ready(function() {
	$('#menu>li').click(function (){
		if(isMobile()) $('.sidebar').fadeOut();
		if($(this).hasClass('selected')) return;
		$('.menu li.selected').removeClass('selected');
		$(this).addClass('selected');
		var content_id = $(this).attr('id').replace('menu_', '#content-');
		if($(this).attr('id') != 'menu_index') load_filelist($(this).attr('id').replace('menu_', ''));
		$('.main-content>div').addClass('hidden');
		$(content_id).removeClass('hidden');
	});
	$('.menubtn').click(function(){
		$('.sidebar').fadeIn();
		autohide_sidebar();
	});
	$(window).on('hashchange', function() {
		parse_hash();
	});
	hideloading();
	while(location.hash.lastIndexOf('#') > 0) location.hash = location.hash.substring(0, location.hash.lastIndexOf('#'));
	parse_hash();
	// Load JS
	load_js();
});

var guide_viewed = false;
var stat = [];
if (typeof defered_js == 'undefined') var defered_js = new Array;

function parse_hash(){
	var hash = location.hash.substring(1);
	if(hash.indexOf('#') >= 0){
		location.href = location.href.substring(0, location.href.lastIndexOf('#'));
		location.reload();
		return;
	}
	if($('#menu_'+hash).length > 0){
		$('#menu_'+hash).click();
	}else{
		$('#menu_index').click();
	}
}
function autohide_sidebar(){
	if($(".sidebar:hover").length > 0) return setTimeout(autohide_sidebar, 500);
	if($(".menubtn:hover").length > 0) return setTimeout(autohide_sidebar, 500);
	$('.sidebar').fadeOut();
}
function isMobile(){
	return $('body').width() <= 550;
}
function load_js(){
	for(id in defered_js){
		var script;
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = defered_js[id] + '?' + Math.random();
		document.getElementsByTagName('head')[0].appendChild(script);
	}
}
function showloading(){
	$('.loading-icon').removeClass('hidden');
	$('.loading-icon').removeClass('h');
}
var loading_win_timer;
function hideloading(){
	$('.loading-icon').addClass('h');
	if(loading_win_timer) clearTimeout(loading_win_timer);
	loading_win_timer = setTimeout(function(){ $('.loading-icon').addClass('hidden'); }, 300);
}
function load_filelist(k){
	showloading()
	$.getJSON("ajax.php?id="+k, function(result){
		if(!result) return;
		$('#content-'+k+' table tbody').html('');
		$.each(result, function(i, field){
			$("#content-"+k+" table tbody").append("<tr><td>"+(i*1+1)+"</td><td><a href=\""+cdnServer+k+"/"+field.name+"\">"+field.name+"</a></td><td class=\"mobile_hidden\">"+new Date(field.time * 1000).Format("yyyy年M月d日 hh:mm:ss")+"</td><td>"+Math.round(field.size/100)/10+"KB</td></tr>");
		});
		hideloading()
	}).fail(function() { alert('无法加载文件列表'); }).always(function(){ hideloading(); });
}

function swtichCdnServer(newServer){
	cdnServer = newServer;
	$('.menu li.selected').removeClass('selected');
	parse_hash();
}

Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}