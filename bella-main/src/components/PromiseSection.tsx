import React, { useState } from 'react';

export default function PromiseSection() {
  const [promiseText, setPromiseText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o redirecionamento imediato da página
    const form = e.currentTarget;

    try {
      // Faz o POST via AJAX suportado nativamente pelo Formspree
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSaved(true); // Sucesso! Mostramos a mensagem bonita.
      } else {
        // Se a conta livre tiver proteção antibot/Captcha não resolvida, o Formspree bloqueia o JSON.
        // Forçamos o submit nativo do formulário para o usuário passar pelo Captcha do Formspree.
        form.submit();
      }
    } catch (err) {
      console.error(err);
      form.submit();
    }
  };

  return (
    <section className="promise-section" id="promise">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label rv">Para o futuro</span>
          <h2 className="section-title rv" style={{ color: 'var(--wine)' }}>Faça uma promessa</h2>
          <p className="section-subtitle rv" style={{ color: 'var(--text-soft)' }}>Escreva um desejo, uma promessa, um sonho. Será guardado com carinho no nosso cofre de memórias.</p>
        </div>
        <div className="promise-card rv">

          {!isSaved ? (
            <form action="https://formspree.io/f/mbdababb" method="POST" onSubmit={handleSubmit}>
              {/* Anti-spam */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Opcional: assunto do e-mail */}
              <input type="hidden" name="_subject" value="Nova mensagem do site (Bella)" />

              <textarea
                className="promise-ta"
                id="msg"
                name="message"
                rows={6}
                required
                placeholder="Escreva aqui sua promessa para o futuro..."
                value={promiseText}
                onChange={(e) => setPromiseText(e.target.value)}
              ></textarea><br />

              <button type="submit" className="p-btn" id="pBtn">Guardar no coração 💝</button>
            </form>
          ) : (
            <div id="pSaved" style={{ marginTop: '20px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--wine)', fontStyle: 'italic' }}>
              ✨ Sua promessa foi enviada e guardada com todo amor do mundo. ✨
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
