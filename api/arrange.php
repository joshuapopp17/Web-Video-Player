<?php
//error_reporting(E_ALL);


require("helpers/server_response.php");

$request = new ClientRequest();
$dataSource = new DataSource("PoppJoshua_431Final.json");
$response = new ServerResponse($request, $dataSource);

$response->process();

function PUT(ClientRequest $request, DataSource $dataSource, ServerResponse $response)
{
    $data = $dataSource->JSON(true);

    $newPlaylist = $request->put['playlist'] ?? $data;

    $newJson = json_encode($newPlaylist);

    file_put_contents($dataSource->writePath, $newJson);

    $response->status = "OK";
    $response->outputJSON($newJson);
}

exit;

$dataPath = __DIR__ . "\PoppJoshua_431Final.json";

$json = file_get_contents($dataPath);

$data = json_decode($json, true);

echo ("<pre>" . print_r($data, true) . "</pre>");

$newJson = json_encode($data);

//file_put_contents($dataPath, $newJson);

Header("Content-Type: application/json; charset=utf-8");
exit(json_encode($testResults));