/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { robotoBase64, robotoBoldBase64 } from "./robotoFont";

// --- EXPORT DO CSV (Beze změny) ---
export const exportToCSV = (filename: string, data: Record<string, any>[]) => {
  if (!data || data.length === 0) return;
  const separator = ";";
  const keys = Object.keys(data[0]);
  const csvContent = [
    keys.join(separator),
    ...data.map(row => 
      keys.map(key => {
        const cell = row[key] ?? "";
        if (typeof cell === "number") return cell.toString().replace(".", ",");
        return `"${cell.toString().replace(/"/g, '""').replace(/\n|\r/g, " ")}"`;
      }).join(separator)
    )
  ].join("\r\n");

  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- EXPORT DO PDF (KOMPATIBILNÍ VERZE S QR KÓDEM) ---
export const exportToPDF = (
  filename: string, 
  title: string, 
  tableRows: string[][], 
  tableHead: string[], 
  data?: any,           // Volitelná data pro fakturu
  qrCodeDataUri?: string // Volitelný QR kód jako obrázek
) => {
  const doc = new jsPDF();

  // 1. REGISTRACE FONTŮ
  if (robotoBase64 && robotoBase64.length > 100) {
    doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  }
  if (robotoBoldBase64 && robotoBoldBase64.length > 100) {
    doc.addFileToVFS("Roboto-Bold.ttf", robotoBoldBase64);
    doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  }

  doc.setFont("Roboto", "normal");

  // --- SCÉNÁŘ A: STARÉ STRÁNKY (Bez dat) ---
  if (!data) {
    doc.setFont("Roboto", "bold");
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [tableHead],
      body: tableRows,
      theme: 'striped',
      styles: { font: "Roboto", fontStyle: 'normal' },
      headStyles: { fillColor: [59, 130, 246], font: "Roboto", fontStyle: 'bold' },
    });
    
    doc.save(`${filename}.pdf`);
    return; 
  }

  // --- SCÉNÁŘ B: ELITE FAKTURA (S daty a QR kódem) ---
  doc.setFont("Roboto", "bold");
  doc.setFontSize(18);
  doc.setTextColor(37, 99, 235);
  doc.text(title, 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`${data.isForeign ? 'Variable Symbol' : 'Variabilní symbol'}: ${data.variableSymbol}`, 196, 20, { align: 'right' });

  doc.setDrawColor(220, 220, 220);
  doc.line(14, 25, 196, 25);

  // Adresy
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(data.isForeign ? 'SUPPLIER' : 'DODAVATEL', 14, 32);
  doc.text(data.isForeign ? 'CLIENT' : 'ODBĚRATEL', 110, 32);

  doc.setTextColor(0, 0, 0);
  doc.setFont("Roboto", "bold");
  doc.setFontSize(10);
  doc.text(data.supplier?.name || '', 14, 38);
  doc.text(data.client?.name || '', 110, 38);

  doc.setFont("Roboto", "normal");
  doc.setFontSize(9);
  doc.text(`${data.supplier?.street || ''}\n${data.supplier?.zip || ''} ${data.supplier?.city || ''}\nIČO: ${data.supplier?.ico || ''}`, 14, 44);
  doc.text(`${data.client?.street || ''}\n${data.client?.zip || ''} ${data.client?.city || ''}\nIČO: ${data.client?.ico || ''}`, 110, 44);

  // Platební údaje
  doc.setFillColor(248, 248, 248);
  doc.rect(14, 62, 182, 15, 'F');
  doc.setFontSize(8.5);
  doc.setFont("Roboto", "bold");
  doc.text(`${data.isForeign ? 'Account:' : 'Účet:'} ${data.supplier?.account || ''}`, 18, 71);
  doc.text(`${data.isForeign ? 'Due Date:' : 'Splatnost:'} ${data.dueDate || ''}`, 120, 71);

  // Tabulka položek
  autoTable(doc, {
    startY: 82,
    head: [tableHead],
    body: tableRows,
    theme: 'striped',
    styles: { font: "Roboto", fontStyle: 'normal', fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246], font: "Roboto", fontStyle: 'bold' },
  });

  // QR KÓD (pokud je dodán)
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  if (qrCodeDataUri) {
    try {
      doc.addImage(qrCodeDataUri, 'PNG', 14, finalY, 30, 30);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("QR PLATBA", 14, finalY + 34);
    } catch (e) {
      console.error("QR Code image failed to load in PDF", e);
    }
  }

  // Patička / Registrace
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(data.supplier?.registration || '', qrCodeDataUri ? 50 : 14, finalY + 5, { maxWidth: 140 });
  
  doc.save(`${filename}.pdf`);
};