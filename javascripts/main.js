const DOM_CLASSES = {
  accordionQuestion: 'accordion-question',
  isShown: 'is-shown',
  contentIsShown: 'content-is-shown'
}

/**
 * Permite acceder a los métodos de las clases más comunes de un elemento,
 * como add, remove, toggle y contains.
 * 
 * @param { HTMLElement } element - Elemento DOM para hacer operaciones con sus
 * classes CSS.
 * 
 * @returns Objeto con las diferentes operaciones que se pueden realizar sobre
 * las clases del elemento.
 */
const elementClasses = element => {
  return {
    add: (className) => element.classList.add(className),
    remove: (className) => element.classList.remove(className),
    toggle: (className) => element.classList.toggle(className),
    contains: (className) => element.classList.contains(className)
  }
}

/**
 * Edita el contenido de la variable CSS del elemento HTML que se indican
 * en los parámetros.
 * 
 * @param { HTMLElement } element Elemento DOM al que vamos a modificar su
 * variable CSS.
 * @param { String } property - Nombre de la variable CSS que queremos editar
 * sin neceesitad de pasarle los dos guiones iniciales.
 * @param { String } value - Nuevo valor para la variable CSS.
 */
const setCustomPropertyValue = (element, property, value) => {
  element.style.setProperty(`--${property}`, value);
}

/**
 * Captura el evento de tipo click sobre el acordeón y aplica la lógica para
 * expander o contraer una FAQ.
 * 
 * @param { Event } e - Evento de tipo click que se produce cuando se clica
 * sobre el acordeón.
 */

 
const handleAccordionClick = (e) => {
  const target = e.target;

  if (elementClasses(target).contains(DOM_CLASSES.accordionQuestion)) {
    const collapsibleContentDOMElement = target.nextElementSibling;
    const accordionItemTitleDOMElement = target;

    if (elementClasses(collapsibleContentDOMElement).contains(DOM_CLASSES.isShown)) {
      setCustomPropertyValue(collapsibleContentDOMElement, 'max-height', 0);
    } else {
      setCustomPropertyValue(
        collapsibleContentDOMElement,
        'max-height',
        `${collapsibleContentDOMElement.scrollHeight}px`
      );
    }

    elementClasses(collapsibleContentDOMElement).toggle(DOM_CLASSES.isShown);
    elementClasses(accordionItemTitleDOMElement).toggle(DOM_CLASSES.contentIsShown);
  }
}

const accordionDOMElement = document.getElementById('accordion');
const collapsibleDOMElements = [...accordionDOMElement.querySelectorAll('.collapsible')];

accordionDOMElement.addEventListener('click', handleAccordionClick);
