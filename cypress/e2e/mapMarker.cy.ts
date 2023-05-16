/**
 * Test map marker
 */
describe('The map marker should have a link to a station page', () => {
  const urls = ['http://app:3000/stations/on-map', 'http://app:3000/stations/'];

  urls.forEach((url) => {
    it('Finds a map marker', () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').should('exist');
    });

    it('Popup-pane is initially empty', () => {
      cy.visit(url);
      cy.get('.leaflet-popup-pane').children().should('not.exist');
    });

    it('Popup-pane opens when marker is clicked', () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').first().click();
      cy.get('.leaflet-popup-pane').within(() => cy.get('.leaflet-popup').should('be.visible'));
    });

    it('Popup contains a correct link', () => {
      const regex = /^\/stations\/\d+$/;
      cy.visit(url);
      cy.get('.leaflet-marker-icon').first().click();
      cy.get('.leaflet-popup').within(() => cy.get('a').should('exist'));
      cy.get('.leaflet-popup a').invoke('attr', 'href').should('match', regex);
    });

    it('The link leads to a valid page', () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').first().click();
      cy.get('.leaflet-popup').within(() => cy.get('a').should('exist'));
      cy.get('.leaflet-popup a')
        .invoke('attr', 'href')
        .then(($href) => {
          if ($href) {
            cy.request($href).its('status').should('eq', 200);
          }
        });
    });
  });
});

/**
 * Test Station page's map marker
 */
describe("Station page's map marker should not have a link", () => {
  const urls = ['http://app:3000/stations/1', 'http://app:3000/stations/50'];

  urls.forEach((url) => {
    it('Finds a map marker', () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').should('exist');
    });

    it('Popup-pane is initially empty', () => {
      cy.visit(url);
      cy.get('.leaflet-popup-pane').children().should('not.exist');
    });

    it('Popup-pane opens when marker is clicked', () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').first().click();
      cy.get('.leaflet-popup-pane').within(() => cy.get('.leaflet-popup').should('be.visible'));
    });

    it("Popup doesn't contain a link", () => {
      cy.visit(url);
      cy.get('.leaflet-marker-icon').first().click();
      cy.get('.leaflet-popup').within(() =>
        cy.get('a:not(.leaflet-popup-close-button)').should('not.exist')
      );
    });
  });
});

export {};
