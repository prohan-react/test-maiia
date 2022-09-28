describe('Technical test home page', () => {
  before(() => {
    cy.visit('/');
  });

  it('can see the intro section', () => {
    cy.pick('intro').should('be.visible');
  });

  it('can see the timeslots section', () => {
    cy.pick('timeslots').should('be.visible');
  });

  it('can see the appointments section', () => {
    cy.pick('appointments').should('be.visible');
  });
});
