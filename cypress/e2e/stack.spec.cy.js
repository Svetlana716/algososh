import { ElementStyles } from "../../src/types/element-styles";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { createInitialItemsListForTesting } from "../utils/utils";
import { circle, addBtn, deleteBtn, resetBtn } from "../utils/constants";

const initialArray = ['1', '2', '3'];

describe('data structure stack works correctly', () => {
    beforeEach(() => {
        cy.visit('/stack');

        cy.get(addBtn).as('addBtn');
        cy.get(deleteBtn).as('deleteBtn');
        cy.get(resetBtn).as('resetBtn');
    });

    it("the add button should be disabled then the input is empty", () => {
        cy.get('input').should('be.empty');
        cy.get('@addBtn').should('be.disabled');
    });

    it('should add the new element correctly', () => {
        cy.get('input').type('1').should('have.value', '1');
        cy.get('@addBtn').should('not.be.disabled').click();

        cy.get(circle).as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 1);
        cy.get('@lastElement').should('contain', '1').and('have.css', 'border', ElementStyles.Changing);
        cy.get('@lastElement').siblings().contains('top');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@lastElement').should('have.css', 'border', ElementStyles.Default);
        
        cy.wait(SHORT_DELAY_IN_MS);
    });

    it ('elements are deleted correctly', () => {
        createInitialItemsListForTesting(initialArray);

        cy.get(circle).as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 3);

        cy.get('@deleteBtn').should('not.be.disabled').click();

        cy.get('@lastElement').should('contain', '3').and('have.css', 'border', ElementStyles.Changing);
        cy.get('@lastElement').siblings().contains('top');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 2);
        cy.get('@lastElement').should('contain', '2').and('have.css', 'border', ElementStyles.Default);
        cy.get('@lastElement').siblings().contains('top');
    });

    it ('stack clearing works correctly', () => {
        createInitialItemsListForTesting(initialArray);

        cy.get(circle).as('circles');
        cy.get('@circles').last().as('lastElement');

        cy.get('@circles').should('have.length', 3);

        cy.get('@resetBtn').should('not.be.disabled').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('@circles').should('have.length', 0);
    })
});