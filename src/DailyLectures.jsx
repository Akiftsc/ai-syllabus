import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

/* eslint-disable react/prop-types */
const subjectColors= {
  Kimya: "bg-emerald-100 text-emerald-800",
  Matematik: "bg-blue-100 text-blue-800",
  Fizik: "bg-indigo-100 text-indigo-800",
  Biyoloji: "bg-green-100 text-green-800",
  Türkçe: "bg-amber-100 text-amber-800",
  "Türk Dili ve Edebiyatı": "bg-yellow-100 text-yellow-800",
  Tarih: "bg-rose-100 text-rose-800",
  Coğrafya: "bg-teal-100 text-teal-800",
}

export default function DailyLectures({lectures}) {
  const handleDownloadPDF = () => {
  const input = document.getElementById('lectures-container');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    // A4, landscape: mm cinsinden
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('çalışma-programı.pdf');
  });
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#373b6b]">Önerilen Program ✨</h1>
      <button
          onClick={() => handleDownloadPDF()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mb-2"
        >
          PDF Olarak Kaydet 
        </button>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-3" id="lectures-container">
        {lectures.map((schedule, index) => (
          <div key={index} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#373b6b] text-white p-4">
              <h2 className="text-2xl font-semibold">{schedule.gun}</h2>
            </div>
            <div className="p-4">
              <div className="min-h-[300px] overflow-y-auto pr-2">
                {schedule.dersler.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="mb-4 last:mb-0">
                    <div
                      className={`text-lg font-semibold mb-2 px-2 py-1 rounded ${subjectColors[lecture.ders] || "bg-gray-100 text-gray-800"}`}
                    >
                      {lecture.ders}
                    </div>
                    <div className="pl-2 space-y-1">
                      <div className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span>{lecture.konu}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{lecture.sure}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        <span>{lecture.eylem}</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

