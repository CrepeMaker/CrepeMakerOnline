<?php

$env_ini = parse_ini_file("../env.ini");

$db = new mysqli($env_ini['DB_SERVER'], $env_ini['DB_USER'], $env_ini['DB_PASSWORD'], $env_ini['DB_DATABASE']);
$db->set_charset('utf8');

if( $db->connect_error ){
  echo "Connection could not be established.<br/>;";
  die( print_r( array($DB->connect_error, E_USER_ERROR), true));
}

try{
  $size = array_key_exists('size', $_GET) ? $_GET['size'] : 5;
  $category_size = array_key_exists('category_size', $_GET) ? $_GET['category_size'] : 100;

  $stmt_shop = $db->prepare(
    'SELECT id, name, address, tel, latitude, longitude FROM shops ORDER BY RAND() LIMIT ?'
  );

  $stmt_shop->bind_param('d', $size);
  $success = $stmt_shop->execute();

  if (!$success) {
      throw new Exception('Error in SQL queries.');
  }

  $stmt_shop->bind_result($id, $name, $address, $tel, $latitude, $longitude);

  $data = [];

  while ($stmt_shop->fetch()) {
    $shop_data = array(
      'id' => $id, 'name' => $name, 'address' => $address,
      'tel' => $tel, 'latitude' => $latitude, 'longitude' => $longitude,
      'sites' => array(), 'scores' => array(),
    );
    array_push($data, $shop_data);
  }

  $stmt_shop->close();

  for ($i = 0; $i < count($data); $i++) {
    $stmt_site = $db->prepare(
      'SELECT pages.url, genre, sites.name FROM pages, sites WHERE site_id = sites.id AND shop_id = ?'
    );
    $stmt_site->bind_param('d', $data[$i]['id']);
    $success = $stmt_site->execute();

    if (!$success) {
      throw new Exception('Error in SQL queries.');
    }

    $stmt_site->bind_result($url, $genre, $site_name);

    while ($stmt_site->fetch()) {
      $data[$i]['sites'][$site_name] = array('genre' => $genre, 'url' => $url);
    }

    $stmt_site->close();

    $stmt_scores = $db->prepare(
      'SELECT category, score FROM shopscores WHERE shop_id = ? ORDER BY score DESC LIMIT ?'
    );
    $stmt_scores->bind_param('dd', $data[$i]['id'], $category_size);
    $success = $stmt_scores->execute();

    if (!$success) {
      throw new Exception('Error in SQL queries.');
    }

    $stmt_scores->bind_result($category, $score);

    while ($stmt_scores->fetch()) {
      array_push($data[$i]['scores'], array('category' => $category, 'score' => $score));
    }

    $stmt_scores->close();
  }

  http_response_code(200);
  echo json_encode($data);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array('error' => $e->getMessage()));

  $db->rollback();
}
