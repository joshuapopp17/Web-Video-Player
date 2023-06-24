<?php
//error_reporting(E_ALL);


require("helpers/server_response.php");

$request = new ClientRequest();
$dataSource = new DataSource("PoppJoshua_431Final.json");
$response = new ServerResponse($request, $dataSource);



$response->process();


function POST(ClientRequest $request, DataSource $dataSource, ServerResponse $response)
{
    $data = $dataSource->JSON(true);
    $newTitle = $request->post['title'] ?? false;
    $newUrl = $request->post['video_url'] ?? false;
    $newDate = $request->post['added'] ?? false;

    $newData = array(
        "title" => $newTitle,
        "video_url" => $newUrl,
        "added" => $newDate,
        "played" => false,
    );

    array_push($data, $newData);

    $newJson = json_encode($data);

    file_put_contents($dataSource->writePath, $newJson);

    $response->status = "OK";
    $response->outputJSON($newData);
}
function GET(ClientRequest $request, DataSource $dataSource, ServerResponse $response)
{
    $data = $dataSource->JSON(true);
    $output = [];
    $output = $data;
    $response->status = "OK";
    $response->outputJSON($output);
}

function PUT(ClientRequest $request, DataSource $dataSource, ServerResponse $response)
{
    $data = $dataSource->JSON(true);

    $indexValue = $request->put['index'] ?? 0;
    $newTitle = $request->put['title'] ?? false;
    $newUrl = $request->put['video_url'] ?? false;
    $newDate = $request->put['added'] ?? false;

    $newData = array(
        "title" => $newTitle,
        "video_url" => $newUrl,
        "added" => $newDate,
        "played" => true,
    );

    $new_array = array_replace($data, array($indexValue => $newData));

    $newJson = json_encode($new_array);

    file_put_contents($dataSource->writePath, $newJson);

    $response->status = "OK";
    $response->outputJSON($newData);
}

function DELETE(ClientRequest $request, DataSource $dataSource, ServerResponse $response)
{
    $data = $dataSource->JSON(true);
    $deleteIndex = $request->get["index"] ?? 0;
    // var_dump($deleteIndex)
    array_splice($data, $deleteIndex, 1);

    $newJson = json_encode($data);

    file_put_contents($dataSource->writePath, $newJson);

    $response->status = "OK";
    $response->outputJSON($data);
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