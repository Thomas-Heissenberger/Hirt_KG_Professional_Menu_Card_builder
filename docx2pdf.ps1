$documents_path = (Get-Content -Path '.\.env'| Where-Object {$_ -like '*OUTPUTDIRECTORY*'}).split("=")[1]
$document_name = (Get-Content -Path '.\.env'| Where-Object { $_ -like '*RESULTFILENAME*'}).split("=")[1]
$file_extension = (Get-Content -Path '.\.env'| Where-Object { $_ -like '*EXTENSION*'}).split("=")[1]
$total_filepath = $documents_path+"\"+$document_name+$file_extension


$word_app = New-Object -ComObject Word.Application

 (Get-Item -Path $total_filepath).FullName

$document = $word_app.Documents.Open((Get-Item -Path $total_filepath).FullName)
$pdf_filename = "$($documents_path)\$($document_name).pdf"
$document.SaveAs([ref] $pdf_filename, [ref] 17)
$document.Close()

$word_app.Quit()