import { ElementStyles } from "../../src/types/element-styles";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { createInitialItemsListForTesting } from "../utils/utils";

const initialArray = ['1', '2', '3'];

describe('data structure stack works correctly', () => {
    beforeEach(() => {
        cy.visit('/stack');
    });

    it("the add button should be disabled then the input is empty", () => {
        cy.get('input').should('be.empty');
        cy.get('[data-test-id="add"]').should('be.disabled');
    });

    it('should add the new element correctly', () => {
        cy.clock();

        cy.get('input').type('1').should('have.value', '1');
        cy.get('[data-test-id="add"]').should('not.be.disabled').click();

        cy.get('[data-test-id="circle"]').as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 1);
        cy.get('@lastElement').should('contain', '1').and('have.css', 'border', ElementStyles.Changing);
        cy.get('@lastElement').siblings().contains('top');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@lastElement').should('have.css', 'border', ElementStyles.Default);
        
        cy.tick(SHORT_DELAY_IN_MS);
    });

    it ('elements are deleted correctly', () => {
        cy.clock();
        createInitialItemsListForTesting(initialArray);

        cy.get('[data-test-id="circle"]').as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 3);

        cy.get('[data-test-id="delete"]').should('not.be.disabled').click();

        cy.get('@lastElement').should('contain', '3').and('have.css', 'border', ElementStyles.Changing);
        cy.get('@lastElement').siblings().contains('top');

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 2);
        cy.get('@lastElement').should('contain', '2').and('have.css', 'border', ElementStyles.Default);
        cy.get('@lastElement').siblings().contains('top');
    });

    it ('stack clearing works correctly', () => {
        cy.clock();
        createInitialItemsListForTesting(initialArray);

        cy.get('[data-test-id="circle"]').as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 3);

        cy.get('[data-test-id="reset"]').should('not.be.disabled').click();

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 0);
    })
});