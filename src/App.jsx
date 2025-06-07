import Form from './Form'
import './index.css'

function App() {
  return (
    <div className='container-xl flex flex-col items-center h-screen gap-12 p-4'>
      <div>
        <h1 className='text-5xl font-bold text-center text-[#3370dc]'>Ders Çalışma Programı Oluşturucu</h1>
        <p className='mt-1 text-center text-[#075d70]'>
          Yapay zeka destekli ders programı oluşturucu.
        </p>
      </div>
      <Form />

      <footer>
        <p className='text-center text-gray-500 font-semibold'>
          &copy; 2025 <a href='instagram.com/m.akif.tasci' className='text-[#3370dc]'>M. Akif Taşçı</a> tarafından ❤️ ile yapıldı.
        </p>
      </footer>
    </div>
  )
}
 
export default App
