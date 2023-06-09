const pages = [
  {
    name: 'home',
    url: 'http://app:3000/',
  },
  {
    name: 'rides',
    url: 'http://app:3000/rides',
  },
  {
    name: 'on-map',
    url: 'http://app:3000/stations/on-map',
  },
  {
    name: 'stations',
    url: 'http://app:3000/stations',
  },
  {
    name: 'station/1',
    url: 'http://app:3000/stations/1',
  },
];

describe('Pages should be available and include h1', () => {
  pages.forEach((page) => {
    it(`Page: "${page.name}" should be available`, () => {
      cy.visit(page.url);
      cy.get('h1').should('exist');
    });

    it('Should include a non-empty h1 tag', () => {
      cy.visit(page.url);
      cy.get('h1')
        .should('exist')
        .then(($el) => expect($el).not.to.be.empty);
    });

    it('Should include a non-empty title tag', () => {
      cy.visit(page.url);
      cy.get('title')
        .should('exist')
        .then(($el) => expect($el).not.to.be.empty);
    });
  });
});

describe('The rides page should include <table> with 6 <th> cols', () => {
  it('Finds the table with 6 columns', () => {
    cy.visit('http://app:3000/rides');
    cy.get('table').within(() => {
      cy.get('td')
        .should('have.length', 300) // 50 rows x 6 colums
        .each(($el) => expect($el).not.to.be.empty);
    });
  });
});

describe('The stations page should include non-empty ul>li*10', () => {
  it('Finds the table with 5 columns', () => {
    cy.visit('http://app:3000/stations');

    cy.get('main ul').within(() => {
      cy.get('li')
        .should('have.length', 10)
        .each(($el) => expect($el).not.to.be.empty);
    });
  });
});

/**
 * Test stations filter
 */
describe('The stations filter should work', () => {
  it('Finds the filter intput field', () => {
    cy.visit('http://app:3000/stations');
    cy.get('input[name="filter"]').type('diakoniapuisto');

    cy.get('main ul').within(() => {
      cy.get('li')
        .should('have.length', 1)
        .then(($el) => expect($el).to.have.text('Diakoniapuisto'));
    });
  });
});

/**
 * Test rides filter
 */
describe('The rides filter should work', () => {
  it('Finds "By station name" details tag', () => {
    cy.visit('http://app:3000/rides');

    // initially the filter is hidden behind the details tag
    cy.get('input[name="departure_station"]').should('not.be.visible');

    // find the filter and click to open
    cy.get('details h3')
      .first()
      .within(($el) => expect($el).to.have.text('By station name'))
      .click();

    // the filter should now be visible
    cy.get('input[name="departure_station"]').should('be.visible');

    // type a station name
    cy.get('input[name="departure_station"]').type('Linnanmäki');

    // control the request
    cy.intercept('//api/rides/query').as('apiCheck');

    // submit the filter request
    cy.get('button[type="submit"]').contains('Filter').click();

    // wait for data load
    cy.wait('@apiCheck');

    // check for correct filter
    cy.get('td[data-label="From Station:"]')
      .should('have.length', 50)
      .each(($el) => expect($el).to.have.text('Linnanmäki'));
  });
});
