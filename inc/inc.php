<?php

require 'function\comm.php';
require 'class\comm.php';

//数据库

$sqif = array(
	'sn' => '127.0.0.1',
	'un' => 'root' ,
	'pw' => 'root',
	'db' => 'br'
);

/*
$mysql=@mysql_connect($sqif['sn'],$sqif['un'],$sqif['pw']);
if (!$mysql)error('数据库连接出现问题');
mysql_select_db($sqif['db'], $mysql);
*/
?>