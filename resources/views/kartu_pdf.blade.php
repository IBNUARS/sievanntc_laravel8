<html>
<head>
  <title>Cetak Kartu Ujian</title>
  <style>
    @page { 
      margin: 1cm; 
    }
    body { 
      margin: 0px; 
      font-size: 12px;
    }
    h4{
      font-size: 16px;
    }

    .kartu{
      border: 1px solid #000;
      margin-bottom: 20px;
    }
    .kartu td{
        padding: 0 5px;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
   <table>
      <tr>
        @php $no = 1 @endphp
        @foreach($peserta as $p)
        <td style="width: 9cm" valign="top">
          <table width="100%" class="kartu">
             <tr><td colspan="2" align="center"><h3>KARTU UJIAN</h3></td></tr>
             <tr><td>Nama</td><td>: {{$p->nama_peserta}}</td></tr>
             <tr><td>Sekolah</td><td>: {{$p->nama_sekolah}}</td></tr>
             <tr><td>Kelas</td><td>: {{$p->kelas}}</td></tr>
             <tr><td>No. Ujian</td><td>: {{$p->no_ujian}}</td></tr>
             <tr><td>Password</td><td>: {{$p->password}} {{$no}}</td></tr>
          </table>
        </td>

        @if($no%2==0)
            </tr><tr>
        @else
            <td style="width: 0.5cm"> &nbsp; </td>
        @endif

        @if($no%10==0)
                </tr>
            </table>            
            <div class="page-break"></div>
            <table>
                <tr>
        @endif

        @php $no++ @endphp
        @endforeach
      </tr>
   </table>
</body>
</html>