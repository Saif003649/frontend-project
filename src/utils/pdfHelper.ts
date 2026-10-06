import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RfqSubmission, Product } from '../types';

export function generateRfqPdf(rfq: RfqSubmission) {
  const doc = new jsPDF();

  // Primary Colors
  const navy = '#0F172A';
  const red = '#DC2626';
  const gray = '#475569';

  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy
  doc.rect(0, 0, 210, 42, 'F');

  // Red Accent Strip
  doc.setFillColor(220, 38, 38); // Flame Red
  doc.rect(0, 40, 210, 3, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('VENUS ENTERPRISES', 14, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Global Industrial Valve & Flow Control Manufacturer', 14, 27);
  doc.text('ISO 9001:2015 | API 6D | API 600 Certified', 14, 33);

  // RFQ Title Right Aligned
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('REQUEST FOR QUOTATION', 196, 20, { align: 'right' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`RFQ Ref: ${rfq.rfqNumber}`, 196, 27, { align: 'right' });
  doc.text(`Date: ${rfq.date}`, 196, 34, { align: 'right' });

  // Reset Text Color
  doc.setTextColor(15, 23, 42);

  // Client Details Section
  let y = 52;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT & PROJECT INFORMATION', 14, y);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y + 2, 196, y + 2);

  y += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Company Name:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.companyName, 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Contact Person:', 120, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.contactPerson, 155, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Email Address:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.email, 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Phone Number:', 120, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.phone, 155, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Industry Sector:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.industry, 50, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Target Market/Country:', 120, y);
  doc.setFont('helvetica', 'normal');
  doc.text(rfq.country, 165, y);

  // Table of Items
  y += 14;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CONFIGURED VALVE SPECIFICATIONS', 14, y);

  const tableData = rfq.items.map((item, idx) => [
    `#${idx + 1}`,
    item.productName,
    item.size,
    item.pressureClass,
    item.material,
    item.endConnection,
    item.operation,
    item.quantity.toString()
  ]);

  autoTable(doc, {
    startY: y + 4,
    head: [['Item', 'Valve Description', 'Size', 'Class', 'Material', 'End Conn.', 'Operator', 'Qty']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { left: 14, right: 14 }
  });

  // Operating Parameters & Notes
  // @ts-ignore
  let finalY = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OPERATING CONDITIONS & SPECIAL REMARKS:', 14, finalY);

  rfq.items.forEach((item, idx) => {
    finalY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(
      `• Item #${idx + 1}: Fluid Medium: ${item.fluidMedium || 'Standard'} | Operating Temp: ${item.operatingTemp || 'Ambient'} | Notes: ${item.specialNotes || 'Standard Factory Hydrostatic Test API 598'}`,
      18,
      finalY
    );
  });

  // Terms & Conditions Footer
  finalY += 16;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, finalY, 182, 28, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, finalY, 182, 28, 'S');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('COMMERCIAL TERMS & TECHNICAL COMPLIANCE:', 18, finalY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('1. Valve pressure testing certified to API 598 / ISO 5208 with Mill Test Reports (EN 10204 3.1).', 18, finalY + 12);
  doc.text('2. Quotations prepared by Venus Technical Desk within 4 to 8 business hours.', 18, finalY + 17);
  doc.text('3. Direct Inquiries Desk: +91 22 4890 1200 | Email: sales@venusenterprises.com', 18, finalY + 22);

  // Save the PDF
  doc.save(`Venus_Enterprises_RFQ_${rfq.rfqNumber}.pdf`);
}

export function generateProductDatasheetPdf(product: Product) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy
  doc.rect(0, 0, 210, 36, 'F');

  doc.setFillColor(220, 38, 38); // Red strip
  doc.rect(0, 34, 210, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('VENUS ENTERPRISES', 14, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('TECHNICAL DATASHEET & ENGINEERING SPECIFICATIONS', 14, 25);

  doc.setFontSize(10);
  doc.text(`Model: ${product.modelNumber}`, 196, 20, { align: 'right' });
  doc.text(`Category: ${product.category}`, 196, 27, { align: 'right' });

  // Title
  let y = 46;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(product.name, 14, y);

  y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(71, 85, 105);
  doc.text(product.tagline, 14, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  const splitDesc = doc.splitTextToSize(product.description, 182);
  doc.text(splitDesc, 14, y);

  y += splitDesc.length * 5 + 6;

  // Specs Table
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('TECHNICAL PARAMETERS', 14, y);

  const specRows = [
    ['Size Range', product.specs.sizeRange],
    ['Pressure Ratings', product.specs.pressureRatings.join(', ')],
    ['Temperature Limits', product.specs.temperatureRange],
    ['Body Materials', product.specs.materials.join('\n')],
    ['End Connections', product.specs.endConnections.join('\n')],
    ['Design Standards', product.specs.standards.join(', ')],
    ['Seat & Trim Material', product.specs.seatMaterial],
    ['Actuation & Operators', product.specs.operationTypes.join(', ')]
  ];

  autoTable(doc, {
    startY: y + 3,
    head: [['Specification Metric', 'Engineering Details']],
    body: specRows,
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 55 } }
  });

  // Save Datasheet
  doc.save(`Venus_Datasheet_${product.modelNumber}.pdf`);
}
