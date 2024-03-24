import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

export const createInitialItemsListForTesting = (array) => {
    array.map(item => {
        cy.get('input').type(item).should('have.value', item);
        cy.get('[data-test-id="add"]').click();
        cy.tick(SHORT_DELAY_IN_MS);
    })
};
