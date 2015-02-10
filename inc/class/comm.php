<?php
require 'captcha.php';

/**
* 安全部分
*/
class secure
{
	//协议构建正则表达式
	function proc($res){
		if ($res=='')error("未定义允许的协议");
		$res=explode(',', $res);
		$re='';
		$count=count($res);
		for ($i=1; $i <= $count; $i++) {
			if($i==1)$re="(";
			$re=$re.$res[$i-1]."\:\/\/*";
			if($i!=$count)$re=$re."|";
			if($i==$count)$re=$re.")";
		}
	return $re;
	}

//class结束
}
?>