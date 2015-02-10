<?php
require 'inc/inc.php';

$url=$_GET['url'];

$secure=new secure;

if (!preg_match($secure->proc('http,https'), $url)) {
	exit('不支持该类型');
}
$url=str_replace(array('http://','https://'), '', $url);

echo $url;
?>