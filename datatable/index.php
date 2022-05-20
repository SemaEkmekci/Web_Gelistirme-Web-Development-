<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css" />
    <title>DataTable</title>

    <style>
      body{
        background-color: rgba(232, 232, 232, 0.3);
      }
      #data{
        text-align:center;
        background-color:#3a5fcd;
        border: 3px solid rgba(39, 64, 139, 0.4);
        box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.15);
        font-family:system-ui;
        border-radius:6px;
        overflow:hidden;
      }
      
      select,input {
        border: 1px solid #3a5fcd !important;
      }

      label{
        color:#000000;
        margin-bottom: 20px;
      }
      .dtr-control:before {
        background-color: #908f8f !important;
      }

      .dataTables_wrapper .dataTables_paginate .paginate_button.disabled{
        color:#000000 !important;
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover{
        color: #3a5fcd !important;
      }
      

      .baslik{
        border-bottom: 3px solid #66cdaa;
        font-size:20px;
        color:#fff;
      }
      .govde{
        border-bottom: 3px solid #66cdaa;
      }
    </style>
  </head>
  <body>

    <div class="container" style="margin-top:50px">
      
        <table id="data"class="display responsive nowrap" >
        <thead class="baslik">
          <th>İD</th>
          <th>İSİM</th>
          <th>SOYİSİM</th>
          <th>Telefon</th>
          <th>E-mail</th>
          <th>Yaş</th>
          </thead>
      
    </div>
    <tbody class="govde">
    <?php 
    
    $db = mysqli_connect("localhost", "root", "","datatable");
    
    if(mysqli_connect_errno()){
        echo "Bağlantı Hatası";

    }

    $sorgu=mysqli_query($db,"SELECT * FROM datatable");

    if($sorgu){
        while($kayit=mysqli_fetch_array($sorgu)){
            echo"
            <tr>
                <td>".$kayit['id']."</td>
                <td>".$kayit['name']."</td>
                <td>".$kayit['surname']."</td>
                <td>".$kayit['phone']."</td>
                <td>".$kayit['email']."</td>
                <td>".$kayit['age']."</td>
            </tr>";
        }
    }
    ?>
</tbody>
</table>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>

    <script>
    $(document).ready(function () {
    $("#data").DataTable({
      lengthMenu: [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Tümü"]],
      pageLength: 25,      
    });
    });
    </script>
  </body>
</html>
