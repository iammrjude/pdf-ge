import { PDFDocument, rgb } from 'pdf-lib';

const generatePDF = async () => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]); // Change the size as per your requirement

  // Define the table properties
  const x = 50; // X-coordinate of the top-left corner of the table
  const y = 350; // Y-coordinate of the top-left corner of the table
  const tableWidth = 500;
  const tableHeight = 200;
  const numberOfRows = 4;
  const numberOfColumns = 3;
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

  // Add table content
  const tableData = [
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
    ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
    ['Row 3, Cell 1', 'Row 3, Cell 2', 'Row 3, Cell 3'],
  ];

  const fontSize = 12;
  const textMargin = 5;

  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
      const cellText = tableData[rowIndex][colIndex];
      const cellX = x + colIndex * cellWidth;
      const cellY = y - (rowIndex + 1) * cellHeight + cellHeight;
      page.drawText(cellText, { x: cellX + textMargin, y: cellY - textMargin, size: fontSize });
    }
  }

  // Save the PDF to a Uint8Array
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};

const GeneratePDFPage = ({ pdfBytes }) => {
  const downloadPDF = () => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_table.pdf'; // Set the desired file name
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Generated PDF with Table</h1>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export async function getServerSideProps() {
  // Generate the PDF with the table
  const pdfBytes = await generatePDF();

  // Convert the Uint8Array to a base64 string to pass it as a prop
  const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

  return {
    props: {
      pdfBytes: pdfBase64,
    },
  };
}

export default GeneratePDFPage;
