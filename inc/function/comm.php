<?php

function error($v='未知错误')
{
$content='<!DOCTYPE html><html><head><title>发生错误</title><style>html{text-align:center}h1{margin-top:10%;color:red;size:5%}p{margin-top:2%;size:3%}</style></head><body><h1>BigBang</h1><p>程序在运行过程中发生了一个错误，请联系管理员</p><hr width="200" /><p>错误原因:</p><p>'.$v.'</p><hr width="200" /><p><small>By:konge</small></p></body></html>';
exit($content);
}

function i($v=''){
	$va=stripcslashes(htmlspecialchars(trim($v)));
	return $v;
}

function is($v=false,$type=false)
{
	if (!($v)||!($type))return false;
}



?>