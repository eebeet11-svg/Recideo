export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ fontSize: '48px', color: '#0D1B2A' }}>
        Resideo
      </h1>
      <p style={{ fontSize: '24px', color: '#C9A96E', marginBottom: '40px' }}>
        A Place You Can Call Home - welcome
      </p>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2>Resideo Spånga Villa</h2>
          <p>Stinsbacken 9, Spånga</p>
          <p style={{ fontWeight: 'bold' }}>From 2,495 SEK/night</p>
          <button style={{
            background: '#C9A96E',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Book Now
          </button>
        </div>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2>Resideo Tulegatan Studio</h2>
          <p>Tulegatan, Sundbyberg</p>
          <p style={{ fontWeight: 'bold' }}>From 1,295 SEK/night</p>
          <button style={{
            background: '#C9A96E',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Book Now
          </button>
        </div>
        
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2>Resideo Tulegatan Two</h2>
          <p>Tulegatan, Sundbyberg</p>
          <p style={{ fontWeight: 'bold' }}>From 1,795 SEK/night</p>
          <button style={{
            background: '#C9A96E',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
