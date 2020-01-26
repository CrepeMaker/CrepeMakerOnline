<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);
$db->set_charset('utf8');

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{
  if (!$_GET || !array_key_exists('id', $_GET) || !is_string($_GET['id']) || !strlen($_GET['id'])) {
    http_response_code(402);
    echo json_encode(array('error' => 'Invalid Request'));
    exit(0);
  }

  $shop_id = (int)$_GET['id'];

  $stmt_shop = $db->prepare(
    'SELECT name, address, tel, latitude, longitude FROM shops WHERE id = ?'
  );

  $stmt_shop->bind_param('d', $shop_id);
  $success = $stmt_shop->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries.');
  }

  $stmt_shop->bind_result($name, $address, $tel, $latitude, $longitude);
  $stmt_shop->fetch();

  $data = array(
    'name' => $name, 'address' => $address, 'tel' => $tel, 'latitude' => $latitude, 'longitude' => $longitude,
    'sites' => array(),
  );

  $stmt_shop->close();

  $stmt_site = $db->prepare(
    'SELECT pages.url, genre, sites.name FROM pages, sites WHERE site_id = sites.id AND shop_id = ?'
  );
  $stmt_site->bind_param('d', $shop_id);
  $success = $stmt_site->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries.');
  }

  $stmt_site->bind_result($url, $genre, $site_name);

  while ($stmt_site->fetch()) {
    $data['sites'][$site_name] = array('genre' => $genre, 'url' => $url);
  }
  $stmt_site->close();

  http_response_code(200);
  echo json_encode($data);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
