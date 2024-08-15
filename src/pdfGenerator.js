import html2pdf from 'html2pdf.js';
import logo from './assets/sheinin-architects-logo.png';

export const generatePDF = (questions, answers) => {
  const content = `
    <div dir="rtl" style="font-family: Arial, sans-serif;">
      <h1 style="text-align: center; color: #D2A88F; margin-top: 5px; margin-bottom: 5px;">סיכום שאלון תכנון וילה</h1>
      <table style="width: 100%; border-collapse: collapse; direction: rtl;">
        <thead>
          <tr style="background-color: #D2A88F; color: white;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">שאלה</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">תשובה</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">הערות</th>
          </tr>
        </thead>
        <tbody>
          ${questions.map((q, i) => q.type === 'header' 
            ? `<tr><td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold; background-color: #E6D9CC;">${q.category}</td></tr>`
            : `<tr style="background-color: ${i % 2 === 0 ? '#F5F2EE' : 'white'};">
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${q.question}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${answers[q.id] || 'לא נענה'}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${answers[`${q.id}_note`] || ''}</td>
              </tr>`
          ).join('')}
        </tbody>
      </table>
    </div>
  `;

  const opt = {
    margin: [30, 10, 10, 10],
    filename: 'villa-questionnaire-summary.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(content).set(opt).toPdf().get('pdf').then((pdf) => {
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setPage(1);
    
    const img = new Image();
    img.onload = function() {
      const aspectRatio = img.width / img.height;
      
      const logoWidth = 50;
      const logoHeight = logoWidth / aspectRatio;
      
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 5;

      pdf.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
      pdf.save('villa-questionnaire-summary.pdf');
    };
    img.src = logo;
  });
};