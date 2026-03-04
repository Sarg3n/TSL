# TSL Landing v3 (Premium UI)

Inclui:
- Layout moderno e responsivo (desktop/mobile)
- Tema **Dark/Light** com persistência (localStorage)
- Barra de **Pesquisa** (filtra secções/cards por keywords)
- **Animações suaves** (IntersectionObserver reveal)
- **Galeria PNG** com lightbox (click para ampliar)
- Formulário (GitHub Pages friendly) -> **mailto** para `TSLtestes@gmail.com`
- Botão flutuante de **WhatsApp**
- Links para **Facebook / Instagram / YouTube** (substituir pelos URLs reais)

## Como correr localmente
```bash
python -m http.server 8080
```
Abrir: http://localhost:8080

## Publicar no GitHub Pages
1) Criar repo e fazer upload destes ficheiros
2) Settings → Pages → Deploy from branch → main → /(root)

## Email "real" (envio automático)
GitHub Pages é estático — para enviar email automaticamente precisas de backend.
Opções típicas:
- Supabase Edge Function (server-side) + provider (Resend/SMTP)
- Formspree / Getform / Netlify Forms (serviços externos)

Se quiseres, digo-te exatamente como ligar o formulário à tua Supabase Edge Function (sem expor credenciais no frontend).
