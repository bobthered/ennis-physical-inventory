if ( 'serviceWorker' in navigator ) {
  //register serviceWorker
  navigator.serviceWorker.register( '/service-worker.js' );
}

document.addEventListener( 'DOMContentLoaded', e => {
  const weightInput = document.querySelector( '.calculator .weight' );
  document.querySelectorAll( '.container.material select, .container.material input:not(.full-item) ').forEach( elem => {
    elem.addEventListener( 'change', e => {
      updateFullItem();
    } );
  } );
  document.querySelector( '.container.material input.full-item' ).addEventListener( 'change', e => {
    removeWeights();
    getLocalItem();
  } );
  document.querySelectorAll( '.calculator .keypad' ).forEach( button => {
    button.addEventListener( 'click', e => {
      e.preventDefault();
      const value = e.target.innerHTML;
      weightInput.value = weightInput.value + value;
    } );
  } );
  document.querySelector( '.calculator .copy' ).addEventListener( 'click', e => {
    e.preventDefault();
    let text = [];
    for ( item in localStorage ) {
      if ( item != '' && localStorage.getItem( item ) ) {
        let totalWeight = JSON.parse( localStorage.getItem( item ) );
        if ( totalWeight.length < 1 ) {
          localStorage.removeItem( item );
        } else {
          totalWeight = totalWeight.reduce( ( total, num ) => total + num );
          text.push( [item, totalWeight ].join( "\t" ) );
        }
      }
    }
    const list = document.querySelector( '.list' );
    list.innerHTML = text.join( "\r\n" );
    showList();
  } );
  document.querySelector( '.calculator .delete' ).addEventListener( 'click', e => {
    e.preventDefault();
    weightInput.value = weightInput.value.substring( 0, weightInput.value.length - 1 );
  } );
  document.querySelector( '.calculator .add' ).addEventListener( 'click', e => addWeightHandler( e ) );
  document.querySelector( '.calculator' ).addEventListener( 'submit', e => addWeightHandler( e ) );
  document.querySelector( '.list-container .close' ).addEventListener( 'click', e => closeList() );
} );

const addWeight = ( weight, quantity = 1 ) => {
  for ( let i = 0; i < quantity; i ++ ) {
    let button = createButton();
    button.innerHTML = weight;
    document.querySelector( '.container.weights' ).prepend( button );
    button.addEventListener( 'click', e => {
      removeWeight( e.target );
      setLocalItem();
      calculateTotalWeight();
    } );
  }
};
const addWeightHandler = e => {
  e.preventDefault();
  if ( validWeightInput() ) {
    addWeight( document.querySelector( '.calculator .weight' ).value, getQuantity() );
    setLocalItem();
    resetWeightInput();
    calculateTotalWeight();
  }
}
const calculateTotalWeight = () => {
  let weightTotal = 0;
  document.querySelectorAll( '.container.weights button' ).forEach( button => {
    const weight = parseInt( button.innerHTML );
    weightTotal += weight;
  } );
  document.querySelector( '.container.total-weight span' ).innerHTML = weightTotal;
};
const clearLocalStorage = e => {
  e.preventDefault();
  localStorage.clear();
};
const closeList = () => {
  const listContainer = document.querySelector( '.list-container' );
  listContainer.classList.remove( 'show' );
};
const createButton = () => document.createElement( 'button' );
const getLocalItem = () => {
  const fullItem = document.querySelector( '.container.material .full-item' ).value;
  const ls = JSON.parse( localStorage.getItem( fullItem ) );
  if ( ls ) {
    ls.reverse().forEach( weight => {
      addWeight( weight )
    } );
  }
  calculateTotalWeight();
}
const getQuantity = () => {
  let quantity = parseInt( document.querySelector( '.calculator .quantity' ).value );
  if ( !quantity ) { quantity = 1; }
  document.querySelector( '.calculator .quantity' ).value = 1;
  return quantity;
};
const removeWeight = elem => elem.remove();
const removeWeights = () => {
  document.querySelectorAll( '.container.weights button' ).forEach( button => removeWeight( button ) );
};
const resetWeightInput = () => {
  const weightInput = document.querySelector( '.calculator .weight' );
  weightInput.value = '';
};
const setLocalItem = () => {
  const fullItem = document.querySelector( '.container.material .full-item' ).value;
  let weights = [];
  document.querySelectorAll( '.container.weights button' ).forEach( button => weights.push( parseInt( button.innerHTML ) ) );
  localStorage.setItem( fullItem, JSON.stringify( weights ) );
};
const showList = () => {
  const listContainer = document.querySelector( '.list-container' );
  listContainer.classList.add( 'show' );
};
const validWeightInput = () => {
  const weightInputValue = document.querySelector( '.calculator .weight' ).value;
  return ( parseInt( weightInputValue ) != 0 && !isNaN( parseInt( weightInputValue ) ) );
}
const updateFullItem = () => {
  const weight = document.querySelector( '.container.material .weight' ).value;
  const grade  = document.querySelector( '.container.material .grade' ).value;
  const color  = document.querySelector( '.container.material .color' ).value;
  const width  = document.querySelector( '.container.material .width' ).value;
  const fullItem = `${grade}${weight}${color} ${width}`;
  document.querySelector( '.container.material .full-item' ).value = fullItem;
  document.querySelector( '.container.material .full-item').dispatchEvent( new Event( 'change' ) );
};
