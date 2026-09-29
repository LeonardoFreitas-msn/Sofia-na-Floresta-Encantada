# Sofia na Floresta Encantada — Flipbook

Projeto estático para publicar no GitHub Pages, sem depender do Heyzine.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `sofia-floresta-encantada`.
2. Envie **todo o conteúdo desta pasta** para o repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Salve e aguarde a publicação.
6. O GitHub fornecerá o endereço do site.

## Controles

- Setas ← →: página anterior/próxima
- Home / End: primeira/última página
- Espaço / PageDown / PageUp: navegação
- Botões laterais e inferiores
- Arrastar no celular para virar a página
- Zoom
- Tela cheia

As páginas foram convertidas do PDF para imagens para que o site não dependa do Heyzine.

## Efeito de virada vertical

A versão atual usa uma folha 3D sobreposta à próxima página. Ao avançar, a folha parte da borda inferior e gira 180° no eixo horizontal, criando o efeito de levantar a página para cima. A face traseira da folha também é renderizada durante a rotação.
