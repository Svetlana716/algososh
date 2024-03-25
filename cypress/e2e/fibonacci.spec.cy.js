import { circle } from "../utils/constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('fibonacci numbers are generated correctly', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');

        cy.get('button[type=submit]').as('submitBtn');
    });

    it('the button should be disabled then the input is empty', () => {
        cy.get('input').should('be.empty');
        cy.get('@submitBtn').should('be.disabled');
    });

    it('numbers are generated correctly', () => {
        const input = '5';
        const output = [1, 1, 2, 3, 5, 8];

        cy.get('input').type(input).should('have.value', input);
        cy.get('button[type=submit]').click();

        cy.get(circle).as('circles');

        for (let i = 2; i <= Number(input) + 1; i++) {
            cy.get('@circles')
                .should('have.length', i)
                .each((item, index) => {
                    cy.wrap(item).should('contain', output[index]);
                });

            cy.wait(DELAY_IN_MS);
        };
    });


})