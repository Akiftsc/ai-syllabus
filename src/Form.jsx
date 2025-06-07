import { useState } from "react";
import DailyLectures from "./DailyLectures";
import PulseLoader from "react-spinners/PulseLoader";

const Form = () => {
    const [bolum, setBolum] = useState("");
    const [prompt, setPrompt] = useState("");
    const [program, setProgram] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const bolumSec = (e) => {
        setBolum(e.target.id);
    };

    const CreateProgram = () => {
      setIsLoading(true);
      const url = 'https://api.edenai.run/v2/text/chat';
      const options = {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTYzNzk1ODMtZDFkMi00NmZkLWI2MDgtYjQyODYxOWU1ZDNiIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.UXwoUyHbjl4zEm_q3BPb-tyxWFKk3IriqcBjc1ojbGQ'
      },
      body: JSON.stringify({
          response_as_dict: true,
          attributes_as_list: false,
          show_base_64: true,
          show_original_response: false,
          temperature: 0,
          max_tokens: 4096,
          tool_choice: 'auto',
          providers: ['google/gemini-2.0-flash'],
          text: `${prompt} ve BİR ${bolum} öğrencisiyim.`,
          chatbot_global_action: 
          `ihtiyaca göre DERS ÇALIŞMA PROGRAMI hazırlıyorsun. Sana verilen komuta göre kullanıcının istediği şekilde program oluşturacaksın. 7 günlük program oluştur daha fazla yapma. Prompt emirlerinden çıkmayacaksın. Eğer kullanıcı belirttiyse ders kısmına konusunu da ekle, mesela: Matematik-Parabol Konuyu en yeni MEB müfredatına göre belirle. Programa önce konu, sonra soru çözme şeklinde ekleme yap. JSON formatında çıktı ver ve çıktılar şu şekilde olacak: 
          [
            {
              "gun": "Pazartesi",
              "dersler": [
                  {ders: "Fizik", konu: "Atışlar", sure: "2 saat", eylem: "Konu Çalışma"},
                  {ders: "Matematik", konu: "Parabol", sure: "1 saat", eylem: "3 test"},
              ]
            },
            {
              "gun": "Salı",
              "dersler": [
                  {ders: "kimya", konu: "Gazlar", sure: "2 saat", eylem: "Konu Çalışma"},
                  {ders: "biyoloji", konu: "Genel tekrar eksik kapatma", sure: "2 saat", eylem: "5 Test Çözme"},
              ]
            },
            {
              "gun": "Çarşamba",
              "dersler": [
                  {ders: "Tarih", konu: "15.YY Osmanlı Siyaseti", sure: "2 saat", eylem: "Konu Çalışma"},
              ]
            }
          ]

          AYT dersleri için:
            Eğer kullanıcı eşit ağırlık ise (Türk Edebiyatı Dili ve Edebiyatı, Geometri, Matematik, Tarih, Coğrafya) derslerini 
            Eğer kullanıcı sayısal ise (Matematik, Fizik, Biyoloji, Kimya) derslerini dahil et. 
          TYT dersleri için:
          (Türkçe, Matematik, Tarih, Coğrafya, Fizik, Kimya, Biyoloji) dahil et.


          Programda hem AYT hem TYT karışık olabilir. Kullanıcının isteğine göre programı oluştur.
          Programda derslerin sürelerini de belirteceksin. Örneğin: "Fizik - Atışlar 2 saat konu." gibi.
          Programda derslerin konularını da belirteceksin. Örneğin: "Matematik - Parabol 1 saat konu, 1 saat soru çözme." gibi.
          DERS OLMAYAN GÜNLERİ PROGRAMA DAHİL ETME.
          SÜRELER TAHMİNİ OLACAK.
          `

      })
      };
    fetch(url, options)
      .then(res => res.json())
      .then(data =>  {
        const program = data["google/gemini-2.0-flash"].generated_text.slice(7, -3);
        console.log(program);
        console.log(typeof program);
        setIsLoading(false);
        setProgram(JSON.parse(program));
      })
      .catch(err => {
       alert("bir hata oluştu!")
       console.error(err)
       setIsLoading(false) 
      });
  } 


    return (
        <div className="container mx-auto">
          <PulseLoader color="#373b6b" loading={isLoading} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 mt-11 rounded-4xl" />
            <div className="mx-auto">
                <div className="w-full mx-auto md:px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#373b6b] mb-4">Program Oluştur</h2>
                    <form>
                        <div className="mb-4 flex gap-4">
                            <div className="flex">
                                <label className="block text-[#373b6b] mb-1" htmlFor="say">Sayısal</label>
                                <input id="say" value="say" className="md:w-24 w-10 px-4 py-2 bg-gray-200" checked={bolum === 'say'} onChange={bolumSec} type="radio" />
                            </div>
                            <div className="flex">
                                <label className="block text-[#373b6b] mb-1" htmlFor="ea">Eşit Ağırlık</label>
                                <input id="ea" value="ea" className="md:w-24 w-10 px-4 py-2 bg-gray-200" type="radio" onChange={bolumSec} checked={bolum === 'ea'} />
                            </div>
                        </div>
                        <label>Nasıl bir program istersin?</label>
                        <textarea className="w-full min-h-24 px-4 py-2 bg-gray-200 outline-1" placeholder="Neye ihtiyacın var? eg. Ayt kimya gazlardan eksiğim var, Matematik parabol çalışmam gerekiyor ve günlük paragrafı eksik etmeden 3 günde hepsini tekrar etmeliyim." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        <button
                            className="w-full px-4 py-2 mt-4 bg-[#373b6b] text-white rounded hover:bg-[#25273c] cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                CreateProgram();
                            }}
                        >
                            Program Oluştur
                        </button>
                    </form>
                    <div>
                    {program.length > 0 && <DailyLectures lectures={program} />}
                  </div>

                </div>
            </div>

            
        </div>
    );
};

export default Form;
