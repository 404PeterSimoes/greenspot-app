// Não está a ser usado

import { createAnimation } from "@ionic/react";

// animação de entrada (slide da direita para o centro)
const enterAnimation = (baseEl: HTMLElement) => {
  const root = baseEl.shadowRoot;

  // animação do fundo (backdrop)
  const backdropAnimation = createAnimation()
    .addElement(root?.querySelector('ion-backdrop')!)
    .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  // animação do conteúdo do modal (wrapper)
  const wrapperAnimation = createAnimation()
    .addElement(root?.querySelector('.modal-wrapper')!)
    .keyframes([
      { offset: 0, opacity: '0', transform: 'translateX(100%)' },
      { offset: 1, opacity: '1', transform: 'translateX(0)' },
    ]);

  // juntar ambas as animações
  return createAnimation()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(400)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

// animação de saída (slide do centro para a esquerda)
const leaveAnimation = (baseEl: HTMLElement) => {
  const root = baseEl.shadowRoot;

  const backdropAnimation = createAnimation()
    .addElement(root?.querySelector('ion-backdrop')!)
    .fromTo('opacity', 'var(--backdrop-opacity)', '0');

  const wrapperAnimation = createAnimation()
    .addElement(root?.querySelector('.modal-wrapper')!)
    .keyframes([
      { offset: 0, opacity: '1', transform: 'translateX(0)' },
      { offset: 1, opacity: '0', transform: 'translateX(-100%)' },
    ]);

  return createAnimation()
    .addElement(baseEl)
    .easing('ease-in')
    .duration(300)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

export { enterAnimation, leaveAnimation };
