const pages = ['pagina-01.png', 'pagina-02.png', 'pagina-03.png', 'pagina-04.png', 'pagina-05.png', 'pagina-06.png', 'pagina-07.png', 'pagina-08.png', 'pagina-09.png', 'pagina-10.png', 'pagina-11.png', 'pagina-12.png', 'pagina-13.png', 'pagina-14.png'];
let current = 0;
let busy = false;

const sheet = document.getElementById('page');
const pageImage = document.getElementById('pageImage');
const nextImage = document.getElementById('nextImage');
const backImage = document.getElementById('backImage');
const counter = document.getElementById('counter');
const bookArea = document.getElementById('bookArea');
const zoomLayer = document.getElementById('zoomLayer');
const zoomImage = document.getElementById('zoomImage');

function srcFor(index) {
  return 'pages/' + pages[Math.max(0, Math.min(pages.length - 1, index))];
}

function updateVisible() {
  pageImage.src = srcFor(current);
  pageImage.alt = `Página ${current + 1} de ${pages.length}`;
  nextImage.src = srcFor(current < pages.length - 1 ? current + 1 : current);
  nextImage.alt = `Página ${Math.min(current + 2, pages.length)} de ${pages.length}`;
  backImage.src = srcFor(current);
  counter.textContent = `${current + 1} / ${pages.length}`;
}

function goTo(target) {
  if (busy) return;
  target = Math.max(0, Math.min(pages.length - 1, target));
  if (target === current) return;

  busy = true;
  const forward = target > current;

  // Para avançar, a próxima folha fica embaixo da atual.
  // Para voltar, usamos a animação inversa e atualizamos o conteúdo ao final.
  if (forward) {
    nextImage.src = srcFor(target);
    nextImage.alt = `Página ${target + 1} de ${pages.length}`;
  }

  sheet.classList.remove('flipping-next','flipping-prev');
  void sheet.offsetWidth;
  sheet.classList.add(forward ? 'flipping-next' : 'flipping-prev');

  setTimeout(() => {
    current = target;
    sheet.classList.remove('flipping-next','flipping-prev');
    updateVisible();
    busy = false;
  }, 740);
}

document.getElementById('next').onclick = () => goTo(current + 1);
document.getElementById('prev').onclick = () => goTo(current - 1);
document.getElementById('nextBottom').onclick = () => goTo(current + 1);
document.getElementById('prevBottom').onclick = () => goTo(current - 1);
document.getElementById('first').onclick = () => goTo(0);
document.getElementById('last').onclick = () => goTo(pages.length - 1);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1); }
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End') goTo(pages.length - 1);
  if (e.key === 'Escape') zoomLayer.classList.remove('open');
});

function openZoom(scale) {
  zoomLayer.classList.add('open');
  zoomLayer.setAttribute('aria-hidden','false');
  zoomImage.src = pageImage.src;
  zoomImage.style.width = (pageImage.naturalWidth * scale) + 'px';
}
document.getElementById('zoomIn').onclick = () => openZoom(1.5);
document.getElementById('zoomOut').onclick = () => openZoom(.85);
document.getElementById('closeZoom').onclick = () => zoomLayer.classList.remove('open');
zoomLayer.onclick = e => { if (e.target === zoomLayer || e.target === zoomImage) zoomLayer.classList.remove('open'); };

document.getElementById('fullscreen').onclick = async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
};

let startX = null, startY = null;
bookArea.addEventListener('pointerdown', e => {
  startX = e.clientX; startY = e.clientY;
  bookArea.setPointerCapture?.(e.pointerId);
});
bookArea.addEventListener('pointerup', e => {
  if (startX === null) return;
  const dx = e.clientX - startX, dy = e.clientY - startY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) goTo(current + 1); else goTo(current - 1);
  } else if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx)) {
    if (dy < 0) goTo(current + 1); else goTo(current - 1);
  }
  startX = startY = null;
});

updateVisible();
