// const pages = [
//   'http://app:3000/',
//   'http://app:3000/rides',
//   'http://app:3000/stations'
// ];

// describe('E2E Test', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
// });

describe('The home page should be accessible', () => {
  it('Visits the home page', () => {
    cy.visit('http://app:3000/');
    cy.get('h1').should('exist');
    cy.log('h1 exists');
  });
});

describe('The rides page should include <table> with 5 <th> cols', () => {
  it('Finds the table with 5 columns', () => {
    cy.visit('http://app:3000/rides');
    cy.get('h1').should('exist');
    cy.get('table').within(() => {
      cy.get('th')
        .should('have.length', 6)
        .each(($el) => expect($el).not.to.be.empty);
    });
  });
});

describe('The stations page should include non-empty ul>li*50', () => {
  it('Finds the table with 5 columns', () => {
    cy.visit('http://app:3000/stations');

    cy.get('ul').within(() => {
      cy.get('li')
        .should('have.length', 50)
        .each(($el) => expect($el).not.to.be.empty);
    });
  });
});

export {}