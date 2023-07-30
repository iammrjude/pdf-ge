import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Table, drawTable } from 'pdf-lib-table';

const generatePDFWithTable = async () => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([600, 400]);

  const table = new Table();

  // Define the table properties
  const x = 50; // X-coordinate of the top-left corner of the table
  const y = 350; // Y-coordinate of the top-left corner of the table
  const tableWidth = 500;
  const tableHeight = 200;
  const numberOfRows = 5;
  const numberOfColumns = 4;
  const cellWidth = tableWidth / numberOfColumns;
  const cellHeight = tableHeight / numberOfRows;

  // Add table content (sample data)
  const data = [
    ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
    ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3', 'Row 1, Cell 4'],
    ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3', 'Row 2, Cell 4'],
    ['Row 3, Cell 1', 'Row 3, Cell 2', 'Row 3, Cell 3', 'Row 3, Cell 4'],
    ['Row 4, Cell 1', 'Row 4, Cell 2', 'Row 4, Cell 3', 'Row 4, Cell 4'],
  ];

  // Add rows and cells to the table
  for (let i = 0; i < numberOfRows; i++) {
    const row = table.createRow();
    for (let j = 0; j < numberOfColumns; j++) {
      const cell = row.createCell(`${data[i][j]}`);
      cell.setWidth(cellWidth);
      cell.setPadding(5);
    }
    table.addRow(row);
  }

  // Set table position and style
  table.setPosition(x, y);
  table.setDrawContentCellBorders(true);
  table.setDrawHeaderRow(true);
  table.setHeaderRowBackgroundColor(rgb(0.8, 0.8, 0.8));

  // Draw the table on the PDF page
  drawTable(page, table);

  // Save the PDF to a Uint8Array
  const pdfBytes = await doc.save();

  return pdfBytes;
};


  async function handleGeneratePDFWithTable() {
  try {
    const pdfBytes = await generatePDFWithTable();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Use the library to trigger the download of the PDF
    saveAs(pdfBlob, 'table.pdf');
  } catch (error) {
    console.log('Error generating PDF:', error);
  }
}

import { saveAs } from 'file-saver';

const MyPage = () => {
  return (
    <div>
      <h1>PDF with Table Generation</h1>
      <button onClick={handleGeneratePDFWithTable}>Generate PDF</button>
    </div>
  );
};

export default MyPage;
