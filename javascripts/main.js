const IS_SHOWN = 'is-shown';
const ACCORDION_QUESTION = 'accordion-question';
const CONTENT_IS_SHOWN = 'content-is-shown';

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

 
const handleAccordionClick = (e, accordionDOMElement) => {
  const { target } = e;

  // Comprobamos si el elemento sobre el que estamos clicando es el título de
  // una sección del acordeón.
  if (elementClasses(target).contains(ACCORDION_QUESTION)) {
    const collapsibleContentDOMElement = target.nextElementSibling;
    const accordionItemTitleDOMElement = target;

    // Comprobamos si la sección del acordeón sobre la que hemos clicado está
    // abierta. Si es así, la cerramos.
    if (elementClasses(collapsibleContentDOMElement).contains(IS_SHOWN)) {
      setCustomPropertyValue(collapsibleContentDOMElement, 'max-height', 0);
    } else {
      const openedCollapsibleDOMElement = accordionDOMElement.querySelector(`.${IS_SHOWN}`);

      // Al llegar a este punto, sabemos que hemos clicado sobre un título pero
      // no sobre uno que esté abierto, por lo que tenemos que cerrar el otro
      // que está abierto antes de abrir el que hemos clicado.
      // Tenemos que comprobar si hay algún elemento abierto porque puede darse
      // el caso de que no haya ninguno y nos de un error diciéndonos que no
      // encuentra el elemento que queremos colapsar.
      if (openedCollapsibleDOMElement) {
        const openedCollapsibleTitleDOMElement = accordionDOMElement.querySelector(`.${CONTENT_IS_SHOWN}`);

        setCustomPropertyValue(accordionDOMElement.querySelector(`.${IS_SHOWN}`), 'max-height', 0);
        elementClasses(openedCollapsibleDOMElement).remove(IS_SHOWN);
        elementClasses(openedCollapsibleTitleDOMElement).remove(CONTENT_IS_SHOWN);
      }
      
      // Modificamos el max-height del elemento que queremos abrir.
      setCustomPropertyValue(
        collapsibleContentDOMElement,
        'max-height',
        `${collapsibleContentDOMElement.scrollHeight}px`
      );
    }

    // Abrimos o cerramos (lo que toque) el colapsable sobre el que hemos
    // clicado.
    elementClasses(collapsibleContentDOMElement).toggle(IS_SHOWN);
    elementClasses(accordionItemTitleDOMElement).toggle(CONTENT_IS_SHOWN);
  }
}

const accordionDOMElement = document.getElementById('accordion');
const collapsibleDOMElements = [...accordionDOMElement.querySelectorAll('.collapsible')];

accordionDOMElement.addEventListener('click', (e) => handleAccordionClick(e, accordionDOMElement));
