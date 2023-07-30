import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const generatePDFWithTable = async () => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([600, 400]);

  // Define the table properties
  const x = 50; // X-coordinate of the top-left corner of the table
  const y = 350; // Y-coordinate of the top-left corner of the table
  const tableWidth = 500;
  const tableHeight = 200;
  const numberOfRows = 5;
  const numberOfColumns = 4;
  const cellWidth = tableWidth / numberOfColumns;
  const cellHeight = tableHeight / numberOfRows;

  // Draw the table outline
  page.drawRectangle({
    x,
    y,
    width: tableWidth,
    height: tableHeight,
    borderColor: rgb(0, 0, 0),
    borderWidth: 2,
  });

  // Add table content (sample data)
  const data = [
    ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
    ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3', 'Row 1, Cell 4'],
    ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3', 'Row 2, Cell 4'],
    ['Row 3, Cell 1', 'Row 3, Cell 2', 'Row 3, Cell 3', 'Row 3, Cell 4'],
    ['Row 4, Cell 1', 'Row 4, Cell 2', 'Row 4, Cell 3', 'Row 4, Cell 4'],
  ];

  const fontSize = 12;
  const textMargin = 5;

  // Use StandardFonts
  const font = await doc.embedFont(StandardFonts.Helvetica);

  // Draw table headers
  for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
    const cellText = data[0][colIndex];
    const cellX = x + colIndex * cellWidth;
    const cellY = y - cellHeight + cellHeight;
    page.drawText(cellText, { x: cellX + textMargin, y: cellY - textMargin, size: fontSize, font });
  }

  // Draw table data
  for (let rowIndex = 1; rowIndex < numberOfRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
      const cellText = data[rowIndex][colIndex];
      const cellX = x + colIndex * cellWidth;
      const cellY = y - (rowIndex + 1) * cellHeight + cellHeight;
      page.drawText(cellText, { x: cellX + textMargin, y: cellY - textMargin, size: fontSize, font });
    }
  }

  // Save the PDF to a Uint8Array
  const pdfBytes = await doc.save();

  return pdfBytes;
};

// Rest of the code remains the same...

// For the handleGeneratePDFWithTable function, use the same code as before
// to trigger the download of the generated PDF with the table.



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
