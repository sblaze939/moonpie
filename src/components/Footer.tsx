export default function Footer() {
  return (
    <footer
      style={{
        padding: '60px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'var(--text)',
          marginBottom: '10px',
        }}
      >
        Made with too much love and very little sleep — Your Chandler Bing 🌙
      </p>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}
      >
        Happy Birthday, Sep 2
      </p>
    </footer>
  )
}
