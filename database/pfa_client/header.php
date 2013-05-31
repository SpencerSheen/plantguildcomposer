<?php include('site_functions.php');	  
	  loadSiteDetails();
	  
	  include('db_functions.php'); 
	  $IntrinsicChar = loadFunctionalAnalysis($db_intrinsics_lib);
	  $Need = loadFunctionalAnalysis($db_needs_lib);
	  $Product = loadFunctionalAnalysis($db_products_lib);
	  $Behavior = loadFunctionalAnalysis($db_behaviors_lib);
	  
	 //$Tools = loadFATools();
	  
	  if (isset($_GET['action'])){
		// Retrieve the GET parameters and executes the function
		  $funcName	 = $_GET['action'];
		  $vars	  = $_GET['vars'];
		  $funcName($vars); 
		  
	 } else if (isset($_POST['action'])){
		  // Retrieve the POST parameters and executes the function
		  $funcName	 = $_POST['action'];
		$vars	  = $_POST['vars'];
		$funcName($vars); 
	 } 
	?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo(get_site_title()); ?></title>
<link rel="stylesheet" href="style.css" type="text/css" media="screen" />
<script type="text/javascript" src="js/accordian.pack.js"></script>
<script type="text/javascript" src="js/ui.js"></script>
<!-- iin here make a script section, call the function that creates the functional analysis structure, and input the php variables above -->

</head>

<?php /* echo("<body onload='FAToolSetUp(".json_encode($Tools)."); FunctionalAnalysisSetUp(".json_encode($IntrinsicChar).",".json_encode($Need).",".json_encode($Product).",".json_encode($Behavior)."); new Accordian(\"accordian\",3,\"header_highlight\");'>"); */?> 
<?php echo("<body onload='FunctionalAnalysisSetUp(".json_encode($IntrinsicChar).",".json_encode($Need).",".json_encode($Product).",".json_encode($Behavior)."); new Accordian(\"accordian\",3,\"header_highlight\");'>");?>

<div id="header">
<h1><?php echo(get_site_title());?></h1>
</div>
<div>
<div><p><a href="https://docs.google.com/spreadsheet/viewform?fromEmail=true&formkey=dEFEQlZfSjdTSGk1WGZvTDBLZmdDTEE6MQ">Encounter a bug? Report it here.</a></p></div>